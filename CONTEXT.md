# Lamp — Shared AI Context
# Auto-updated each session. Gemini, Codex, Groq, and Claude all read this.

## Project
- App: Lamp Bible Trivia Online — https://thelampgame.com
- Stack: index.html (~52k lines, single file), Firebase Realtime DB, vanilla JS
- Path: /Users/abzal.bolatkhan.01/AI projects/Lamp - Bible Trivia Online
- Firebase project: bible-game-night | GitHub: github.com/aviel-bolatkhan-01/lamp (backup only)

## Current State
- Live: **Last deploy**: 2026-03-28 (before this session's work) | **Ready for deploy**: All 7 branches in dev (after Branch 7 implementation + testing) | **URL**: https://thelampgame.com |  | Onboarding flow (new users land cold) | Email capture (zero re-engagement) | Push notification timing | Seasonal pages: Easter, Christmas | "Hard Bible Trivia" landing page (low-competition keywords) |  | index.html: 52k lines, all code + UI in one file | Teams code exists at lines 6303-7591 (Pass & Play) | Online settings modal at lines 4391-4416 | createRoom() at line ~7848 | Win screen at line ~7576 | Team A/B assignment: lines 6418, 6453-6455 | Team score tracking: line 6703 | Team score display: lines 6707-6708, 6820-6828 | Team win detection: lines 6930-6931 | Team win screen: lines 7583-7591 | 

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
