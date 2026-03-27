# Lamp — Bible Trivia Online
## Project Rules for Claude Code

### First Thing Every Session
1. Read `STATUS.md` — know what's in progress
2. Read `MEMORY.md` at `~/.claude/projects/-Users-abzal-bolatkhan-01/memory/`
3. State what was in progress and resume without asking

---

## Branch & Deploy Workflow
- `dev` = all changes go here first
- `main` = production only — ALWAYS merge dev→main before deploying
- **Full deploy sequence:**
  ```
  git add <files> && git commit -m "Description — YYYY-MM-DD HH:MM"
  git push origin dev
  git checkout main && git merge dev && git push origin main
  firebase deploy --only hosting
  git checkout dev
  ```
- Always return to `dev` after deploying
- Include date + time in every commit message

## Live Site
- URL: https://thelampgame.com
- Firebase project: `bible-game-night`
- Project path: `/Users/abzal.bolatkhan.01/AI projects/Lamp - Bible Trivia Online`
- GitHub: https://github.com/aviel-bolatkhan-01/lamp (version history only)

---

## Brand & Design
- Primary accent: gold `#E0A860` / `#C4842A` — NOT green
- Dark bg: `#1A1A20` | Card: `#242430` | Text: `#EDEDEC`
- Nav: Community | Friends | Home (center) | You | Join
- Button system: 3D bottom-border (System 2), class `.btn` + modifier
- 4 themes: Dark (default), Green, Warmth, Light
- Contrast minimum: WCAG AA 4.5:1

---

## Orchestration Rules — ALWAYS ON
Never use Claude tokens for work a free tool can do.

| Tool | Use for |
|------|---------|
| **Gemini** (`gemini -p "..."`) | Research, content generation, bulk text, Bible knowledge |
| **Groq** (curl API) | Fast lookups, short generation, simple formatting |
| **Mistral** (Python SDK) | Marketing copy, customer-facing content |
| **Codex** (`codex exec --skip-git-repo-check "..."`) | All code writing and fixes |
| **Claude** | Planning, judgment, orchestration only |

- Run Gemini/Codex/Groq in background (`run_in_background: true`) whenever independent
- Rotate Gemini keys on 429: key1 → key2 → key3
- Use `haiku` model for subagents doing scans/searches

### API Keys
- Stored in `~/.claude/projects/.../memory/tool_workflow.md` — never commit keys to git
- Never use OpenAI API key (credits exhausted)
- Never use Gemini 2.0 Flash (quota exhausted) — always use gemini-2.5-flash

---

## Code Architecture
- Single-page app — everything in `index.html` (~90k+ lines)
- Global state: `G = {}` object
- Show/hide screens: `show()` / `hide()`
- Firebase Realtime DB for multiplayer
- `buildPool()` — filters questions by difficulty
- Validate JS: `python3` extract `<script>` → `node --check /tmp/game_script.js`
- Difficulty values MUST be lowercase: `"easy"` `"medium"` `"hard"`

## Question Banks
- Classic MCQ: `QB` object — 3,012 questions, 19 categories
- True/False: `TF_Q` array — 3,219 questions
- Fill-in-Verse: `VERSE_Q` array — 3,000 questions
- Total: 9,231 questions

---

## Context Budget
- If conversation exceeds ~30 messages: summarize to `STATUS.md`, tell user to start fresh session
- Keep responses concise — user is a solo founder, speed matters
- Never re-explain what was just done — user can read the diff
