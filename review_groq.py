#!/usr/bin/env python3
import argparse, json, os, time, requests, sys

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--file", required=True)
    parser.add_argument("--type", choices=["mcq","tf","verse"], required=True)
    args = parser.parse_args()

    api_key = os.environ.get("GROQ_API_KEY")
    if not api_key:
        print("Error: GROQ_API_KEY not set"); sys.exit(1)

    questions = json.load(open(args.file))
    batch_size = 15
    total = len(questions)
    all_issues = []
    output_path = f"/tmp/lamp_issues_{args.type}.json"
    url = "https://api.groq.com/openai/v1/chat/completions"

    type_instructions = {
        "mcq": "For each MCQ: verify the answer index `a` (0-based) points to the CORRECT answer in `o` array. Check Bible facts in question and explanation. Flag: wrong_answer (a points to wrong option), wrong_fact (incorrect Bible info), wording (unclear/ambiguous).",
        "tf": "For each T/F: verify `a` (true/false) is correct per the Bible. Flag: wrong_tf (answer is wrong), wrong_fact (statement has wrong details).",
        "verse": "For each Verse: verify `blank` is the correct missing word at that exact position in the verse, `r` is the correct Bible reference, correct blank is in options `o`. Flag: verse_error (wrong blank or wrong reference)."
    }

    for i in range(0, total, batch_size):
        batch = questions[i:i+batch_size]

        system = (
            "You are an expert Bible scholar. Review trivia questions for accuracy. "
            "Return ONLY a valid JSON array of issues. "
            'Each issue: {"idx": <original idx value>, "type": "wrong_answer|wrong_fact|wrong_tf|verse_error|wording", "description": "what is wrong", "fix": "suggested correction"}. '
            "Only report real errors. If batch has no errors, return []."
        )
        user = f"{type_instructions[args.type]}\n\nQuestions:\n{json.dumps(batch, ensure_ascii=False)}"

        for attempt in range(3):
            try:
                resp = requests.post(url,
                    headers={"Authorization": f"Bearer {api_key}", "Content-Type": "application/json"},
                    json={"model": "llama-3.3-70b-versatile", "messages": [
                        {"role": "system", "content": system},
                        {"role": "user", "content": user}
                    ], "temperature": 0.1, "max_tokens": 2048},
                    timeout=60)

                if resp.status_code == 429:
                    wait = 30 * (attempt+1)
                    print(f"  Rate limit, waiting {wait}s...", flush=True)
                    time.sleep(wait)
                    continue

                resp.raise_for_status()
                text = resp.json()['choices'][0]['message']['content'].strip()
                # Extract JSON from response
                if '```json' in text:
                    text = text.split('```json')[1].split('```')[0].strip()
                elif '```' in text:
                    text = text.split('```')[1].split('```')[0].strip()
                # Find JSON array
                start = text.find('[')
                end = text.rfind(']') + 1
                if start >= 0 and end > start:
                    text = text[start:end]
                batch_issues = json.loads(text)
                if isinstance(batch_issues, list):
                    all_issues.extend(batch_issues)
                    if batch_issues:
                        print(f"  Issues in batch: {len(batch_issues)}", flush=True)
                break
            except Exception as e:
                print(f"  Error batch {i} attempt {attempt}: {e}", flush=True)
                if attempt < 2:
                    time.sleep(5)

        done = min(i+batch_size, total)
        print(f"[{args.type.upper()}] {done}/{total} | total issues: {len(all_issues)}", flush=True)
        json.dump(all_issues, open(output_path,"w"), indent=2)
        time.sleep(2)  # Groq rate limit: 30 RPM

    json.dump(all_issues, open(output_path,"w"), indent=2)
    print(f"\nDone. {len(all_issues)} issues saved to {output_path}")

if __name__ == "__main__":
    main()
