#!/usr/bin/env python3
import re, json, sys

BASE = "/Users/abzal.bolatkhan.01/AI projects/Lamp - Bible Trivia Online/data"

# ── MCQ ──────────────────────────────────────────────────────────────────────
mcq_text = open(f"{BASE}/mcq.js").read()
# Strip JS var declaration
mcq_json = re.sub(r'^const QB\s*=\s*', '', mcq_text.strip()).rstrip(';')
mcq_data = json.loads(mcq_json)

mcq_list = []
idx = 0
for category, questions in mcq_data.items():
    for q in questions:
        mcq_list.append({
            "idx": idx,
            "category": category,
            "q": q.get("q",""),
            "o": q.get("o",[]),
            "a": q.get("a",0),
            "e": q.get("e",""),
            "d": q.get("d","")
        })
        idx += 1

with open("/tmp/lamp_mcq.json","w") as f:
    json.dump(mcq_list, f)
print(f"MCQ: {len(mcq_list)} questions")

# ── TF ───────────────────────────────────────────────────────────────────────
tf_text = open(f"{BASE}/tf.js").read()
tf_json = re.sub(r'^const TF_Q\s*=\s*', '', tf_text.strip()).rstrip(';')
# TF uses unquoted keys — use json5 approach: add quotes around keys
tf_json = re.sub(r'(?<=[{,])\s*([a-zA-Z_][a-zA-Z0-9_]*)(?=\s*:)', r'"\1"', tf_json)
# Remove trailing commas
tf_json = re.sub(r',\s*([}\]])', r'\1', tf_json)
tf_data = json.loads(tf_json)

tf_list = []
for idx, q in enumerate(tf_data):
    tf_list.append({
        "idx": idx,
        "q": q.get("q",""),
        "a": q.get("a", True),
        "e": q.get("e",""),
        "d": q.get("d","")
    })

with open("/tmp/lamp_tf.json","w") as f:
    json.dump(tf_list, f)
print(f"TF: {len(tf_list)} questions")

# ── VERSE ────────────────────────────────────────────────────────────────────
v_text = open(f"{BASE}/verse.js").read()
v_json = re.sub(r'^const VERSE_Q\s*=\s*', '', v_text.strip()).rstrip(';')
v_json = re.sub(r',\s*([}\]])', r'\1', v_json)
v_data = json.loads(v_json)

verse_list = []
for idx, q in enumerate(v_data):
    verse_list.append({
        "idx": idx,
        "b": q.get("b",""),
        "blank": q.get("blank",""),
        "a": q.get("a",""),
        "r": q.get("r",""),
        "o": q.get("o",[]),
        "d": q.get("d","")
    })

with open("/tmp/lamp_verse.json","w") as f:
    json.dump(verse_list, f)
print(f"Verse: {len(verse_list)} questions")
print(f"Total: {len(mcq_list)+len(tf_list)+len(verse_list)} questions")
