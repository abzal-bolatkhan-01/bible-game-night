# Bible Game Night

A feature-rich, visually appealing Bible quiz and game night application built with HTML, CSS, and JavaScript.

## 🌟 Features

- **Multiple Game Modes:**
  - **Pass & Play:** Local multiplayer for families and small groups.
  - **Online Room:** Real-time multiplayer over the internet.
  - **Battle Royale:** Competitive elimination-style gameplay.
  - **Nearby:** Play with others on the same WiFi or hotspot.
- **Diverse Question Types:**
  - **Classic:** Multiple-choice questions from across the Bible.
  - **True / False:** Quick-fire true or false challenges.
  - **Fill-in-Verse:** Complete famous Scripture verses.
  - **Lightning:** High-speed timed rounds.
- **Progression System:**
  - Earn XP and level up from "Seeker" to "Sage of Faith".
  - Unlock achievements.
  - Global and Clan-based leaderboards.
- **Customizable Experience:**
  - Choose your avatar and clan.
  - Adjustable difficulty (Easy, Medium, Hard).
  - Toggle sound effects, timers, and lives.

## 🚀 How to Play

1. **Locally:** Simply open `index.html` in any modern web browser (Chrome, Safari, Firefox, or Edge).
2. **Setup:** Create your profile by picking an avatar and entering your name.
3. **Start:** Choose your play style, question type, and difficulty, then hit "Play Now".

## 🌐 Configuring Online Play

To enable Online Room functionality, you need to provide your own Firebase configuration:

1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Create a new project.
3. Enable **Anonymous Authentication** and **Realtime Database**.
4. Register a "Web" app in your project to get your configuration object.
5. Open `index.html` in a text editor.
6. Find the `FB_CFG` constant near the bottom of the file (around line 1240) and replace the placeholders with your project's details:

```javascript
const FB_CFG = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  databaseURL: "https://YOUR_PROJECT_ID.firebaseio.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

## 🛠️ Built With

- **HTML5/CSS3:** Modern, responsive design with glassmorphism and smooth animations.
- **Vanilla JavaScript:** Fast, dependency-free core logic.
- **Web Audio API:** Custom sound engine for an immersive experience.
- **Firebase:** Real-time data synchronization for multiplayer and leaderboards.

## ❤️ Support This Ministry

This app is designed to be a blessing to families and churches. If you enjoy it, please consider supporting its growth.
