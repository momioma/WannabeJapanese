

/* ----------------------------------------------------------
  ① 問題データ（Vueの外で定義。Vueのメソッドから参照する）
  scene : 右上カードに表示するシーン名
  img   : 問題の初期イラスト。なければ "" のままでOK。
---------------------------------------------------------- */
const questions = [
  {
    scene:    "コンビニのレシート、受け取る？",
    question: "Do you take your convenience store receipt?",
    img: "img/1-1.PNG",
    choices: [
      { text: "受け取る", score: 3, img: "img/1-2.PNG",  isCorrect: true  },
      { text: "受け取らない", score: 0, img: "img/1-2.PNG", isCorrect: false },
    ],
    explanation: "日本人には「来るもの拒まず」のマインドが刻まれています。たとえいらなくても受け取るのが日本人というものでしょう。受け取った直後にレシート入れに入れるのがベスト・ジャパニーズ仕草です。",
  },
  {
    scene:    "知り合いとすれ違った時の挨拶はどうする？",
    question: "How should you greet someone you run into?",
    img: "img/2-1.PNG",
    choices: [
      { text: "おじぎ",          score: -1, img: "img/2-2.PNG", isCorrect: false },
      { text: "ハグ",   score: 1,  img: "img/2-2.PNG", isCorrect: false },
      { text: "ハイタッチ",   score: 3,  img: "img/2-2.PNG", isCorrect: false  },
      { text: "首だけおじぎ",   score: 3,  img: "img/2-2.PNG", isCorrect: true  },
    ],
    explanation: "忍者の末裔である日本人はすべての動きを最小限にするようにします。仲が良ければ良いほど、動きは小さくなっていくでしょう。目上の人には、腰からお辞儀をすると好印象ジャパニーズです。",
  },
  {
    scene:    "正しいエスカレーターの乗り方はどれ？",
    question: "Which is the correct way to use an escalator?",
    img: "img/3-1.PNG",
    choices: [
      { text: "右",   score: -1, img: "img/3-2.PNG", isCorrect: false },
      { text: "左",        score: 2,  img: "img/3-2.PNG", isCorrect: false },
      { text: "場合による",     score: 3,  img: "img/3-2.PNG", isCorrect: true  },
      { text: "両方",        score: 2,  img: "img/3-2.PNG", isCorrect: false },
    ],
    explanation: "白か黒かは選ばない日本人はその時その場によって乗り方を変えます。基本的に東日本は左側、西日本は右側に乗ります。しかし、柔軟な日本人でも、両側立ちが推奨されているのに常に片側に乗り続けます。いつも急いでエスカレーターを渡りたい人へ道を開けておくのです。",
  },
    {
    scene:    "電車のどの席に乗るのが正解？",
    question: "Which seat on the train is the best choice?",
    img: "img/4-1.PNG",
    choices: [
      { text: "①",          score: -1, img: "img/4-2.PNG", isCorrect: false },
      { text: "②",   score: 1,  img: "img/4-2.PNG", isCorrect: false },
      { text: "③",   score: 3,  img: "img/4-2.PNG", isCorrect: true },
      { text: "④",   score: 0,  img: "img/4-2.PNG", isCorrect: false  },
    ],
    explanation: "電車と仲良しな日本人は座っている人の隣に妖精が見えます。妖精さんの席は開けて一個空けて座るのがマナーです。②でも良いのですが、先に真ん中を取りに行かないのがジャパニーズ仕草というものです。",
  },  {
    scene:    "日本人が誰かと喜びを分かち合うときは…",
    question: "What do Japanese people do when they want to share their joy with someone?",
    img: "img/5-1.PNG",
    choices: [
      { text: "おじぎ",          score: -1, img: "img/5-2.PNG", isCorrect: false },
      { text: "ダンス",   score: 1,  img: "img/5-2.PNG", isCorrect: false },
      { text: "LINEスタンプ",   score: 3,  img: "img/5-2.PNG", isCorrect: false  },
      { text: "詩を詠む",   score: 3,  img: "img/5-2.PNG", isCorrect: true  },
    ],
    explanation: "雅な日本人は詩を詠む訓練をどの時代もしてきました。日本を知り尽くしたアナタなら詩の一つ詠めるはず。",
  },  {
    scene:    "日本人ならパスタはどれを使って食べる？",
    question: "What kind of cutlery do Japanese people use when eating?",
    img: "img/6-1.PNG",
    choices: [
      { text: "スプーン",          score: -1, img: "img/6-2.PNG", isCorrect: false },
      { text: "フォーク",   score: 1,  img: "img/6-2.PNG", isCorrect: false },
      { text: "箸",   score: 3,  img: "img/6-2.PNG", isCorrect: true  },
      { text: "手",   score: 3,  img: "img/6-2.PNG", isCorrect: false  },
   ],
    explanation: "真の日本人ならどんな料理でも箸を使い食事をするべきです！麺を啜るかの如くパスタもズルズル食べるのです！皆さんに日本で培ったジャパニーズ食事スタイルを見せてやりましょう！",
  },
];


/* ----------------------------------------------------------
  ② 結果データ
---------------------------------------------------------- */
const results = [
  { min: 8,   label: "日本かぶれ",  desc: "完璧です！アナタは日本人を超え、「日本かぶれ」となりました！パスタはちゃんとフォークを使って食べてくださいね。", icon: "🎌" },
  { min: 5,   label: "日本人",   desc: "及第点です。まだ檻から抜け出せてはいません。ただの日本人となります。",   icon: "🗾" },
  { min: 2,   label: "観光客", desc: "日本のマナーについて学べたでしょうか？ぜひ、ここで学んだことを家族やお友達に紹介してみてくださいね。",       icon: "📖" },
  { min: -99, label: "GAIKOKUJIN", desc: "もしかして日本に来たことがないですか？いますぐ日本へ行きましょう！サムライがアナタを待っていますよ。",   icon: "✈️" },
];


/* ----------------------------------------------------------
  ③ Vueアプリ

  data()  ：画面に表示する値をすべてここに入れる。
            値を変えると自動で画面に反映される。

  computed：data の値から計算して導き出す値。
            currentQuestion は currentQ が変わるたびに再計算される。

  methods ：ボタンクリックなどで呼ばれる関数。
---------------------------------------------------------- */
const vueApp = Vue.createApp({

  data() {
    return {
      currentQ:      0,      /* 現在の問題番号（0始まり） */
      answered:      false,  /* false=選択肢表示 / true=解説表示 */
      selectedIndex: null,   /* 押されたボタンの番号（色付けに使う） */
      expIcon:       '💡',  /* 解説のアイコン */
      totalScore:    0,      /* スコア合計 */
      choiceIllust:  '',     /* 選択後に表示するイラストのパス */
    };
  },

  computed: {
    /* 現在の問題オブジェクト（currentQ が変わると自動で変わる） */
    currentQuestion() {
      return questions[this.currentQ];
    },

    /* 表示するイラストのパス
       選択後は choiceIllust、選択前は問題の img を使う */
    illustSrc() {
      if (this.answered && this.choiceIllust) return this.choiceIllust;
      return this.currentQuestion.img;
    },
  },

  methods: {

    /* ─── 選択肢ボタンのクラスを返す ─── */
    choiceBtnClass(i) {
      /* まだ何も選んでいない → 通常スタイル */
      if (this.selectedIndex === null) return 'choice-btn';

      const choice = this.currentQuestion.choices[i];

      /* 正解ボタン → 緑 */
      if (choice.isCorrect) return 'choice-btn correct';

      /* 自分が押した不正解ボタン → 赤 */
      if (i === this.selectedIndex && !choice.isCorrect) return 'choice-btn wrong';

      /* その他のボタン → 通常（色なし） */
      return 'choice-btn';
    },

    /* ─── 選択肢が押されたとき ─── */
    selectAnswer(i) {
      /* 二重クリック防止 */
      if (this.selectedIndex !== null) return;

      const choice = this.currentQuestion.choices[i];

      /* スコア加算 */
      this.totalScore    += choice.score;
      /* 押したボタンの番号を記録（色付けが始まる） */
      this.selectedIndex  = i;
      /* 選択後のイラスト */
      this.choiceIllust   = choice.img || '';


      /* 正解ならカットイン */
      showCutin(
        choice.isCorrect ? 'img/correct.png' : 'img/false.png',
       choice.isCorrect
      );

      setTimeout(() => {
       this.answered = true;
      }, 1200);

      /* 500ms後に解説に切り替える
         （ボタンの色を少し見せてから切り替えるため） */
      setTimeout(() => {
        this.answered = true;
      }, 12000);
    },

    /* ─── 次のコマへ ─── */
    nextQuestion() {
      const next = this.currentQ + 1;

      /* 全問終了 */
      if (next >= questions.length) {
        showResult(this.totalScore);
        return;
      }

      /* ここがポイント：currentQ を変えると
         <Transition :key="currentQ"> が発動して
         コマのスライドアニメーションが自動で走る。
         他の値もリセットする。 */
      this.currentQ      = next;
      this.answered      = false;
      this.selectedIndex = null;
      this.choiceIllust  = '';
      this.expIcon       = '💡';
    },

  },

}).mount('#vue-quiz');


/* ----------------------------------------------------------
  ④ Vue管理外の関数（タイトル・結果画面の操作）
---------------------------------------------------------- */

/* 画面切り替え（active クラスの付け外し） */
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(function(s) {
    s.classList.remove('active');
  });
  document.getElementById(id).classList.add('active');
}

/* スタートボタンから呼ばれる */
function startQuiz() {
  /* Vueのデータをリセット */
  vueApp.currentQ      = 0;
  vueApp.answered      = false;
  vueApp.selectedIndex = null;
  vueApp.choiceIllust  = '';
  vueApp.expIcon       = '💡';
  vueApp.totalScore    = 0;
  showScreen('screen-quiz');
}

/* 全問終了後に呼ばれる（Vue管理外のHTML要素を更新する） */
function showResult(score) {
  showScreen('screen-result');
  document.getElementById('result-score-num').textContent = score;
  const result = results.find(function(r) { return score >= r.min; });
  document.getElementById('result-title').textContent = result.label;
  document.getElementById('result-desc').textContent  = result.desc;
  document.getElementById('result-icon').textContent  = result.icon;
}

/* もう一度ボタンから呼ばれる */
function restartQuiz() {
  window.location.href = 'quiz.html';
}

/* カットイン演出 */
/* 正解/不正解と画像パスを受け取る */
function showCutin(imgSrc, isCorrect) {
  const el  = document.getElementById('cutin');
  const img = document.getElementById('cutin-img');

  /* 画像を差し替え */
  img.src = imgSrc;

  /* 正解/不正解のクラスを付け直す */
  el.classList.remove('show', 'correct-cutin', 'wrong-cutin');
  void el.offsetWidth;   /* リフロートリック */

  el.classList.add('show');
  el.classList.add(isCorrect ? 'correct-cutin' : 'wrong-cutin');
}
