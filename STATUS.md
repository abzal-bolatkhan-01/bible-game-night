# STATUS.md — Lamp: Bible Trivia Online

## Current Work: Multiplayer UI Overhaul (2026-04-08)

### 7 Feature Branches (individual commits, rollback-safe)
✅ **1. Button Styling System + Theme Fix** — COMPLETE
   - Added light theme button CSS (not([data-theme]))
   - Enhanced applyTheme() with forced repaint logic
   - All 4 themes now have consistent button colors
   - Commit: `afdb5ca` (Fix: Button styling + theme persistence)

✅ **2. "Duel a Friend" Rename + Solo Clarity** — COMPLETE
   - Changed "Challenge a Friend" → "Duel a Friend"
   - Changed eyebrow "1 vs 1 Duel" → "1 vs 1 Solo"
   - Updated subtitle: "they answer when ready" → "Async challenge — they answer when ready"
   - Commit: `415ace8` (Rename: Challenge→Duel, clarify solo)

⏳ **3. Challenge Styling (Visual distinction)** — READY
   - "Duel a Friend" (1v1): Blue theme ✓ already done in Deploy 3
   - "Challenges" (Daily/Weekly): Gold/trophy theme ✓ already done in Deploy 3
   - Both cards have distinct colors, icons, copy
   - **Action**: Verify both cards look different; if so, mark complete

⏳ **4. Quick Match: "Host Room" + Question Slider (7-33)** — IN PROGRESS
   - Rename "Find Match" button → "Host Room"
   - Rename "First to X pts" label → "Number of Questions"
   - Replace point buttons (10/15/20 pts) → slider (7 ← → 33 questions)
   - Update text labels dynamically (e.g., "Play 10 questions")
   - **Files**: index.html (modal HTML, slider JS, event handlers)

⏳ **5. Message Display Fix** — QUEUED
   - Show last message in preview instead of "Tap to see"
   - Only show "Tap to start chatting" if empty
   - Text truncation with ellipsis
   - Auto-scroll to bottom on new message

⏳ **6. Incoming Challenges on Home Screen** — QUEUED
   - Check Firebase for incoming async challenges
   - Show "You have X pending challenges" section on home
   - List challengers with "Answer now" button
   - Badge on Friends nav with count

⏳ **7. Team Mode Implementation (most complex)** — QUEUED
   - Move "Team Mode" above individual game modes (selector)
   - Prompt for QR/link to invite players BEFORE game selection
   - Add `team` property to Firebase player objects
   - Group players by team color in room (Gold vs. Ruby)
   - Team score display (collective + individual)
   - Win screen: "Team Gold Wins! 🏆"
   - Change "Setup and Play" → "Play"

---

## Next Steps (Recommended Order)

**Option A: Continue with me (full orchestration)**
- I'll delegate each branch to Codex for implementation
- You review changes, I commit
- All done by end of session

**Option B: Faster with all AIs in parallel**
- Use Chinese models (Kimi, Qwen) for non-sensitive code (Branches 3-6)
- Use Codex for complex logic (Branch 7 — Team Mode)
- Run in parallel, merge results
- Reduces session time significantly

**Option C: Gradual rollout**
- Finish Branches 3-5 today (styling, messaging)
- Deploy & test live
- Do Branch 7 (Team Mode) next session with fresh context

---

## Deployed to Live (thelampgame.com)
- Last deploy: 2026-03-28
- Visual overhaul + online settings (ready in dev, not yet deployed)
- **Branches 1-2 now in dev** — need full 7 branches before deploying

## Testing Checklist
- [ ] All 4 themes: buttons apply correctly on switch
- [ ] Challenge cards: Duel (blue) vs. Challenges (gold) visually distinct
- [ ] Host Room: slider 7-33, label updates dynamically
- [ ] Messages: last message shows in preview
- [ ] Incoming challenges: appear on home + nav badge
- [ ] Team Mode: QR invite flow, team grouping, team scoring, win screen

---

## Last Deploy Context (2026-04-08)
- Play Online Now: settings overlay before room creation
- Home visual: particles, glows, animations
- Challenges card: gold/trophy themed
- Duel card: blue/social themed
- Question banks: 9,231 total (MCQ 3,012 + TF 3,219 + Verse 3,000)

---

## Up Next (after Multiplayer Overhaul)
- Onboarding flow (new users land cold, no explanation)
- Email capture (zero re-engagement currently)
- Push notification timing (prompt after first win)
- Seasonal pages: Easter trivia, Christmas quiz
- "Hard Bible Trivia" landing page (low-competition keywords)
