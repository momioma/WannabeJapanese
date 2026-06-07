/* ============================================================
  script.js

  修正点：
  ・selectAnswer内のsetTimeoutが1200msと12000msの二重定義 → 1200msのみに修正
  ・quiz.htmlから呼ばれないstartQuiz()を削除
  ・document.addEventListenerをトップレベルに移動
    （ページ読み込み直後に登録 → 最初のクリックでBGM再生）
============================================================ */

const soundCorrect = new Audio('sounds/Inspiration06-1(Low).mp3');
const soundWrong   = new Audio('sounds/Single_Accent19-1(Delay-Fast).mp3');
const bgm          = new Audio('sounds/Loop02-long.mp3');
bgm.loop   = true;
bgm.volume = 0.2;

/* ページ読み込み後、最初のクリックでBGM開始（ブラウザ制約対応） */
document.addEventListener('click', function() {
  bgm.play();
}, { once: true });


/* ─── 問題データ ─── */
const questions = [
  {
    scene:    "コンビニのレシート、受け取る？",
    question: "Do you take your convenience store receipt?",
    img: "img/1-1.PNG",
    choices: [
      { text: "受け取る Receive",    score: 1, img: "img/1-2.PNG", isCorrect: true  },
      { text: "受け取らない Do not agree", score: 0, img: "img/1-2.PNG", isCorrect: false },
    ],
    explanation: "日本人には「来るもの拒まず」のマインドが刻まれています。たとえいらなくても受け取るのが日本人というものでしょう。受け取った直後にレシート入れに入れるのがベスト・ジャパニーズ仕草です。",
    explanation_en: "The Japanese have a deep-rooted mindset of \"never turning away a gift.\" It's just the Japanese way to accept something even if they don't need it. If they truly don't want it, the quintessential Japanese gesture is to toss it into the receipt holder immediately after receiving it.",
  },
  {
    scene:    "知り合いとすれ違った時の挨拶はどうする？",
    question: "How should you greet someone you run into?",
    img: "img/2-1.PNG",
    choices: [
      { text: "おじぎ Bow",       score: 0, img: "img/2-2.PNG", isCorrect: false },
      { text: "ハグ Hug",         score: 0, img: "img/2-2.PNG", isCorrect: false },
      { text: "ハイタッチ High five",   score: 0, img: "img/2-2.PNG", isCorrect: false },
      { text: "首だけおじぎ A nod of the head", score: 1, img: "img/2-2.PNG", isCorrect: true  },
    ],
    explanation: "忍者の末裔である日本人はすべての動きを最小限にするようにします。仲が良ければ良いほど、動きは小さくなっていくでしょう。目上の人には、腰からお辞儀をすると好印象ジャパニーズです。",
    explanation_en: "As descendants of ninjas, Japanese people strive to keep their movements to a minimum. The closer the relationship, the smaller the movements tend to be. When bowing to someone older or in a position of authority, bowing from the waist is considered a good way to make a positive impression.",
  },
  {
    scene:    "正しいエスカレーターの乗り方はどれ？",
    question: "Which is the correct way to use an escalator?",
    img: "img/3-1.PNG",
    choices: [
      { text: "右 Right",         score: 0, img: "img/3-2.PNG", isCorrect: false },
      { text: "左 Left",         score: 0, img: "img/3-2.PNG", isCorrect: false },
      { text: "場合による It depends", score: 1, img: "img/3-2.PNG", isCorrect: true  },
      { text: "両方 Both",       score: 0, img: "img/3-2.PNG", isCorrect: false },
    ],
    explanation: "白か黒かは選ばない日本人はその時その場によって乗り方を変えます。基本的に東日本は左側、西日本は右側に乗ります。しかし、柔軟な日本人でも、両側立ちが推奨されているのに常に片側に乗り続けます。いつも急いでエスカレーターを渡りたい人へ道を開けておくのです。",
    explanation_en: "Rather than choosing strictly between black and white, Japanese people adapt their behavior depending on the situation at hand. Generally speaking, people stand on the left in eastern Japan and on the right in western Japan. However, even the most flexible Japanese people tend to stay on one side, despite the recommendation to stand on both sides. This is to keep the path clear for those who are in a hurry to get across the escalator.",
  },
  {
    scene:    "電車のどの席に乗るのが正解？",
    question: "Which seat on the train is the best choice?",
    img: "img/4-1.PNG",
    choices: [
      { text: "1", score: 0, img: "img/4-2.PNG", isCorrect: false },
      { text: "2", score: 0, img: "img/4-2.PNG", isCorrect: false },
      { text: "3", score: 1, img: "img/4-2.PNG", isCorrect: true  },
      { text: "4", score: 0, img: "img/4-2.PNG", isCorrect: false },
    ],
    explanation: "電車と仲良しな日本人は座っている人の隣に妖精が見えます。妖精さんの席は開けて一個空けて座るのがマナーです。2でも良いのですが、先に真ん中を取りに行かないのがジャパニーズ仕草というものです。",
    explanation_en: "Japanese people, who are very fond of trains, can see a fairy sitting next to every person who is already seated. It is considered good manners to leave one seat open between yourself and the fairy. It's fine to take the second seat, but the \"Japanese way\" is to avoid rushing to take the middle seat first.",
  },
  {
    scene:    "日本人が誰かと喜びを分かち合うときは…",
    question: "What do Japanese people do when they want to share their joy with someone?",
    img: "img/5-1.PNG",
    choices: [
      { text: "おじぎ Bow",       score: 0, img: "img/5-2.PNG", isCorrect: false },
      { text: "ダンス Dance",       score: 0, img: "img/5-2.PNG", isCorrect: false },
      { text: "LINEスタンプ LINE Stickers", score: 0, img: "img/5-2.PNG", isCorrect: false },
      { text: "詩を詠む Recite a poem",     score: 1, img: "img/5-2.PNG", isCorrect: true  },
    ],
    explanation: "雅な日本人は詩を詠む訓練をどの時代もしてきました。日本を知り尽くしたアナタなら詩の一つ詠めるはず。",
    explanation_en: "Throughout history, cultured Japanese people have always practiced composing poetry. Since you know Japan so well, you should be able to compose a poem or two.",
  },
  {
    scene:    "日本人ならパスタはどれを使って食べる？",
    question: "What kind of cutlery do Japanese people use when eating?",
    img: "img/6-1.PNG",
    choices: [
      { text: "スプーン Spoon", score: 0, img: "img/6-2.PNG", isCorrect: false },
      { text: "フォーク Fork", score: 0, img: "img/6-2.PNG", isCorrect: false },
      { text: "箸 chopsticks",       score: 1, img: "img/6-2.PNG", isCorrect: true  },
      { text: "手 Hand",       score: 0, img: "img/6-2.PNG", isCorrect: false },
    ],
    explanation: "真の日本人ならどんな料理でも箸を使い食事をするべきです！麺を啜るかの如くパスタもズルズル食べるのです！皆さんに日本で培ったジャパニーズ食事スタイルを見せてやりましょう！",
    explanation_en: "If you're a true Japanese person, you should eat any kind of food with chopsticks! Slurp up your pasta just like you would noodles! Let's all show them the Japanese dining style we've perfected here in Japan!",
  },
];


/* ─── 結果データ ─── */
const results = [
  { min: 6, label: "日本かぶれ Wannabe Japanese",   desc: "You're perfect! You've gone beyond just being Japanese—you've become a total Japanophile! Be sure to use a fork when eating pasta." },
  { min: 4, label: "日本人 Just Japanese",       desc: "It's just barely passing. I haven't managed to break free from the cage yet. You're just another Japanese person." },
  { min: 2, label: "観光客 Tourists",       desc: "Did you learn about Japanese manners? Be sure to share what you've learned here with your family and friends." },
  { min: 0, label: "GAIKOKUJIN", desc: "Have you ever been to Japan? Let's go to Japan right now! The samurai are waiting for you!" },
];


/* ─── Vueアプリ ─── */
const vueApp = Vue.createApp({

  data() {
    return {
      currentQ:      0,
      answered:      false,
      selectedIndex: null,
      totalScore:    0,
      choiceIllust:  '',
      answeredTimer: null,  
    };
  },

  computed: {
    currentQuestion() {
      return questions[this.currentQ];
    },
    illustSrc() {
      if (this.answered && this.choiceIllust) return this.choiceIllust;
      return this.currentQuestion.img;
    },
  },

  methods: {

    choiceBtnClass(i) {
      if (this.selectedIndex === null) return 'choice-btn';
      const choice = this.currentQuestion.choices[i];
      if (choice.isCorrect)                              return 'choice-btn correct';
      if (i === this.selectedIndex && !choice.isCorrect) return 'choice-btn wrong';
      return 'choice-btn';
    },

    selectAnswer(i) {
      if (this.selectedIndex !== null) return;

      const choice = this.currentQuestion.choices[i];
      this.totalScore   += choice.score;
      this.selectedIndex = i;
      this.choiceIllust  = choice.img || '';

      showCutin(
        choice.isCorrect ? 'img/correct.png' : 'img/false.png',
        choice.isCorrect
      );

      if (choice.isCorrect) {
        soundCorrect.play();
      } else {
        soundWrong.play();
      }

      /* 1200ms後に解説に切り替え（ボタンの色とカットインを見せるため） */
      this.answeredTimer =setTimeout(() => {
        this.answered = true;
      }, 1200);
    },

    nextQuestion() {
      clearTimeout(this.answeredTimer);  // ← 追加
      this.answeredTimer = null;    
      const next = this.currentQ + 1;
      if (next >= questions.length) {
        showResult(this.totalScore);
        return;
      }
      this.currentQ      = next;
      this.answered      = false;
      this.selectedIndex = null;
      this.choiceIllust  = '';
    },

  },

}).mount('#vue-quiz');


/* ─── 画面切り替え ─── */
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(function(s) {
    s.classList.remove('active');
  });
  document.getElementById(id).classList.add('active');
}

/* ─── 結果画面を表示 ─── */
function showResult(score) {


  showScreen('screen-result');
  document.getElementById('result-score-num').textContent = score;

  const result = results.find(function(r) { return score >= r.min; });
  document.getElementById('result-title').textContent = result.label;
  document.getElementById('result-desc').textContent  = result.desc;

  const resultImages = [
    'img/1-2.PNG',
    'img/2-2.PNG',
    'img/3-2.PNG',
    'img/4-2.PNG',
    'img/5-2.PNG',
    'img/6-2.PNG',
  ];
  const picked = resultImages[Math.floor(Math.random() * resultImages.length)];
  document.getElementById('result-bg-img').src = picked;
}

/* ─── もう一度 ─── */
function restartQuiz() {
  window.location.href = 'quiz.html';
}

/* ─── カットイン演出 ─── */
function showCutin(imgSrc, isCorrect) {
  const el  = document.getElementById('cutin');
  const img = document.getElementById('cutin-img');

  img.src = imgSrc;

  el.classList.remove('show', 'correct-cutin', 'wrong-cutin');
  void el.offsetWidth;

  /* showと正解/不正解クラスを1行で同時追加（タイミングのズレを防ぐ） */
  el.classList.add('show', isCorrect ? 'correct-cutin' : 'wrong-cutin');
}
