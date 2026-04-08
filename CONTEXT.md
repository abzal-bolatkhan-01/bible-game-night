# Lamp — Shared AI Context
# Auto-updated each session. Gemini, Codex, Groq, and Claude all read this.

## Project
- App: Lamp Bible Trivia Online — https://thelampgame.com
- Stack: index.html (~52k lines, single file), Firebase Realtime DB, vanilla JS
- Path: /Users/abzal.bolatkhan.01/AI projects/Lamp - Bible Trivia Online
- Firebase project: bible-game-night | GitHub: github.com/aviel-bolatkhan-01/lamp (backup only)

## Current State
- Up next: Onboarding flow (new users land cold, no explanation), Email capture (zero re-engagement currently), Push notification timing (prompt after first win)

## Code Rules (non-negotiable)
- Global state: `G = {}` — never redeclare
- Navigation: `go('screen-id')` | show/hide: `show(id)` / `hide(id)`
- Difficulty: always lowercase — `"easy"` `"medium"` `"hard"` never capitalized
- After every JS edit: run `node --check /tmp/game_script.js`
- Arrays: `];` never `]];`
- Question format MCQ: `{"q":"...","o":[...],"a":0,"e":"...","d":"easy"}`
- Question format TF: `{q:"...",a:true,d:"easy"}`
- Question format Verse: `{"b":"...","blank":"...","a":"...","r":"...","o":[...],"d":"easy"}`

## Question Banks
- QB (MCQ): 3,012 — 19 categories: Genesis, Exodus, Judges, Kings, Psalms, Prophets, Gospels, Parables, Acts, Epistles, Revelation, Miracles, Women of the Bible, Animals in the Bible, Bible Geography, Numbers & Dates, Old Testament Law, Worship & Music, Who Am I?
- TF_Q (True/False): 3,219 | VERSE_Q (Fill-in-Verse): 3,000 | Total: 9,231

## Brand
- Accent: gold #E0A860 / #C4842A — never green
- BG: #1A1A20 | Card: #242430 | Text: #EDEDEC / #A8A8A4 / #737373
- Buttons: `.btn` + modifier: `btn-gold` `btn-ruby` `btn-blue` `btn-ghost`
- Themes: Dark (default), Green, Warmth, Light

## Deploy
```
git add <files> && git commit -m "What — YYYY-MM-DD HH:MM"
git push origin dev
git checkout main && git merge dev && git push origin main
firebase deploy --only hosting
git checkout dev
```
