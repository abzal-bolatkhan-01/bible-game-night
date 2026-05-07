#!/usr/bin/env node
// Generates SEO category pages from QB data in index.html
// Usage: node gen-seo-pages.js

const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');

// Extract QB object
const qbStart = html.indexOf('const QB={');
const qbEnd = html.indexOf('\nconst TF_Q=', qbStart);
const qbRaw = html.slice(qbStart + 'const QB='.length, qbEnd).trim().replace(/;$/, '');

let QB;
try {
  QB = eval('(' + qbRaw + ')');
} catch (e) {
  console.error('Failed to parse QB:', e.message);
  process.exit(1);
}

const categories = Object.keys(QB);
console.log(`Found ${categories.length} categories:`, categories.join(', '));

const outDir = path.join(__dirname, 'trivia');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);

const slugify = s => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

const categoryMeta = {
  'Genesis':          { title: 'Genesis Bible Trivia Questions', desc: 'Test your knowledge of Genesis — creation, Adam & Eve, Noah, Abraham, Joseph, and more.' },
  'Exodus':           { title: 'Exodus Bible Trivia Questions',  desc: 'Quiz yourself on the Exodus — Moses, the Ten Plagues, the Red Sea, and the Ten Commandments.' },
  'Judges':           { title: 'Judges Bible Trivia Questions',  desc: 'How well do you know the Judges of Israel? Samson, Deborah, Gideon, and more.' },
  'Kings':            { title: 'Kings Bible Trivia Questions',   desc: 'Test your knowledge of Israel\'s kings — Saul, David, Solomon, Elijah, and the divided kingdom.' },
  'Psalms':           { title: 'Psalms Bible Trivia Questions',  desc: 'Scripture quiz on the Psalms — David\'s songs, wisdom poetry, and praise passages.' },
  'Prophets':         { title: 'Prophets Bible Trivia Questions',desc: 'Quiz on the Old Testament prophets — Isaiah, Jeremiah, Daniel, Jonah, and more.' },
  'Gospels':          { title: 'Gospels Bible Trivia Questions', desc: 'Test your knowledge of the four Gospels — Matthew, Mark, Luke, and John.' },
  'Parables':         { title: 'Parables of Jesus — Bible Trivia', desc: 'Quiz on Jesus\' parables — the Prodigal Son, Good Samaritan, Sower, and more.' },
  'Acts':             { title: 'Book of Acts Bible Trivia',      desc: 'Test your knowledge of Acts — Pentecost, Paul\'s journeys, early church history.' },
  'Epistles':         { title: 'Epistles Bible Trivia Questions',desc: 'Quiz on the New Testament letters — Romans, Corinthians, Galatians, Ephesians, and more.' },
  'Revelation':       { title: 'Revelation Bible Trivia Questions', desc: 'How well do you know Revelation? Test your knowledge of the end times, seals, and prophecy.' },
  'Miracles':         { title: 'Bible Miracles Trivia Questions',desc: 'Quiz on the miracles of the Bible — from the parting of the Red Sea to the resurrection.' },
  'Women of the Bible': { title: 'Women of the Bible Trivia',   desc: 'Test your knowledge of Bible women — Ruth, Esther, Mary, Rahab, Deborah, and more.' },
  'Animals in the Bible': { title: 'Animals in the Bible Trivia', desc: 'Fun Bible trivia about animals — from Noah\'s ark to Balaam\'s donkey to the Lion\'s den.' },
  'Bible Geography':  { title: 'Bible Geography Trivia Questions', desc: 'Quiz on Bible places — Jerusalem, Bethlehem, the Jordan River, Egypt, and more.' },
  'Numbers & Dates':  { title: 'Bible Numbers & Dates Trivia',  desc: 'Test your Bible knowledge of numbers and dates — 40 days, 12 tribes, 7 seals, and more.' },
  'Old Testament Law':{ title: 'Old Testament Law Bible Trivia',desc: 'Quiz on the Law of Moses — the Ten Commandments, Levitical laws, and covenants.' },
  'Worship & Music':  { title: 'Bible Worship & Music Trivia',  desc: 'Test your knowledge of worship and music in the Bible — Psalms, David, temple worship, and hymns.' },
  'Who Am I?':        { title: 'Who Am I? Bible Character Trivia', desc: 'Guess the Bible character from clues — prophets, kings, apostles, and more.' },
};

function renderPage(category, questions) {
  const slug = slugify(category);
  const meta = categoryMeta[category] || { title: `${category} Bible Trivia`, desc: `Test your Bible knowledge with ${category} trivia questions.` };
  const sample = questions.slice(0, 12);
  const count = questions.length;

  const qHtml = sample.map((q, i) => {
    const options = (q.o || []).map((opt, j) => {
      const isAnswer = j === q.a;
      return `<li class="opt${isAnswer ? ' correct' : ''}" data-idx="${j}">${opt}${isAnswer ? ' <span class="badge">✓</span>' : ''}</li>`;
    }).join('');
    return `
    <div class="q-card">
      <div class="q-num">Question ${i + 1}</div>
      <div class="q-text">${q.q}</div>
      <ul class="opts">${options}</ul>
      ${q.e ? `<div class="q-exp">${q.e}</div>` : ''}
    </div>`;
  }).join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${meta.title} — Lamp Bible Trivia</title>
  <meta name="description" content="${meta.desc} Play ${count}+ questions free at Lamp Bible Trivia.">
  <meta name="keywords" content="${category.toLowerCase()} bible trivia, ${category.toLowerCase()} quiz questions, bible trivia, scripture quiz, ${category.toLowerCase()} bible quiz">
  <link rel="canonical" href="https://thelampgame.com/trivia/${slug}.html">
  <meta property="og:title" content="${meta.title} — Lamp Bible Trivia">
  <meta property="og:description" content="${meta.desc}">
  <meta property="og:url" content="https://thelampgame.com/trivia/${slug}.html">
  <meta property="og:type" content="website">
  <meta name="twitter:card" content="summary">
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Quiz",
    "name": "${meta.title}",
    "description": "${meta.desc}",
    "url": "https://thelampgame.com/trivia/${slug}.html",
    "educationalAlignment": {"@type": "AlignmentObject", "alignmentType": "teaches", "targetName": "Bible Knowledge"},
    "about": {"@type": "Thing", "name": "${category}"}
  }
  </script>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Georgia', serif; background: #1A1A20; color: #EDEDEC; line-height: 1.6; }
    a { color: #E0A860; text-decoration: none; }
    a:hover { text-decoration: underline; }

    .header { background: #13131a; border-bottom: 1px solid rgba(224,168,96,.2); padding: 14px 20px; display: flex; align-items: center; justify-content: space-between; }
    .logo { font-family: 'Georgia', serif; font-size: 22px; font-style: italic; color: #E0A860; }
    .play-btn { background: #E0A860; color: #1A1A20; border: none; border-radius: 8px; padding: 9px 20px; font-size: 14px; font-weight: 700; cursor: pointer; letter-spacing: .03em; }
    .play-btn:hover { background: #C4842A; }

    .hero { max-width: 720px; margin: 0 auto; padding: 40px 20px 24px; text-align: center; }
    .eyebrow { font-size: 11px; letter-spacing: .2em; color: #E0A860; text-transform: uppercase; margin-bottom: 10px; }
    h1 { font-size: clamp(26px, 5vw, 40px); color: #E0A860; margin-bottom: 12px; }
    .hero-sub { font-size: 16px; color: #A8A8A4; max-width: 560px; margin: 0 auto 24px; }
    .count-badge { display: inline-block; background: rgba(224,168,96,.1); border: 1px solid rgba(224,168,96,.3); border-radius: 20px; padding: 5px 14px; font-size: 13px; color: #E0A860; margin-bottom: 28px; }

    .cta-bar { background: rgba(224,168,96,.08); border: 1px solid rgba(224,168,96,.25); border-radius: 14px; padding: 20px; margin: 0 auto 40px; max-width: 480px; text-align: center; }
    .cta-bar p { font-size: 15px; color: #EDEDEC; margin-bottom: 14px; }
    .cta-bar .play-btn { font-size: 16px; padding: 12px 32px; border-radius: 10px; box-shadow: 0 4px 0 #8a5c14; }
    .cta-bar .play-btn:active { transform: translateY(2px); box-shadow: 0 2px 0 #8a5c14; }

    .questions { max-width: 720px; margin: 0 auto; padding: 0 20px 60px; }
    .section-title { font-size: 13px; letter-spacing: .18em; color: #E0A860; text-transform: uppercase; margin-bottom: 20px; padding-bottom: 8px; border-bottom: 1px solid rgba(224,168,96,.15); }
    .q-card { background: #242430; border: 1px solid rgba(255,255,255,.06); border-radius: 14px; padding: 20px; margin-bottom: 16px; }
    .q-num { font-size: 10px; letter-spacing: .15em; color: #737373; text-transform: uppercase; margin-bottom: 8px; }
    .q-text { font-size: 16px; color: #EDEDEC; margin-bottom: 14px; font-weight: 600; }
    .opts { list-style: none; display: flex; flex-direction: column; gap: 7px; }
    .opt { background: rgba(255,255,255,.04); border: 1px solid rgba(255,255,255,.08); border-radius: 8px; padding: 10px 14px; font-size: 14px; color: #A8A8A4; cursor: default; }
    .opt.correct { background: rgba(224,168,96,.1); border-color: rgba(224,168,96,.4); color: #E0A860; font-weight: 700; }
    .badge { font-size: 11px; background: rgba(224,168,96,.2); border-radius: 4px; padding: 1px 5px; margin-left: 6px; }
    .q-exp { font-size: 12px; color: #737373; margin-top: 12px; font-style: italic; border-top: 1px solid rgba(255,255,255,.05); padding-top: 10px; }

    .bottom-cta { background: linear-gradient(135deg, #13131a, #1A1A20); border-top: 1px solid rgba(224,168,96,.15); padding: 40px 20px; text-align: center; }
    .bottom-cta h2 { font-size: 24px; color: #E0A860; margin-bottom: 10px; }
    .bottom-cta p { color: #A8A8A4; margin-bottom: 20px; font-size: 15px; }

    .footer { text-align: center; padding: 20px; font-size: 12px; color: #737373; border-top: 1px solid rgba(255,255,255,.05); }
    .footer a { color: #A8A8A4; }

    .breadcrumb { max-width: 720px; margin: 0 auto; padding: 14px 20px 0; font-size: 12px; color: #737373; }
    .breadcrumb a { color: #A8A8A4; }
  </style>
</head>
<body>

<header class="header">
  <a href="/" class="logo">Lamp</a>
  <a href="/" onclick="return false;" onclick="window.location='/'"><button class="play-btn" onclick="window.location='/'">Play Free</button></a>
</header>

<nav class="breadcrumb">
  <a href="/">Home</a> › <a href="/trivia/">Bible Trivia</a> › ${category}
</nav>

<section class="hero">
  <div class="eyebrow">Bible Trivia</div>
  <h1>${meta.title}</h1>
  <p class="hero-sub">${meta.desc}</p>
  <div class="count-badge">📖 ${count}+ questions</div>

  <div class="cta-bar">
    <p>Play all ${count} ${category} questions interactively — free, no download needed.</p>
    <button class="play-btn" onclick="window.location='/'">Play ${category} Trivia Free →</button>
  </div>
</section>

<main class="questions">
  <div class="section-title">Sample Questions</div>
  ${qHtml}

  <div style="text-align:center;margin-top:32px;">
    <p style="color:#A8A8A4;margin-bottom:16px;font-size:15px;">Want all ${count} questions with scoring, streaks, and multiplayer?</p>
    <button class="play-btn" style="font-size:16px;padding:13px 36px;border-radius:10px;box-shadow:0 4px 0 #8a5c14;" onclick="window.location='/'">Play the Full Game Free</button>
  </div>
</main>

<section class="bottom-cta">
  <h2>Ready to test your Bible knowledge?</h2>
  <p>9,231 questions · Daily challenges · Multiplayer · Free forever</p>
  <button class="play-btn" style="font-size:16px;padding:13px 36px;border-radius:10px;box-shadow:0 4px 0 #8a5c14;" onclick="window.location='/'">Play Lamp Bible Trivia →</button>
  <div style="margin-top:16px;font-size:13px;color:#737373;">
    Also try:
    ${categories.filter(c=>c!==category).slice(0,5).map(c=>`<a href="/trivia/${slugify(c)}.html">${c}</a>`).join(' · ')}
  </div>
</section>

<footer class="footer">
  <p><a href="/">Lamp Bible Trivia</a> · <a href="/privacy.html">Privacy</a> · © ${new Date().getFullYear()} Lamp</p>
  <p style="margin-top:6px;">Psalm 119:105 — Your word is a lamp to my feet and a light to my path.</p>
</footer>

</body>
</html>`;
}

// Generate index page for /trivia/
function renderIndex(categories) {
  const catLinks = categories.map(cat => {
    const slug = slugify(cat);
    const count = QB[cat].length;
    return `    <a href="/trivia/${slug}.html" class="cat-card">
      <div class="cat-name">${cat}</div>
      <div class="cat-count">${count} questions</div>
    </a>`;
  }).join('\n');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bible Trivia Questions by Category — Lamp</title>
  <meta name="description" content="Browse 9,231 Bible trivia questions by category — Genesis, Psalms, Gospels, Revelation, and 15 more. Play free at Lamp Bible Trivia.">
  <link rel="canonical" href="https://thelampgame.com/trivia/">
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Georgia', serif; background: #1A1A20; color: #EDEDEC; line-height: 1.6; }
    a { color: #E0A860; text-decoration: none; }
    .header { background: #13131a; border-bottom: 1px solid rgba(224,168,96,.2); padding: 14px 20px; display: flex; align-items: center; justify-content: space-between; }
    .logo { font-family: 'Georgia', serif; font-size: 22px; font-style: italic; color: #E0A860; }
    .play-btn { background: #E0A860; color: #1A1A20; border: none; border-radius: 8px; padding: 9px 20px; font-size: 14px; font-weight: 700; cursor: pointer; }
    .hero { max-width: 720px; margin: 0 auto; padding: 40px 20px 24px; text-align: center; }
    .eyebrow { font-size: 11px; letter-spacing: .2em; color: #E0A860; text-transform: uppercase; margin-bottom: 10px; }
    h1 { font-size: clamp(26px, 5vw, 38px); color: #E0A860; margin-bottom: 12px; }
    .hero-sub { font-size: 16px; color: #A8A8A4; max-width: 560px; margin: 0 auto 28px; }
    .grid { max-width: 720px; margin: 0 auto; padding: 0 20px 60px; display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 12px; }
    .cat-card { background: #242430; border: 1px solid rgba(255,255,255,.07); border-radius: 12px; padding: 18px 16px; transition: border-color .2s; }
    .cat-card:hover { border-color: rgba(224,168,96,.4); }
    .cat-name { font-size: 15px; font-weight: 700; color: #EDEDEC; margin-bottom: 4px; }
    .cat-count { font-size: 12px; color: #737373; }
    .footer { text-align: center; padding: 20px; font-size: 12px; color: #737373; border-top: 1px solid rgba(255,255,255,.05); }
    .footer a { color: #A8A8A4; }
  </style>
</head>
<body>
<header class="header">
  <a href="/" class="logo">Lamp</a>
  <button class="play-btn" onclick="window.location='/'">Play Free</button>
</header>
<section class="hero">
  <div class="eyebrow">Browse by Category</div>
  <h1>Bible Trivia Questions</h1>
  <p class="hero-sub">9,231 questions across 19 categories. Pick a category to see sample questions — or play the full game free.</p>
</section>
<div class="grid">
${catLinks}
</div>
<footer class="footer">
  <p><a href="/">Lamp Bible Trivia</a> · <a href="/privacy.html">Privacy</a> · © ${new Date().getFullYear()} Lamp</p>
</footer>
</body>
</html>`;
}

// Write all files
let generated = 0;
for (const cat of categories) {
  const slug = slugify(cat);
  const page = renderPage(cat, QB[cat]);
  fs.writeFileSync(path.join(outDir, `${slug}.html`), page);
  console.log(`✓ trivia/${slug}.html (${QB[cat].length} questions)`);
  generated++;
}

fs.writeFileSync(path.join(outDir, 'index.html'), renderIndex(categories));
console.log(`✓ trivia/index.html`);
console.log(`\nDone: ${generated} category pages + 1 index = ${generated + 1} files`);
