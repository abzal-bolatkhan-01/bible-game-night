# Lamp - Game Design Improvements

## Task 1: Daily Verse Rotation (IMPLEMENTED)

**What changed:**
- Replaced 36 generic Bible verses with 31 verses specifically about light, lamps, and guidance — matching the app name "Lamp"
- Changed rotation from local-time to UTC-based so all players worldwide see the same verse on the same day
- Added Knuth multiplicative hash for pseudo-random daily selection (avoids predictable sequential cycling)
- Label changed from "Verse of the Day" to "Light for Today"

**How it works:**
1. Takes UTC date, converts to days-since-epoch (a single integer)
2. Multiplies by 2654435761 (Knuth's constant) for pseudo-random distribution
3. Modulo by array length picks the verse
4. Same UTC day = same verse for everyone on Earth

---

## Task 2: Unified "Houses" System (Clans + Ranks Merge)

### Current Problem
- **Clans** = church groups (social, identity, join/create with codes)
- **Ranks/Leaderboard** = individual XP progression (solo, competitive)
- These exist on separate screens and feel disconnected. Players don't see how their effort benefits their group.

### Proposed: "Houses of Faith" System

Rename "Clans" to **Houses**. Each House combines community + competition + progression in one system.

#### How It Works

**House Structure:**
```
House (e.g., "Grace Community Church")
├── House Level: based on total House XP
├── House Rank: position on global House leaderboard
├── Members:
│   ├── Player A (Elder rank within house)
│   ├── Player B (Disciple rank within house)
│   └── Player C (Seeker rank within house)
└── Weekly Glory: resets every Monday, drives weekly competition
```

**Individual Titles Within Houses:**
Instead of the current flat LEVELS array, tie titles to contribution:

| House Title | Requirement | Perk |
|---|---|---|
| Seeker | Join a house | Basic member |
| Disciple | 500 XP contributed | Can invite others |
| Deacon | 2000 XP + 10 games | Appears in "Notable Members" |
| Elder | 5000 XP + 50 games | Can manage house settings |
| Shepherd | Top contributor this month | Crown icon next to name |

**House Points ("Glory"):**
- Every correct answer = 1 Glory for your House
- Winning a game = 5 bonus Glory
- Daily challenge completion = 3 Glory
- Streak bonus: consecutive daily challenges multiply Glory (day 3 = 1.5x, day 7 = 2x)

**House Leaderboard (replaces separate Clan + Global tabs):**
- One unified "Houses" tab showing ranked houses by weekly Glory
- "Members" sub-tab showing individual contributions within your house
- "Global" still exists for solo players who don't want a house

**Weekly Seasons:**
- Every Monday, weekly Glory resets
- Top 3 houses get a banner/trophy for that week
- Members of winning house get a small XP bonus
- This creates recurring engagement without needing to build a complex season system

#### Implementation Plan
1. Rename `clanName` to `houseName`, `clanCode` to `houseCode` in profile
2. Add `houseGlory` field to Firebase house records (resets weekly)
3. Merge the "Clans" screen and "Leaderboard > Clan" tab into a single "Houses" tab in bottom nav
4. Add `houseTitle` computed field based on cumulative contribution
5. On correct answer / game win, push Glory to `houses/{code}/weeklyGlory` and `houses/{code}/members/{uid}/contributed`

#### What to Change in Code
- Bottom nav: replace "Clans" icon/screen with "Houses"
- Leaderboard screen: remove "Clan" tab, add "My House" section at top of leaderboard
- Profile screen: show House title prominently (e.g., "Elder of Grace Community")
- After each game: show "You earned X Glory for [House Name]!" toast

---

## Task 3: Multiplayer Improvements (Competitive Analysis + Prioritized Ideas)

### Current State Analysis

**Strengths:**
- Pass & Play mode is great for church groups / family night (no internet needed)
- Firebase rooms work for real-time online play
- Clean category system with 20+ question banks
- Daily challenge with streak tracking
- XP / level / achievement system exists

**Weaknesses:**
- No 1v1 matchmaking (must share room codes)
- No time-pressure scoring (right = right, no speed bonus)
- Online rooms are ephemeral — no persistent community
- No reason to come back after playing a few rounds
- Clans feel bolted on — no clan activities besides a leaderboard number

### Competitive Comparison

| Feature | Kahoot | Sporcle | QuizUp | HQ Trivia | Lamp |
|---|---|---|---|---|---|
| Speed scoring | Yes | No | Yes | No | No |
| Categories | Host picks | 100s | 100s | Host picks | ~20 |
| Matchmaking | Host code | Solo | Auto 1v1 | Live event | Room code |
| Progression | No | Badges | Seasons | No | XP/Levels |
| Social | Lobby names | Following | Friends | Chat | Clans |
| Unique hook | Live energy | Depth | Duels | Prize money | Bible focus |

### Improvement Ideas (Priority Order)

#### 1. Speed Scoring (HIGH PRIORITY, LOW EFFORT)
**What:** Award more points for faster answers. Currently right = flat XP. Instead:
- Answer in first 3 seconds: 100 points
- Answer in 3-8 seconds: 75 points
- Answer in 8-15 seconds: 50 points
- Answer in last 5 seconds: 25 points

**Why:** This is the single biggest engagement lever. It turns passive knowledge into active competition. Kahoot proved this. Players lean forward when speed matters.

**How:** In the existing `checkAnswer()` function, capture `G.TIM - remainingTime` and multiply score accordingly.

#### 2. Quick Duel Mode (HIGH PRIORITY, MEDIUM EFFORT)
**What:** One-tap "Play Now" button that matches you against one random opponent for a 5-question speed round.

**Why:** QuizUp's entire success was built on this. Most players don't have friends online at the same time. Random matching removes that friction. Five questions keeps it under 2 minutes — perfect for commute/break play.

**How:**
- Firebase queue: write to `matchmaking/{difficulty}` with your UID
- Listen for another player joining
- Auto-create a room, sync 5 questions
- Show live opponent score during play
- Winner gets bonus XP, loser still gets participation XP

#### 3. Weekly Tournament (HIGH PRIORITY, LOW EFFORT)
**What:** Every week, a specific category is featured. All players play the same 20 questions. Leaderboard shows who scored highest + fastest.

**Why:** Creates a shared event everyone can talk about. HQ Trivia showed that synchronized play creates community. This is a lightweight version that doesn't need a live host.

**How:**
- Pick category based on `weekNumber % categories.length`
- Store results in `weekly-tournament/{week}/{uid}`
- Show tournament leaderboard on home screen during active week
- Top 10 get a "Weekly Champion" badge

#### 4. Streak Multiplier Visual (MEDIUM PRIORITY, LOW EFFORT)
**What:** When a player gets 3+ correct in a row, show an escalating visual: fire around their avatar, screen shake, combo counter.

**Why:** Psychological feedback loop. Players chase streaks. Duolingo's streak system is their #1 retention feature. You already track `bestStreak` — now make it feel exciting in the moment.

**How:**
- Track `currentStreak` in game state
- At 3: show "On Fire!" toast
- At 5: flame border on answer buttons
- At 7: screen pulse + "UNSTOPPABLE" text
- At 10: confetti + achievement unlock

#### 5. Category Mastery Badges (MEDIUM PRIORITY, LOW EFFORT)
**What:** For each category (Genesis, Psalms, etc.), track correct/total. At 80%+ accuracy over 20+ questions, award a mastery badge shown on profile.

**Why:** Sporcle's badge system drives completionists to play categories they'd otherwise skip. This expands replay value across all your question banks without adding new content.

**How:**
- Add `categoryStats: { genesis: { correct: 0, total: 0 } }` to profile
- After each question, increment the relevant category
- Check for mastery threshold
- Show badges in a grid on profile screen

#### 6. Cosmetic Rewards (MEDIUM PRIORITY, MEDIUM EFFORT)
**What:** Let players unlock and equip:
- Name colors (gold, purple, crimson)
- Profile frames (flame border, crown border, scroll border)
- Titles ("Psalm Scholar", "Prophet", "Lamp Bearer")

**Why:** This is your monetization path. Free players earn cosmetics slowly through XP. Premium could unlock them instantly or offer exclusive ones. Fortnite proved cosmetics > pay-to-win.

**How:**
- Add `cosmetics: { unlockedFrames: [], equippedFrame: '', nameColor: '' }` to profile
- Award on level-up, achievement, or tournament win
- Render in leaderboard rows and multiplayer lobbies

#### 7. Spectator/Live Mode (LOWER PRIORITY, HIGH EFFORT)
**What:** One person hosts on a big screen (projector at church). Everyone joins on their phones. Host screen shows the question + live answer distribution + leaderboard after each question.

**Why:** This is the Kahoot church-night killer feature. Youth pastors would use this weekly. It's the most requested feature type for educational trivia games.

**How:**
- Add `displayMode: true` to room settings
- Host screen shows question full-screen, no answer buttons
- Players see only answer buttons on their phones
- After timer, host screen reveals correct answer + bar chart of responses
- This needs a separate "host view" template

#### 8. "Parables" Narrative Questions (LOWER PRIORITY, MEDIUM EFFORT)
**What:** A new question type where you read a short story excerpt and identify the parable, its lesson, or what happens next. More like reading comprehension than trivia.

**Why:** Differentiates Lamp from generic trivia. Tests deeper understanding. Appeals to the "study group" audience who wants more than factoid recall.

#### 9. Daily Puzzle: "Verse Builder" (LOWER PRIORITY, MEDIUM EFFORT)
**What:** Given a scrambled verse (words out of order), drag/tap to reconstruct it. One puzzle per day, shared by all users.

**Why:** Wordle proved daily puzzles drive habitual return. A Bible verse unscramble is unique to Lamp and reinforces Scripture memorization — which aligns with the mission.

#### 10. Prayer Wall / Community Board (LOWER PRIORITY, LOW EFFORT)
**What:** A simple shared board where players can post short prayer requests or encouragements (140 chars max). Moderated, church-context only.

**Why:** Transforms Lamp from "game" to "community." Retention comes from feeling connected to people, not just points. This is the one feature competitors cannot copy because they aren't faith-based.

---

## Task 4: Oil Lamp SVG (IMPLEMENTED)

**What changed:**
- Replaced the candle SVG (icon.svg) with a biblical oil lamp design
- Replaced the inline candle SVG on the homepage with a matching oil lamp
- Design uses the existing mahogany color palette (#c4880a, #8a5c1a, #0d0906)

**Design elements:**
- Teardrop flame with radial gradient (white core to gold to transparent)
- Ambient glow halo behind flame
- Classic oil lamp bowl shape (not a candle or Aladdin lamp — a simple biblical clay lamp silhouette)
- Curved handle on right side
- Pedestal base
- Subtle cross engraving on the lamp body
- Corner ornament stars maintained
- Subtle light rays emanating from flame
- Dark interior visible through bowl opening for depth

**The lamp shape communicates:**
- "Biblical" (oil lamps are the lamp of Psalm 119:105)
- "Warmth" (gold/amber palette)
- "Guidance" (light radiating outward)
- Works at 512x512 (app icon) and 52x56 (inline icon) sizes
