# STATUS.md — Lamp: Bible Trivia Online

## Session 2026-04-10: 10-Bug Fix Batch ✅ (deployed — commit 21a8c8b)

### Fixes Applied
1. **T/F button colors**: `.tf-btn.correct` → green override; `.tf-btn.wrong` → red override. Was only adding animation, no color change — False button stayed red even when correct.
2. **Gold button text white**: `btn-gold` color changed from dark (#1a0a00/#1A1A20) → `#fff` across all themes (light, dark, warmth).
3. **Fill-in-Verse**: `g-txt` now shows verse reference `📖 q.r` instead of "Complete the verse:" mode label.
4. **Share Result hidden in singleplayer**: Added `id="w-share-btn"`, hidden in `endGame()` when `G.mode==='practice'` or solo.
5. **Weekly challenge locked for full week**: `weeklyDone` now uses `getWTWeekKey()` comparison instead of today's date. Also fixed `startWeeklyTournament()` guard.
6. **Challenge question counts**: Weekly → "20 questions · Fresh every Sunday"; Seasonal → "10 questions · Special · Limited time".
7. **T/F wrong answer**: Shows "Not quite. The answer is TRUE/FALSE ✅" + explanation. Was `q.e` without fallback (showed "undefined").
8. **Username filter expanded**: Added `meh` to RESERVED_NAMES; added BLASPHEMY_PATTERNS (devil, satan, lucifer, antichrist, etc.) with `isBlasphemousName()` check.
9. **Church field removed from sign-in**: HTML block deleted; JS reads `church=''` as constant.
10. **Welcome modal updated**: Highlights "challenge friends online" as main feature; updated bullet points.
11. **Settings menu scroll on mobile**: Light theme `.mbox` now has `max-height:85vh; overflow-y:auto;`.
12. **Sound guards added**: `sfx.wrong()`, `sfx.elim()`, `sfx.win()` now all respect `G.cfg.sound` flag (were missing the guard).

### Not Fixed (requires device testing or data fix)
- "Sound in eastern mode" — no "eastern" mode found in code. Sound guards now consistent. If issue persists, test on device.
- "Remove existing test/meh players from Firebase" — requires admin SDK script (new players blocked by filter, leaderboard already filters them).

---

## Session 2026-04-09: Quick Match Modal + Match History Polish ✅ (deployed — commit b6e192f)

### Fix 13: Quick Match modal matches Game Settings layout (commit b6e192f)
- Mode description text (`id="os-mode-desc"`) added below game mode chips — updates on chip tap via `osPickSub()`
- Rounds row: replaced custom centered counter with `.toggle-row` + `.stepper` (identical to Game Settings)
- Section label: "Questions" → "Options", counter label → "🏁 Rounds"
- `osPickSub()`: now sets `os-mode-desc` from `MODE_DESCS[s]`

### Fix 14: Match history shows opponent name for Ghost Race (commit ec89b6f)
- `subLabel` includes "vs [opponent]" for `async_challenge` entries
- Opponent = `scores` entry where `name !== myName`

### Fix 15: SW cache lamp-v5 + AI bg disabled + Host a Room text bigger (commits 1a86b2a, 225ed19)
- SW: lamp-v4 → lamp-v5
- `loadAIBackground()`: disabled with early return
- `.mp-title`: 26→28px | `.mp-sub`: 12→14px

---

## Session 2026-04-09: Match History + UI Fixes ✅ (deployed — commit 4a4c700)

### Fix 9: Match history "async_challenge" → proper label (commit 4a4c700)
- `saveMatchResult`: added `sub: G.sub || null` to match record — future Ghost Race entries store actual sub-mode
- `modeLabel`: added `async_challenge → 'Ghost Race'`, `verse → 'Complete the Verse'`; `classic → 'Classic'`
- Render logic: if `m.mode === 'async_challenge'` and `m.sub` exists, shows sub-mode label (e.g. "Classic · Medium"); else shows "Ghost Race · Medium"
- Old records without `sub` will show "Ghost Race" as fallback

### Fix 10: SW cache bump lamp-v4 → lamp-v5 (commit 1a86b2a)
- Forced fresh JS delivery after bg image disable wasn't reflecting

### Fix 11: AI background image disabled (commit 225ed19)
- `loadAIBackground()`: early `return;` — no Pollinations.ai fetch

### Fix 12: Host a Room card text bigger (commit 225ed19)
- `.mp-title`: 26px → 28px | `.mp-sub`: 12px → 14px

---

## Session 2026-04-09: Misc UI Fixes ✅ (deployed — commit 225ed19)

### Fix 7: AI background image removed
- `loadAIBackground()` now returns immediately (early return) — no Pollinations.ai fetch, no image over the game
- `#ai-bg` div and CSS still in DOM but inert

### Fix 8: Host a Room card text bigger
- `.mp-title`: 26px → 28px
- `.mp-sub`: 12px → 14px ("Share code to invite friends")

---

## Session 2026-04-09: UI Polish — Ghost Buttons + Quick Match Modal ✅ (deployed)

### Fix 5: Dark theme ghost button raised style (commit 223e9bc)
- **Bug**: `btn-ghost` in dark mode was flat — only had `border: 1px solid var(--inp-border)`, no thick bottom border
- **All other themes** (green, warmth, light) already had `border-bottom: 5px solid` — dark was the only exception
- **Fix**: Added `border-bottom: 5px solid #1A1A24` to dark theme `.btn-ghost` CSS rule (line 2325)
- **Applies everywhere**: Join Room, Cancel buttons, Copy Code, all ghost buttons in dark mode now raised

### Fix 6: Quick Match modal matches Host Room screen layout (commit 223e9bc)
- **Game Mode moved first** (was second) — matches Host Room order
- **Chip labels updated**: Mixed→Multi-verse, Scripture→Classic, True/False→True or False, Fill-in-Verse→Complete the Verse
- **Lightning chip added** (was missing from Quick Match)
- **Slider replaced** with −/number/+ counter (count display, not a range input)
- **JS updated**: `syncOnlineQuestions` uses `qs-count` element; added `adjustOnlineQ(delta)`; `startOnlineMatch` uses `G.questions` directly
- **`osPickSub`**: added `lightning` to chip toggle array

### Tooling: OpenRouter wrapper upgraded
- `~/.claude/bin/or` — model aliases: gpt120, r1, v3, gemma, llama. Default: gpt120 (openai/gpt-oss-120b:free)
- xAI/Grok skipped — account has no credits

## Session 2026-04-09: Ghost Mode + Match History Fixes ✅

### Fix 4: pushProfile .set() → .update() — ROOT CAUSE of match history loss (deployed 2026-04-09 10:45)
- **Root cause**: `pushProfile()` called `G.db.ref('players/'+G.uid).set(full)` — Firebase `.set()` on parent DELETES all child paths not in the new value, including `matchHistory`
- **Every game end**: `pushProfile` ran first (line 7584) → wiped matchHistory from Firebase → `saveMatchResult` async write raced to restore it but lost on next game cycle
- **Fix**: Changed `.set(full)` to `.update(full)` — updates only specified fields, leaves matchHistory untouched
- **Also fixed**: SW cache bumped to v4 (lamp-v3 → lamp-v4) to force fresh JS delivery

### Fix 3: 120 broken verse questions + MCQ wording (deployed 2026-04-09 10:20)
- **Bug 1**: 120 verse.js entries had blank word already in `b` field → doubled text on screen
- **Fix**: Python script truncated `b` to just before the blank word for all 120 entries
- **Bug 2**: MCQ question said "the book" without naming it → fixed to "the book of Revelation"
- **Detection method**: overlap between end of `b` and content of `a` → 120 hits, 0 false positives

### Fix 2: Ghost Mode "Not enough questions" error
- **Bug**: `buildGhostPool` had no `mix` mode case — `src` stayed empty → pool empty → error toast blocked play
- **Fix**: Added `mix` branch that pulls from all three banks (QB + TF_Q + VERSE_Q) filtered by difficulty
- **Status**: Fixed, JS validated, NOT yet deployed

---

## Session 2026-04-09: Match History Bug Fix ✅

### Fix Applied
- **Bug**: `saveMatchResult` read from localStorage only, then `.set()` overwrote Firebase. If localStorage cleared between sessions, Firebase got overwritten with empty/short list — losing all history.
- **Fix**: Now reads Firebase first, merges with local (dedup by id, sort newest first, cap 50), writes merged back to both Firebase and localStorage.
- **Data note**: Past match history was already lost (data gone from both stores). Stats (wins/played) intact — they're in profile object, separate path.
- **Status**: Fix applied, JS validated, NOT yet deployed.

---

## Session 2026-04-08: Multiplayer UI Overhaul — 6 of 7 COMPLETE ✅

### Branches Complete
✅ **Branch 1**: Button Styling + Theme Fix — `afdb5ca`
✅ **Branch 2**: "Duel a Friend" Rename — `415ace8`
✅ **Branch 3**: Challenge Styling (visual distinction) — verified
✅ **Branch 4**: Host Room + Questions Slider (7-33) — `ff8a62c`
✅ **Branch 5**: Message Display Fix (show last message) — `ff8a62c`
✅ **Branch 6**: Incoming Challenges on Home — `ff8a62c`
🔄 **Branch 7**: Team Mode (READY TO IMPLEMENT)

---

## Branch 7: Team Mode — Implementation Shortcut Found! 🎉

### Key Discovery
**Team mode code ALREADY EXISTS** for Pass & Play (local multiplayer) at lines 6303-7591:
- Team A / Team B assignment logic
- Team score tracking (`G.teamScores`)
- Team-grouped player display
- Team win screen ("Team A Wins!")

**Solution**: Extend existing team logic to online play instead of building from scratch.

### Simple Implementation Path
1. **Add team selector to online-settings modal** (4391-4416)
   - Add buttons: "🔶 Team Gold" and "🔷 Team Ruby" 
   - Set G.currentTeam = 'gold' or 'ruby'
   - Only show if user picks team mode

2. **Extend createRoom()** (line ~7848)
   - Add `teamMode: G.teamMode` to room object
   - Add `teams: G.teamMode ? { gold: {score:0}, ruby: {score:0} } : null`
   - Add `team: G.currentTeam` to each player object

3. **Extend scoring logic** (where points are added)
   - After `players[uid].score += points`, also update:
   - `teams[G.currentTeam].score += points`
   - Sync to Firebase: `G.db.ref('rooms/' + G.roomId + '/teams/' + G.currentTeam + '/score').set(...)`

4. **Extend win screen** (line ~7576)
   - If team mode: show "Team Gold Wins! 🏆" instead of individual name
   - Display team score prominently
   - Show team members + their scores

5. **Text change**
   - "Setup and Play" → "Play" (line ~6386)

**Effort**: ~50 lines of code total (most can be copy/paste from Pass & Play team logic)

---

## Test Checklist (Before Deploy)

All 7 branches:
- [ ] Theme switching: All 4 themes apply button colors on change
- [ ] Button styles: Buttons match game brand (gold, ruby, blue, green, ghost)
- [ ] Duel card: Shows "Duel a Friend" + "1 vs 1 Solo" + "Async challenge"
- [ ] Host Room: Button renamed, modal shows slider (7-33 range)
- [ ] Slider label: Updates dynamically ("Play 10 questions", etc.)
- [ ] Messages: Last message shows in preview (not "Tap to start chatting")
- [ ] Message scroll: Auto-scrolls to bottom when new message arrives
- [ ] Incoming challenges: Show on home page above "Challenges" card
- [ ] Friends badge: Shows count of pending challenges
- [ ] Team mode (local Pass & Play): Still works ✓ (already tested)
- [ ] Team mode (online): Can select gold/ruby team → play → team wins

---

## Deploy Workflow (When Ready)

```bash
# Current state: all 7 branches in dev
git log --oneline dev | head -10

# When ready to deploy:
git checkout main && git merge dev && git push origin main
firebase deploy --only hosting
git checkout dev

# Verify live: https://thelampgame.com
```

---

## Git History (This Session)

```
afdb5ca — Fix: Button styling + theme persistence
415ace8 — Rename: Challenge→Duel, clarify solo
ff8a62c — Branches 4-6: Host Room slider + message display + incoming challenges
(+ Branch 7 ready to implement)
```

---

## Currently Live
- **Last deploy**: 2026-04-09 (commit 223e9bc) — all fixes deployed
- **What's live**: Match history fix, ghost mode fix, 120 verse question fix, MCQ book name fix, raised ghost buttons, Quick Match modal UI overhaul, all 7 multiplayer branches
- **URL**: https://thelampgame.com

---

## Next Session Actions

### Ready to Build
1. **Team Mode online** (Branch 7) — code already in index.html for Pass & Play (lines 6303-7591), extend to online
2. **Onboarding flow** — new users land cold, no guidance
3. **Email capture** — zero re-engagement mechanism
4. **Push notification timing**
5. **Seasonal pages**: Easter, Christmas
6. **"Hard Bible Trivia" landing page** (low-competition SEO)

---

## Notes for Next Session

**Key Files**:
- index.html: 52k lines, all code + UI in one file
- Teams code exists at lines 6303-7591 (Pass & Play)
- Online settings modal at lines 4391-4416
- createRoom() at line ~7848
- Win screen at line ~7576

**Team Logic to Copy**:
- Team A/B assignment: lines 6418, 6453-6455
- Team score tracking: line 6703
- Team score display: lines 6707-6708, 6820-6828
- Team win detection: lines 6930-6931
- Team win screen: lines 7583-7591

**Validation**:
```bash
python3 -c "import re; html = open('index.html').read(); scripts = re.findall(r'<script(?![^>]*(?:src|application/ld\+json))[^>]*>(.*?)</script>', html, re.DOTALL); open('/tmp/game_script.js','w').write('\n'.join(scripts))" && node --check /tmp/game_script.js && echo "✓ JS OK"
```

---

## Lessons Learned This Session

1. **Parallel delegation works**: Codex handled 3 branches simultaneously without issues
2. **Code already exists**: Team mode partially complete (local); just extend to online
3. **Independent commits are safe**: Each branch can be reverted cleanly
4. **Theme repaint trick**: opacity toggle + offsetHeight forces browser repaint
5. **Badge sync**: Centralized updateFriendsChallengeBadge() prevents desync
6. **Lazy loading saves bandwidth**: ensureConversationPreview() loads on-demand
7. **Firebase structure matters**: team property on players, team scores in separate sub-path
