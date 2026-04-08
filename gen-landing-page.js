#!/usr/bin/env node
// Generates a single SEO landing page from a questions JSON array
// Usage: node gen-landing-page.js <config-file>

const fs = require('fs');
const path = require('path');

const configs = [
  {
    slug: 'easter-bible-trivia',
    title: 'Easter Bible Trivia Questions & Answers',
    eyebrow: 'Easter',
    emoji: '✝️',
    desc: '30 Easter Bible trivia questions covering the crucifixion, resurrection, Last Supper, Palm Sunday, and more. Perfect for Easter Sunday, church groups, and family quiz night.',
    keywords: 'easter bible trivia, easter trivia questions, resurrection trivia, palm sunday quiz, easter bible quiz, easter sunday trivia, christian easter questions',
    tags: ['Church Groups', 'Easter Sunday', 'Family Quiz', 'Good Friday', 'Resurrection'],
    schemaType: 'Quiz',
    schemaAbout: 'Easter and Resurrection of Jesus Christ',
    cta: 'Play Easter Bible Trivia Free',
    related: [
      {href:'/trivia/gospels.html', label:'Gospels'},
      {href:'/trivia/miracles.html', label:'Miracles'},
      {href:'/trivia/parables.html', label:'Parables'},
      {href:'/trivia/hard-bible-trivia.html', label:'Hard Bible Trivia'},
    ],
    questions: [{"q":"What did the crowd wave as Jesus entered Jerusalem on Palm Sunday?","o":["Olive branches","Cedar twigs","Palm branches","Willow boughs"],"a":2,"e":"John 12:13 — The crowd took palm branches and went out to meet Him, shouting 'Hosanna!'","d":"easy"},{"q":"On what animal did Jesus ride into Jerusalem during His triumphal entry?","o":["A donkey","A horse","A camel","A mule"],"a":0,"e":"Matthew 21:7 — They brought the donkey and the colt and placed their cloaks on them for Jesus to sit on.","d":"easy"},{"q":"What did Jesus use to wash the disciples' feet during the Last Supper?","o":["A jar of perfume","A sponge","Oil","A towel and water"],"a":3,"e":"John 13:5 — After that, He poured water into a basin and began to wash His disciples' feet, drying them with the towel.","d":"easy"},{"q":"Who betrayed Jesus for 30 pieces of silver?","o":["Simon Peter","Judas Iscariot","Pontius Pilate","Thomas"],"a":1,"e":"Matthew 26:14-15 — Then one of the Twelve—the one called Judas Iscariot—asked, 'What are you willing to give me if I deliver Him over to you?'","d":"easy"},{"q":"What did Jesus and His disciples eat and drink during the Last Supper to represent His body and blood?","o":["Bread and wine","Lamb and bitter herbs","Fish and water","Honey and milk"],"a":0,"e":"Luke 22:19-20 — Jesus took bread and gave thanks... and after the supper He took the cup, saying, 'This cup is the new covenant in my blood.'","d":"easy"},{"q":"In which garden did Jesus pray before He was arrested?","o":["Eden","Sharon","Gethsemane","Carmel"],"a":2,"e":"Matthew 26:36 — Then Jesus went with His disciples to a place called Gethsemane, and He said to them, 'Sit here while I go over there and pray.'","d":"easy"},{"q":"What did the Roman soldiers place on Jesus' head to mock Him?","o":["A gold crown","A crown of thorns","A purple turban","A laurel wreath"],"a":1,"e":"Matthew 27:29 — They twisted together a crown of thorns and set it on His head.","d":"easy"},{"q":"How many times did Peter deny knowing Jesus before the rooster crowed?","o":["Once","Twice","Four times","Three times"],"a":3,"e":"Matthew 26:75 — Then Peter remembered the word Jesus had spoken: 'Before the rooster crows, you will disown me three times.'","d":"easy"},{"q":"On what day of the week did the women find the tomb of Jesus empty?","o":["The first day of the week","The Sabbath","The day after the Sabbath","The third day of the month"],"a":0,"e":"Matthew 28:1 — After the Sabbath, at dawn on the first day of the week, Mary Magdalene and the other Mary went to look at the tomb.","d":"easy"},{"q":"Who was the first person to see the risen Jesus outside the tomb?","o":["John","Peter","Mary Magdalene","Salome"],"a":2,"e":"John 20:14-16 — She turned around and saw Jesus standing there... Jesus said to her, 'Mary.' She turned toward Him and cried out 'Rabboni!'","d":"easy"},{"q":"Which Old Testament prophet predicted Jesus would enter Jerusalem on a donkey?","o":["Isaiah","Zechariah","Jeremiah","Ezekiel"],"a":1,"e":"Zechariah 9:9 — Rejoice greatly, Daughter Zion! See, your king comes to you... gentle and riding on a donkey.","d":"medium"},{"q":"What was the name of the high priest who questioned Jesus before the Sanhedrin?","o":["Annas","Gamaliel","Nicodemus","Caiaphas"],"a":3,"e":"Matthew 26:57 — Those who had arrested Jesus took Him to Caiaphas the high priest, where the teachers of the law and the elders had assembled.","d":"medium"},{"q":"Which prisoner was released by Pontius Pilate instead of Jesus?","o":["Barabbas","Barnabas","Silas","Malchus"],"a":0,"e":"Matthew 27:21 — 'Which of the two do you want me to release to you?' asked the governor. 'Barabbas,' they answered.","d":"medium"},{"q":"What was the name of the place where Jesus was crucified, also called the Place of the Skull?","o":["Zion","Moriah","Golgotha","Sinai"],"a":2,"e":"Luke 23:33 — When they came to the place called the Skull, they crucified Him there.","d":"medium"},{"q":"What did the sign above Jesus on the cross say?","o":["The Son of God","Jesus of Nazareth, King of the Jews","The Prophet of Galilee","The King of Israel"],"a":1,"e":"John 19:19 — Pilate had a notice prepared and fastened to the cross. It read: JESUS OF NAZARETH, THE KING OF THE JEWS.","d":"medium"},{"q":"For what did the soldiers cast lots at the foot of the cross?","o":["Jesus' sandals","The cross beam","His money bag","His seamless garment"],"a":3,"e":"John 19:23-24 — They said to one another, 'Let's not tear it. Let's decide by lot who will get it.'","d":"medium"},{"q":"Who was forced by the Roman soldiers to help Jesus carry His cross?","o":["Simon of Cyrene","Joseph of Arimathea","Andrew","James"],"a":0,"e":"Luke 23:26 — As the soldiers led Him away, they seized Simon from Cyrene... and put the cross on him and made him carry it behind Jesus.","d":"medium"},{"q":"What happened to the curtain in the Temple when Jesus died?","o":["It caught fire","It fell down","It was torn in two from top to bottom","It turned white"],"a":2,"e":"Matthew 27:51 — At that moment the curtain of the temple was torn in two from top to bottom.","d":"medium"},{"q":"Who asked Pilate for Jesus' body and provided the tomb for His burial?","o":["Nicodemus","Joseph of Arimathea","Lazarus","Zacchaeus"],"a":1,"e":"Matthew 27:57-60 — There came a rich man from Arimathea, named Joseph... Going to Pilate, he asked for Jesus' body.","d":"medium"},{"q":"Which disciple said he would not believe Jesus had risen until he touched the nail marks?","o":["Philip","Bartholomew","Matthew","Thomas"],"a":3,"e":"John 20:24-25 — Thomas said, 'Unless I see the nail marks in His hands and put my finger where the nails were... I will not believe.'","d":"medium"},{"q":"What did Jesus say to the criminal on the cross who asked to be remembered?","o":["Today you will be with me in Paradise","Your sins are forgiven","Believe and you shall be saved","I will remember you in my Kingdom"],"a":0,"e":"Luke 23:43 — Jesus answered him, 'Truly I tell you, today you will be with me in paradise.'","d":"hard"},{"q":"Which Psalm contains the words Jesus cried out: 'My God, my God, why have you forsaken me?'","o":["Psalm 23","Psalm 51","Psalm 22","Psalm 110"],"a":2,"e":"Psalm 22:1 — My God, my God, why have you forsaken me? Why are you so far from saving me?","d":"hard"},{"q":"How many disciples were walking on the road to Emmaus when they met the risen Jesus?","o":["One","Two","Three","Twelve"],"a":1,"e":"Luke 24:13 — Now that same day two of them were going to a village called Emmaus.","d":"hard"},{"q":"What did Jesus eat to prove to the disciples He was not a ghost?","o":["Bread","Lamb","Honey","Broiled fish"],"a":3,"e":"Luke 24:42-43 — They gave Him a piece of broiled fish, and He took it and ate it in their presence.","d":"hard"},{"q":"How many fish did the disciples catch when Jesus appeared to them by the Sea of Galilee?","o":["153","12","70","120"],"a":0,"e":"John 21:11 — Simon Peter climbed aboard and dragged the net ashore. It was full of large fish, 153.","d":"hard"},{"q":"Which Old Testament book describes the 'Suffering Servant' who was 'pierced for our transgressions'?","o":["Psalms","Daniel","Isaiah","Hosea"],"a":2,"e":"Isaiah 53:5 — But He was pierced for our transgressions, He was crushed for our iniquities.","d":"hard"},{"q":"Who was the Roman governor of Judea who sentenced Jesus to death?","o":["Herod Antipas","Pontius Pilate","Felix","Festus"],"a":1,"e":"Matthew 27:2 — They bound Him, led Him away and handed Him over to Pilate the governor.","d":"hard"},{"q":"What did the Sanhedrin give the soldiers to say the disciples stole Jesus' body?","o":["A warning","Promotion","Wine","A large sum of money"],"a":3,"e":"Matthew 28:12-13 — The chief priests... gave the soldiers a large sum of money, telling them, 'You are to say, His disciples came during the night and stole Him away.'","d":"hard"},{"q":"According to Paul in 1 Corinthians, to how many people did Jesus appear at once after His resurrection?","o":["More than 500","The Twelve only","Exactly 70","About 120"],"a":0,"e":"1 Corinthians 15:6 — After that, He appeared to more than five hundred of the brothers and sisters at the same time.","d":"hard"},{"q":"From which mountain near Jerusalem did Jesus ascend into heaven?","o":["Mount Sinai","Mount Nebo","Mount of Olives","Mount Hermon"],"a":2,"e":"Acts 1:12 — Then the apostles returned to Jerusalem from the hill called the Mount of Olives.","d":"hard"}]
  },
  {
    slug: 'hard-bible-trivia',
    title: 'Hard Bible Trivia Questions',
    eyebrow: 'Challenge',
    emoji: '🔥',
    desc: '30 genuinely hard Bible trivia questions — obscure facts, minor characters, exact numbers, and deep scripture knowledge. For serious Bible students only.',
    keywords: 'hard bible trivia, difficult bible trivia, hard bible quiz, challenging bible questions, advanced bible trivia, bible trivia hard, tough bible questions',
    tags: ['Bible Scholars', 'Advanced', 'Deep Scripture', 'OT & NT', 'Church Leaders'],
    schemaType: 'Quiz',
    schemaAbout: 'Advanced Bible Knowledge',
    cta: 'Play Hard Bible Trivia Free',
    related: [
      {href:'/trivia/revelation.html', label:'Revelation'},
      {href:'/trivia/prophets.html', label:'Prophets'},
      {href:'/trivia/epistles.html', label:'Epistles'},
      {href:'/trivia/easter-bible-trivia.html', label:'Easter Trivia'},
    ],
    questions: [{"q":"Who was the first person mentioned in the Bible to build a city, and what did he name it?","o":["Cain; Enoch","Nimrod; Babel","Enoch; Cain","Seth; Nod"],"a":0,"e":"Genesis 4:17 — Cain built a city and named it after his son Enoch.","d":"hard"},{"q":"According to the census in Numbers 1, which tribe had the smallest number of men fit for war?","o":["Asher","Benjamin","Naphtali","Manasseh"],"a":3,"e":"Numbers 1:35 — The tribe of Manasseh had 32,200 men.","d":"hard"},{"q":"What was the name of the servant of the high priest whose right ear was cut off by Peter?","o":["Malchus","Marcus","Eleazar","Rhoda"],"a":0,"e":"John 18:10 — Simon Peter drew his sword and struck the high priest's servant, cutting off his right ear. The servant's name was Malchus.","d":"hard"},{"q":"How many years did King Jehoash (Joash) of Judah reign in Jerusalem?","o":["7 years","21 years","40 years","52 years"],"a":2,"e":"2 Kings 12:1 — Joash became king, and he reigned forty years in Jerusalem.","d":"hard"},{"q":"Which prophet is identified at the beginning of his book as the son of Pethuel?","o":["Amos","Joel","Haggai","Micah"],"a":1,"e":"Joel 1:1 — The word of the Lord that came to Joel the son of Pethuel.","d":"hard"},{"q":"In the Book of Esther, who plotted with Bigthan to assassinate King Ahasuerus?","o":["Hegai","Hatach","Harbona","Teresh"],"a":3,"e":"Esther 2:21 — Two of the king's eunuchs, Bigthan and Teresh, became furious and sought to lay hands on King Ahasuerus.","d":"hard"},{"q":"On which mountain did Aaron the high priest die?","o":["Mount Nebo","Mount Sinai","Mount Hor","Mount Carmel"],"a":2,"e":"Numbers 20:28 — Aaron died there on the top of Mount Hor.","d":"hard"},{"q":"Who was the father of the prophet Elisha?","o":["Amittai","Shaphat","Beeri","Hiliah"],"a":1,"e":"1 Kings 19:16 — Elisha the son of Shaphat... you shall anoint as prophet in your place.","d":"hard"},{"q":"How many pieces of silver did each Philistine lord promise Delilah to betray Samson?","o":["30","100","500","1,100"],"a":3,"e":"Judges 16:5 — Each of us will give you eleven hundred pieces of silver.","d":"hard"},{"q":"Which unnamed prophet was killed by a lion for disobeying God and eating in Bethel?","o":["The man of God from Judah","The old prophet of Bethel","The son of a prophet","The seer of Samaria"],"a":0,"e":"1 Kings 13:24 — When he was gone, a lion met him on the road and killed him.","d":"hard"},{"q":"What was the name of the left-handed judge who killed King Eglon of Moab?","o":["Othniel","Shamgar","Ehud","Tola"],"a":2,"e":"Judges 3:15 — The Lord raised up a deliverer... Ehud the son of Gera, the Benjamite, a left-handed man.","d":"hard"},{"q":"According to 1 Kings 4, how many stalls of horses did King Solomon possess?","o":["4,000","12,000","40,000","120,000"],"a":2,"e":"1 Kings 4:26 — Solomon had forty thousand stalls of horses for his chariots.","d":"hard"},{"q":"Who was the father of the prophet Samuel?","o":["Eli","Jeroham","Zuph","Elkanah"],"a":3,"e":"1 Samuel 1:1 — There was a certain man... whose name was Elkanah the son of Jeroham.","d":"hard"},{"q":"In which city was the street called 'Straight', where Ananias found Saul of Tarsus?","o":["Antioch","Damascus","Jerusalem","Tarsus"],"a":1,"e":"Acts 9:11 — The Lord said, 'Arise and go to the street called Straight, and inquire for one called Saul of Tarsus.'","d":"hard"},{"q":"What is the name of the great star in Revelation 8 that made a third of the waters bitter?","o":["Lucifer","Wormwood","Morning Star","Abaddon"],"a":1,"e":"Revelation 8:11 — The name of the star is Wormwood. A third of the waters became wormwood.","d":"hard"},{"q":"Who was struck dead by God for touching the Ark of the Covenant?","o":["Ahio","Eleazar","Obed-Edom","Uzzah"],"a":3,"e":"2 Samuel 6:6-7 — Uzzah put out his hand to the ark of God... and God struck him there.","d":"hard"},{"q":"Which king of Israel reigned for only seven days before burning the palace down on himself?","o":["Shallum","Pekahiah","Zimri","Jehu"],"a":2,"e":"1 Kings 16:15-18 — Zimri had reigned seven days... he burned the king's house down upon himself with fire, and died.","d":"hard"},{"q":"Who was the father of Methuselah, the longest-living man in the Bible?","o":["Lamech","Jared","Enoch","Mahalalel"],"a":2,"e":"Genesis 5:21 — Enoch lived sixty-five years, and begot Methuselah.","d":"hard"},{"q":"How many daughters were born to Job after the Lord restored his fortunes?","o":["Three","Seven","Ten","Two"],"a":0,"e":"Job 42:13 — He also had seven sons and three daughters.","d":"hard"},{"q":"Who identifies himself in Romans as the scribe who actually wrote down the epistle for Paul?","o":["Silas","Timothy","Tertius","Luke"],"a":2,"e":"Romans 16:22 — I, Tertius, who wrote this epistle, greet you in the Lord.","d":"hard"},{"q":"Which Egyptian Pharaoh invaded Judah during the fifth year of King Rehoboam?","o":["Necho","Shishak","So","Tirhakah"],"a":1,"e":"1 Kings 14:25 — In the fifth year of King Rehoboam, Shishak king of Egypt came up against Jerusalem.","d":"hard"},{"q":"Who is the only woman in the Bible whose age at death is specifically mentioned?","o":["Eve","Sarah","Rebekah","Rachel"],"a":1,"e":"Genesis 23:1 — Sarah lived one hundred and twenty-seven years.","d":"hard"},{"q":"Which of these was NOT one of the three 'mighty men' who broke through Philistine lines to bring David water?","o":["Josheb-Basshebeth","Eleazar","Shammah","Abishai"],"a":3,"e":"2 Samuel 23:8-18 — The three mighty men were Josheb-Basshebeth, Eleazar, and Shammah. Abishai was chief of the Thirty.","d":"hard"},{"q":"How many total cities were given to the Levites?","o":["48","12","24","70"],"a":0,"e":"Numbers 35:7 — All the cities you give to the Levites shall be forty-eight.","d":"hard"},{"q":"With whom did Paul leave his cloak and parchments in Troas?","o":["Tychicus","Artemas","Zenas","Carpus"],"a":3,"e":"2 Timothy 4:13 — Bring the cloak that I left with Carpus at Troas when you come.","d":"hard"},{"q":"On which island was the Apostle Paul shipwrecked while being transported to Rome?","o":["Crete","Malta","Cyprus","Rhodes"],"a":1,"e":"Acts 28:1 — They found out that the island was called Malta.","d":"hard"},{"q":"Which king of Judah was struck with leprosy after attempting to burn incense on the altar?","o":["Uzziah","Hezekiah","Josiah","Manasseh"],"a":0,"e":"2 Chronicles 26:19 — Leprosy broke out on his forehead... King Uzziah was a leper until the day of his death.","d":"hard"},{"q":"What was the name of the giant king of Bashan whose iron bedstead was nine cubits long?","o":["Sihon","Agag","Balak","Og"],"a":3,"e":"Deuteronomy 3:11 — For only Og king of Bashan remained... his bedstead was nine cubits in length.","d":"hard"},{"q":"What was the name of the first son born to the prophet Hosea and his wife Gomer?","o":["Jezreel","Lo-Ruhamah","Lo-Ammi","Shear-Jashub"],"a":0,"e":"Hosea 1:3-4 — She bore him a son. Then the Lord said: 'Call his name Jezreel.'","d":"hard"},{"q":"Which prophet is identified at the beginning of his book as the son of Pethuel?","o":["Amos","Joel","Haggai","Micah"],"a":1,"e":"Joel 1:1 — The word of the Lord that came to Joel the son of Pethuel.","d":"hard"}]
  }
];

const CSS = `
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Georgia', serif; background: #1A1A20; color: #EDEDEC; line-height: 1.6; }
    a { color: #E0A860; text-decoration: none; }
    a:hover { text-decoration: underline; }
    .header { background: #13131a; border-bottom: 1px solid rgba(224,168,96,.2); padding: 14px 20px; display: flex; align-items: center; justify-content: space-between; }
    .logo { font-size: 22px; font-style: italic; color: #E0A860; }
    .play-btn { background: #E0A860; color: #1A1A20; border: none; border-radius: 8px; padding: 9px 20px; font-size: 14px; font-weight: 700; cursor: pointer; box-shadow: 0 4px 0 #8a5c14; }
    .play-btn:active { transform: translateY(2px); box-shadow: 0 2px 0 #8a5c14; }
    .breadcrumb { max-width: 720px; margin: 0 auto; padding: 14px 20px 0; font-size: 12px; color: #737373; }
    .breadcrumb a { color: #A8A8A4; }
    .hero { max-width: 720px; margin: 0 auto; padding: 36px 20px 20px; text-align: center; }
    .eyebrow { font-size: 11px; letter-spacing: .2em; color: #E0A860; text-transform: uppercase; margin-bottom: 10px; }
    h1 { font-size: clamp(26px,5vw,38px); color: #E0A860; margin-bottom: 12px; }
    .hero-sub { font-size: 16px; color: #A8A8A4; max-width: 560px; margin: 0 auto 20px; }
    .count-badge { display: inline-block; background: rgba(224,168,96,.1); border: 1px solid rgba(224,168,96,.3); border-radius: 20px; padding: 5px 14px; font-size: 13px; color: #E0A860; margin-bottom: 20px; }
    .tags { display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; margin-bottom: 22px; }
    .tag { background: rgba(255,255,255,.05); border: 1px solid rgba(255,255,255,.08); border-radius: 20px; padding: 4px 12px; font-size: 12px; color: #A8A8A4; }
    .cta-bar { background: rgba(224,168,96,.08); border: 1px solid rgba(224,168,96,.25); border-radius: 14px; padding: 18px; margin: 0 auto 36px; max-width: 480px; text-align: center; }
    .cta-bar p { font-size: 15px; color: #EDEDEC; margin-bottom: 12px; }
    .cta-bar .play-btn { font-size: 16px; padding: 12px 32px; border-radius: 10px; }
    .questions { max-width: 720px; margin: 0 auto; padding: 0 20px 60px; }
    .section-title { font-size: 12px; letter-spacing: .18em; color: #E0A860; text-transform: uppercase; margin-bottom: 20px; padding-bottom: 8px; border-bottom: 1px solid rgba(224,168,96,.15); }
    .diff-label { display: inline-block; font-size: 9px; letter-spacing: .1em; text-transform: uppercase; padding: 2px 8px; border-radius: 10px; margin-left: 8px; vertical-align: middle; }
    .diff-easy { background: rgba(94,138,94,.15); color: #5E8A5E; border: 1px solid rgba(94,138,94,.3); }
    .diff-medium { background: rgba(224,168,96,.12); color: #E0A860; border: 1px solid rgba(224,168,96,.3); }
    .diff-hard { background: rgba(200,80,80,.12); color: #c85050; border: 1px solid rgba(200,80,80,.3); }
    .q-card { background: #242430; border: 1px solid rgba(255,255,255,.06); border-radius: 14px; padding: 20px; margin-bottom: 14px; }
    .q-num { font-size: 10px; letter-spacing: .15em; color: #737373; text-transform: uppercase; margin-bottom: 8px; }
    .q-text { font-size: 16px; color: #EDEDEC; margin-bottom: 14px; font-weight: 600; }
    .opts { list-style: none; display: flex; flex-direction: column; gap: 7px; }
    .opt { background: rgba(255,255,255,.04); border: 1px solid rgba(255,255,255,.08); border-radius: 8px; padding: 10px 14px; font-size: 14px; color: #A8A8A4; }
    .opt.correct { background: rgba(224,168,96,.1); border-color: rgba(224,168,96,.4); color: #E0A860; font-weight: 700; }
    .badge { font-size: 11px; background: rgba(224,168,96,.2); border-radius: 4px; padding: 1px 5px; margin-left: 6px; }
    .q-exp { font-size: 12px; color: #737373; margin-top: 12px; font-style: italic; border-top: 1px solid rgba(255,255,255,.05); padding-top: 10px; }
    .bottom-cta { background: linear-gradient(135deg,#13131a,#1A1A20); border-top: 1px solid rgba(224,168,96,.15); padding: 40px 20px; text-align: center; }
    .bottom-cta h2 { font-size: 22px; color: #E0A860; margin-bottom: 10px; }
    .bottom-cta p { color: #A8A8A4; margin-bottom: 20px; font-size: 15px; }
    .footer { text-align: center; padding: 20px; font-size: 12px; color: #737373; border-top: 1px solid rgba(255,255,255,.05); }
    .footer a { color: #A8A8A4; }
`;

function buildPage(cfg) {
  const qCards = cfg.questions.map((q, i) => {
    const opts = q.o.map((opt, j) => {
      const correct = j === q.a;
      return `<li class="opt${correct ? ' correct' : ''}">${opt}${correct ? ' <span class="badge">✓</span>' : ''}</li>`;
    }).join('');
    const diff = `<span class="diff-label diff-${q.d}">${q.d}</span>`;
    return `
  <div class="q-card">
    <div class="q-num">Question ${i + 1} ${diff}</div>
    <div class="q-text">${q.q}</div>
    <ul class="opts">${opts}</ul>
    ${q.e ? `<div class="q-exp">${q.e}</div>` : ''}
  </div>`;
  }).join('');

  const tagHtml = cfg.tags.map(t => `<span class="tag">${t}</span>`).join('');
  const relatedHtml = cfg.related.map(r => `<a href="${r.href}">${r.label}</a>`).join(' · ');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${cfg.title} — Lamp Bible Trivia</title>
  <meta name="description" content="${cfg.desc}">
  <meta name="keywords" content="${cfg.keywords}">
  <link rel="canonical" href="https://thelampgame.com/trivia/${cfg.slug}.html">
  <meta property="og:title" content="${cfg.title} — Lamp Bible Trivia">
  <meta property="og:description" content="${cfg.desc}">
  <meta property="og:url" content="https://thelampgame.com/trivia/${cfg.slug}.html">
  <meta property="og:type" content="website">
  <meta name="twitter:card" content="summary">
  <script type="application/ld+json">
  {"@context":"https://schema.org","@type":"Quiz","name":"${cfg.title}","description":"${cfg.desc}","url":"https://thelampgame.com/trivia/${cfg.slug}.html","about":{"@type":"Thing","name":"${cfg.schemaAbout}"}}
  </script>
  <style>${CSS}</style>
</head>
<body>
<header class="header">
  <a href="/" class="logo">Lamp</a>
  <button class="play-btn" onclick="window.location='/'">Play Free</button>
</header>
<nav class="breadcrumb">
  <a href="/">Home</a> › <a href="/trivia/">Bible Trivia</a> › ${cfg.eyebrow}
</nav>
<section class="hero">
  <div class="eyebrow">${cfg.eyebrow}</div>
  <h1>${cfg.emoji} ${cfg.title}</h1>
  <p class="hero-sub">${cfg.desc}</p>
  <div class="count-badge">📖 ${cfg.questions.length} questions · Free</div>
  <div class="tags">${tagHtml}</div>
  <div class="cta-bar">
    <p>Play all questions interactively with scoring, streaks & daily challenges — free, no download.</p>
    <button class="play-btn" onclick="window.location='/'"> ${cfg.cta} →</button>
  </div>
</section>
<main class="questions">
  <div class="section-title">All ${cfg.questions.length} Questions</div>
  ${qCards}
  <div style="text-align:center;margin-top:32px;">
    <p style="color:#A8A8A4;margin-bottom:16px;font-size:15px;">Want to play interactively with scoring and streaks?</p>
    <button class="play-btn" style="font-size:16px;padding:13px 36px;border-radius:10px;" onclick="window.location='/'">Play Free at Lamp →</button>
  </div>
</main>
<section class="bottom-cta">
  <h2>More Bible Trivia</h2>
  <p>9,231 questions · Daily challenges · Multiplayer · Free forever</p>
  <button class="play-btn" style="font-size:16px;padding:13px 36px;border-radius:10px;margin-bottom:20px;" onclick="window.location='/'">Play Lamp Bible Trivia →</button>
  <div style="font-size:13px;color:#737373;">Also try: ${relatedHtml}</div>
</section>
<footer class="footer">
  <p><a href="/">Lamp Bible Trivia</a> · <a href="/privacy.html">Privacy</a> · © 2026 Lamp</p>
  <p style="margin-top:6px;">Psalm 119:105 — Your word is a lamp to my feet and a light to my path.</p>
</footer>
</body>
</html>`;
}

const outDir = path.join(__dirname, 'trivia');
for (const cfg of configs) {
  const html = buildPage(cfg);
  const filePath = path.join(outDir, `${cfg.slug}.html`);
  fs.writeFileSync(filePath, html);
  console.log(`✓ trivia/${cfg.slug}.html (${cfg.questions.length} questions)`);
}
console.log('Done.');
