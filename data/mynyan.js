/* v398→v399: マイニャン（＝No.573 マッサラニャン）のニャン輩特訓と技の付け替え
   - No.573 マッサラニャンをマイニャンとして扱い、アゲランクの代わりに「ニャン輩の特訓（合計5回まで）」でステータスを計算する
   - 詳しい設定（特訓・妖術・必殺技）はダメージ計算機の詳細設定と同じ形式のウィンドウで表示する
   - 妖術は上位妖術（各属性）と極楽の術・死神の術から選択。妖術の属性に合わせて得意・苦手属性も切り替える
   - v401: ネコ2世（Nyanses II）を追加、セーラーニャンを選択肢の先頭に。Tジバニャンは保留
   - v400: ニャン輩の特訓を56体に拡充（2資料以上で一致した値のみ）、スキル候補に火のようじんを追加
   - v399: スキルも選択式（マッサラニャン自身のスキル＋ニャン輩が教えるスキル）。初期設定は猛虎のねばり
   - ニャン輩は trainers に、必殺技の候補は ultimateDonors に追加していけば選択肢が増える */
(function(){
  var MASTER = {
    version: "v413",
    targetOfficialNo: 573,
    base: { hp: 270, strength: 97, spirit: 97, defense: 97, speed: 97 },
    baseConditions: "Lv.60・特訓前の値（ユーザー実機データから逆算・ユーザー確認済み。data.jsのNo.573 マッサラニャンのLv.60ステータスと一致）。HPは特訓で変化しない（ユーザー確認）",
    maxTrainings: 5,
    maxTrainingsSource: "ユーザー確認（ニャン系・アプデ系あわせて合計5回）",
    pointValue: 5,
    pointValueNote: "ゲーム内表示1ポイント＝ステータス5（レベルによらない固定値として扱う。Lv.60の実機データで確認、Mt. Wildwood Wikiの特訓値とも一致）",
    /* ニャン輩の特訓（1回あたりのゲーム内表示ポイント）。Mt. Wildwood Wiki（ゲームデータ）の値を5で割ったもの。2つ以上の資料で一致したものを登録（ネコ2世のみMt. Wildwood単独＋名称ユーザー確認）。先頭はセーラーニャン */
    trainers: [
     {
      "id": "sailornyan",
      "name": "セーラーニャン",
      "points": {
       "strength": -3,
       "spirit": 3,
       "defense": 0,
       "speed": 1
      },
      "sources": [
       "ユーザー確認（特訓1回：ちから-3・ようりょく+3・まもり変化なし・すばやさ+1ポイント）",
       "https://mtwildwood.net/ja/yw3/my-nyan",
       "https://www.g-takumi.com/youkai3/nyanpai.php"
      ]
     },
     {
      "id": "jibanyan",
      "name": "ジバニャン",
      "points": {
       "strength": 1,
       "spirit": -1,
       "defense": -1,
       "speed": 2
      },
      "sources": [
       "https://mtwildwood.net/ja/yw3/my-nyan",
       "https://www.g-takumi.com/youkai3/nyanpai.php"
      ]
     },
     {
      "id": "jibanyan-s",
      "name": "ジバニャンS",
      "points": {
       "strength": 2,
       "spirit": -1,
       "defense": -3,
       "speed": 3
      },
      "sources": [
       "https://mtwildwood.net/ja/yw3/my-nyan",
       "https://enjoi.sakura.ne.jp/youkai-watch3/youkai_nyan2.html"
      ]
     },
     {
      "id": "thornyan",
      "name": "トゲニャン",
      "points": {
       "strength": 1,
       "spirit": -2,
       "defense": 0,
       "speed": 2
      },
      "sources": [
       "https://mtwildwood.net/ja/yw3/my-nyan",
       "https://www.g-takumi.com/youkai3/nyanpai.php"
      ]
     },
     {
      "id": "baddinyan",
      "name": "ワルニャン",
      "points": {
       "strength": 2,
       "spirit": -2,
       "defense": 1,
       "speed": 0
      },
      "sources": [
       "https://mtwildwood.net/ja/yw3/my-nyan",
       "https://www.g-takumi.com/youkai3/nyanpai.php"
      ]
     },
     {
      "id": "robonyan",
      "name": "ロボニャン",
      "points": {
       "strength": 0,
       "spirit": -1,
       "defense": 3,
       "speed": -1
      },
      "sources": [
       "https://mtwildwood.net/ja/yw3/my-nyan",
       "https://www.g-takumi.com/youkai3/nyanpai.php"
      ]
     },
     {
      "id": "goldenyan",
      "name": "ゴルニャン",
      "points": {
       "strength": -2,
       "spirit": 0,
       "defense": 3,
       "speed": 0
      },
      "sources": [
       "https://mtwildwood.net/ja/yw3/my-nyan",
       "https://www.g-takumi.com/youkai3/nyanpai.php"
      ]
     },
     {
      "id": "dianyan",
      "name": "ダイヤニャン",
      "points": {
       "strength": 0,
       "spirit": 0,
       "defense": 0,
       "speed": 1
      },
      "sources": [
       "https://mtwildwood.net/ja/yw3/my-nyan",
       "https://www.g-takumi.com/youkai3/nyanpai.php"
      ]
     },
     {
      "id": "sapphinyan",
      "name": "サファイニャン",
      "points": {
       "strength": 0,
       "spirit": 1,
       "defense": 0,
       "speed": 0
      },
      "sources": [
       "https://mtwildwood.net/ja/yw3/my-nyan",
       "https://www.g-takumi.com/youkai3/nyanpai.php"
      ]
     },
     {
      "id": "emenyan",
      "name": "エメラルニャン",
      "points": {
       "strength": 0,
       "spirit": 2,
       "defense": -1,
       "speed": 0
      },
      "sources": [
       "https://mtwildwood.net/ja/yw3/my-nyan",
       "https://www.g-takumi.com/youkai3/nyanpai.php"
      ]
     },
     {
      "id": "rubinyan",
      "name": "ルビーニャン",
      "points": {
       "strength": 1,
       "spirit": 0,
       "defense": 0,
       "speed": 0
      },
      "sources": [
       "https://mtwildwood.net/ja/yw3/my-nyan",
       "https://www.g-takumi.com/youkai3/nyanpai.php"
      ]
     },
     {
      "id": "topanyan",
      "name": "トパニャン",
      "points": {
       "strength": 0,
       "spirit": 0,
       "defense": 0,
       "speed": 1
      },
      "sources": [
       "https://mtwildwood.net/ja/yw3/my-nyan",
       "https://www.g-takumi.com/youkai3/nyanpai.php"
      ]
     },
     {
      "id": "shogunyan",
      "name": "ブシニャン",
      "points": {
       "strength": 0,
       "spirit": 0,
       "defense": -2,
       "speed": 3
      },
      "sources": [
       "https://mtwildwood.net/ja/yw3/my-nyan",
       "https://www.g-takumi.com/youkai3/nyanpai.php"
      ]
     },
     {
      "id": "hovernyan",
      "name": "フユニャン",
      "points": {
       "strength": 2,
       "spirit": -2,
       "defense": -1,
       "speed": 2
      },
      "sources": [
       "https://mtwildwood.net/ja/yw3/my-nyan",
       "https://www.g-takumi.com/youkai3/nyanpai.php"
      ]
     },
     {
      "id": "master-nyada",
      "name": "マスターニャーダ",
      "points": {
       "strength": -1,
       "spirit": 3,
       "defense": -1,
       "speed": 0
      },
      "sources": [
       "https://mtwildwood.net/ja/yw3/my-nyan",
       "https://www.g-takumi.com/youkai3/nyanpai.php"
      ]
     },
     {
      "id": "dracunyan",
      "name": "ガブニャン",
      "points": {
       "strength": -2,
       "spirit": 2,
       "defense": 0,
       "speed": 1
      },
      "sources": [
       "https://mtwildwood.net/ja/yw3/my-nyan",
       "https://www.g-takumi.com/youkai3/nyanpai.php"
      ]
     },
     {
      "id": "darknyan",
      "name": "ダークニャン",
      "points": {
       "strength": 2,
       "spirit": -1,
       "defense": -2,
       "speed": 2
      },
      "sources": [
       "https://mtwildwood.net/ja/yw3/my-nyan",
       "https://www.g-takumi.com/youkai3/nyanpai.php"
      ]
     },
     {
      "id": "buchinyan",
      "name": "ブチニャン",
      "points": {
       "strength": 2,
       "spirit": -1,
       "defense": -1,
       "speed": 1
      },
      "sources": [
       "https://mtwildwood.net/ja/yw3/my-nyan",
       "https://www.g-takumi.com/youkai3/nyanpai.php"
      ]
     },
     {
      "id": "robonyan-f",
      "name": "ロボニャンF型",
      "points": {
       "strength": 0,
       "spirit": 0,
       "defense": 3,
       "speed": -2
      },
      "sources": [
       "https://mtwildwood.net/ja/yw3/my-nyan",
       "https://www.g-takumi.com/youkai3/nyanpai.php"
      ]
     },
     {
      "id": "machonyan",
      "name": "マスクドニャーン",
      "points": {
       "strength": 3,
       "spirit": -3,
       "defense": 1,
       "speed": 0
      },
      "sources": [
       "https://mtwildwood.net/ja/yw3/my-nyan",
       "https://www.g-takumi.com/youkai3/nyanpai.php"
      ]
     },
     {
      "id": "jetnyan",
      "name": "ジェットニャン",
      "points": {
       "strength": -2,
       "spirit": 0,
       "defense": 0,
       "speed": 3
      },
      "sources": [
       "https://mtwildwood.net/ja/yw3/my-nyan",
       "https://www.g-takumi.com/youkai3/nyanpai.php"
      ]
     },
     {
      "id": "wondernyan",
      "name": "ワンダーニャン",
      "points": {
       "strength": 2,
       "spirit": -3,
       "defense": 1,
       "speed": 1
      },
      "sources": [
       "https://mtwildwood.net/ja/yw3/my-nyan",
       "https://www.g-takumi.com/youkai3/nyanpai.php"
      ]
     },
     {
      "id": "melonyan",
      "name": "メロンニャン",
      "points": {
       "strength": 1,
       "spirit": 0,
       "defense": 1,
       "speed": -1
      },
      "sources": [
       "https://mtwildwood.net/ja/yw3/my-nyan",
       "https://www.g-takumi.com/youkai3/nyanpai.php"
      ]
     },
     {
      "id": "oranyan",
      "name": "ミカンニャン",
      "points": {
       "strength": 1,
       "spirit": 1,
       "defense": -1,
       "speed": 0
      },
      "sources": [
       "https://mtwildwood.net/ja/yw3/my-nyan",
       "https://www.g-takumi.com/youkai3/nyanpai.php"
      ]
     },
     {
      "id": "kiwinyan",
      "name": "キウイニャン",
      "points": {
       "strength": 1,
       "spirit": -1,
       "defense": 0,
       "speed": 1
      },
      "sources": [
       "https://mtwildwood.net/ja/yw3/my-nyan",
       "https://enjoi.sakura.ne.jp/youkai-watch3/youkai_nyan2.html"
      ]
     },
     {
      "id": "grapenyan",
      "name": "ブドウニャン",
      "points": {
       "strength": -1,
       "spirit": 1,
       "defense": 0,
       "speed": 1
      },
      "sources": [
       "https://mtwildwood.net/ja/yw3/my-nyan",
       "https://www.g-takumi.com/youkai3/nyanpai.php"
      ]
     },
     {
      "id": "strawbnyan",
      "name": "イチゴニャン",
      "points": {
       "strength": 1,
       "spirit": -1,
       "defense": 1,
       "speed": 0
      },
      "sources": [
       "https://mtwildwood.net/ja/yw3/my-nyan",
       "https://www.g-takumi.com/youkai3/nyanpai.php"
      ]
     },
     {
      "id": "watermelnyan",
      "name": "スイカニャン",
      "points": {
       "strength": 0,
       "spirit": -1,
       "defense": 1,
       "speed": 1
      },
      "sources": [
       "https://mtwildwood.net/ja/yw3/my-nyan",
       "https://www.g-takumi.com/youkai3/nyanpai.php"
      ]
     },
     {
      "id": "momonyan",
      "name": "モモタロニャン",
      "points": {
       "strength": 1,
       "spirit": -2,
       "defense": 3,
       "speed": -1
      },
      "sources": [
       "https://mtwildwood.net/ja/yw3/my-nyan",
       "https://www.g-takumi.com/youkai3/nyanpai.php"
      ]
     },
     {
      "id": "puppynyan",
      "name": "イヌニャン",
      "points": {
       "strength": 2,
       "spirit": -3,
       "defense": 0,
       "speed": 2
      },
      "sources": [
       "https://mtwildwood.net/ja/yw3/my-nyan",
       "https://www.g-takumi.com/youkai3/nyanpai.php"
      ]
     },
     {
      "id": "chimpanyan",
      "name": "サルニャン",
      "points": {
       "strength": 0,
       "spirit": -1,
       "defense": -1,
       "speed": 3
      },
      "sources": [
       "https://mtwildwood.net/ja/yw3/my-nyan",
       "https://www.g-takumi.com/youkai3/nyanpai.php"
      ]
     },
     {
      "id": "pheasanyan",
      "name": "キジニャン",
      "points": {
       "strength": -1,
       "spirit": 2,
       "defense": 0,
       "speed": 0
      },
      "sources": [
       "https://mtwildwood.net/ja/yw3/my-nyan",
       "https://www.g-takumi.com/youkai3/nyanpai.php"
      ]
     },
     {
      "id": "jibanyan-b",
      "name": "Bジバニャン",
      "points": {
       "strength": 1,
       "spirit": 0,
       "defense": -2,
       "speed": 2
      },
      "sources": [
       "https://mtwildwood.net/ja/yw3/my-nyan",
       "https://www.g-takumi.com/youkai3/nyanpai.php"
      ]
     },
     {
      "id": "sir-nyansalot",
      "name": "ニャン騎士",
      "points": {
       "strength": 1,
       "spirit": 0,
       "defense": 3,
       "speed": -3
      },
      "sources": [
       "https://mtwildwood.net/ja/yw3/my-nyan",
       "https://www.g-takumi.com/youkai3/nyanpai.php"
      ]
     },
     {
      "id": "maginyan",
      "name": "ニャン魔女",
      "points": {
       "strength": -2,
       "spirit": 3,
       "defense": -1,
       "speed": 1
      },
      "sources": [
       "https://mtwildwood.net/ja/yw3/my-nyan",
       "https://www.g-takumi.com/youkai3/nyanpai.php"
      ]
     },
     {
      "id": "rudy",
      "name": "アカマル",
      "points": {
       "strength": 0,
       "spirit": 0,
       "defense": -2,
       "speed": 3
      },
      "sources": [
       "https://mtwildwood.net/ja/yw3/my-nyan",
       "https://www.g-takumi.com/youkai3/nyanpai.php"
      ]
     },
     {
      "id": "odysseynyan",
      "name": "ウラシマニャン",
      "points": {
       "strength": -2,
       "spirit": 3,
       "defense": 0,
       "speed": 0
      },
      "sources": [
       "https://mtwildwood.net/ja/yw3/my-nyan",
       "https://www.g-takumi.com/youkai3/nyanpai.php"
      ]
     },
     {
      "id": "kintaronyan",
      "name": "キンタロニャン",
      "points": {
       "strength": 3,
       "spirit": -2,
       "defense": 0,
       "speed": 0
      },
      "sources": [
       "https://mtwildwood.net/ja/yw3/my-nyan",
       "https://www.g-takumi.com/youkai3/nyanpai.php"
      ]
     },
     {
      "id": "sushinyan",
      "name": "スシジバ",
      "points": {
       "strength": 1,
       "spirit": -2,
       "defense": -1,
       "speed": 3
      },
      "sources": [
       "https://mtwildwood.net/ja/yw3/my-nyan",
       "https://www.g-takumi.com/youkai3/nyanpai.php"
      ]
     },
     {
      "id": "chocobonyan",
      "name": "チョコボニャン",
      "points": {
       "strength": 2,
       "spirit": -2,
       "defense": -2,
       "speed": 3
      },
      "sources": [
       "https://mtwildwood.net/ja/yw3/my-nyan",
       "https://www.g-takumi.com/youkai3/nyanpai.php"
      ]
     },
     {
      "id": "mooglenyan",
      "name": "モーグリニャン",
      "points": {
       "strength": -2,
       "spirit": 3,
       "defense": -2,
       "speed": 2
      },
      "sources": [
       "https://mtwildwood.net/ja/yw3/my-nyan",
       "https://www.g-takumi.com/youkai3/nyanpai.php"
      ]
     },
     {
      "id": "jiban-liu-bei",
      "name": "ジバニャン劉備",
      "points": {
       "strength": 2,
       "spirit": -1,
       "defense": -3,
       "speed": 3
      },
      "sources": [
       "https://mtwildwood.net/ja/yw3/my-nyan",
       "https://www.g-takumi.com/youkai3/nyanpai.php"
      ]
     },
     {
      "id": "last-nyanmurai",
      "name": "ラストブシニャン",
      "points": {
       "strength": 3,
       "spirit": -2,
       "defense": -2,
       "speed": 2
      },
      "sources": [
       "https://mtwildwood.net/ja/yw3/my-nyan",
       "https://www.g-takumi.com/youkai3/nyanpai.php"
      ]
     },
     {
      "id": "wobblenyan",
      "name": "ぷにニャン",
      "points": {
       "strength": 0,
       "spirit": 1,
       "defense": -2,
       "speed": 2
      },
      "sources": [
       "https://mtwildwood.net/ja/yw3/my-nyan",
       "https://www.g-takumi.com/youkai3/nyanpai.php"
      ]
     },
     {
      "id": "tomnyan",
      "name": "トムニャン",
      "points": {
       "strength": 1,
       "spirit": 1,
       "defense": -2,
       "speed": 1
      },
      "sources": [
       "https://mtwildwood.net/ja/yw3/my-nyan",
       "https://www.g-takumi.com/youkai3/nyanpai.php"
      ]
     },
     {
      "id": "showbonyan",
      "name": "ロボニャンUSA",
      "points": {
       "strength": 2,
       "spirit": -2,
       "defense": 1,
       "speed": 0
      },
      "sources": [
       "https://mtwildwood.net/ja/yw3/my-nyan",
       "https://www.g-takumi.com/youkai3/nyanpai.php"
      ]
     },
     {
      "id": "king-jibanyan",
      "name": "ジバニャンK",
      "points": {
       "strength": 1,
       "spirit": -2,
       "defense": 1,
       "speed": 1
      },
      "sources": [
       "https://mtwildwood.net/ja/yw3/my-nyan",
       "https://www.g-takumi.com/youkai3/nyanpai.php"
      ]
     },
     {
      "id": "acenyan",
      "name": "フユニャンエース",
      "points": {
       "strength": 3,
       "spirit": 0,
       "defense": -3,
       "speed": 1
      },
      "sources": [
       "https://mtwildwood.net/ja/yw3/my-nyan",
       "https://www.g-takumi.com/youkai3/nyanpai.php"
      ]
     },
     {
      "id": "mr-crabbycat",
      "name": "ニャンパチ先生",
      "points": {
       "strength": 0,
       "spirit": 0,
       "defense": 1,
       "speed": 0
      },
      "sources": [
       "https://mtwildwood.net/ja/yw3/my-nyan",
       "https://enjoi.sakura.ne.jp/youkai-watch3/youkai_nyan2.html"
      ]
     },
     {
      "id": "terminyanator",
      "name": "ニャーミネーター",
      "points": {
       "strength": 0,
       "spirit": -3,
       "defense": 2,
       "speed": 2
      },
      "sources": [
       "https://mtwildwood.net/ja/yw3/my-nyan",
       "https://enjoi.sakura.ne.jp/youkai-watch3/youkai_nyan2.html"
      ]
     },
     {
      "id": "hovernyan-s",
      "name": "フユニャンS",
      "points": {
       "strength": 2,
       "spirit": -3,
       "defense": 0,
       "speed": 2
      },
      "sources": [
       "https://mtwildwood.net/ja/yw3/my-nyan",
       "https://www.g-takumi.com/youkai3/nyanpai.php"
      ]
     },
     {
      "id": "hover-cao-cao",
      "name": "フユニャン曹操",
      "points": {
       "strength": 3,
       "spirit": -3,
       "defense": 0,
       "speed": 1
      },
      "sources": [
       "https://mtwildwood.net/ja/yw3/my-nyan",
       "https://www.g-takumi.com/youkai3/nyanpai.php"
      ]
     },
     {
      "id": "koalanyan",
      "name": "コアラニャン",
      "points": {
       "strength": 0,
       "spirit": 2,
       "defense": -1,
       "speed": 0
      },
      "sources": [
       "https://mtwildwood.net/ja/yw3/my-nyan",
       "https://www.g-takumi.com/youkai3/nyanpai.php"
      ]
     },
     {
      "id": "supernyan",
      "name": "ヒーローニャン",
      "points": {
       "strength": 3,
       "spirit": -1,
       "defense": -1,
       "speed": 0
      },
      "sources": [
       "https://mtwildwood.net/ja/yw3/my-nyan",
       "https://www.g-takumi.com/youkai3/nyanpai.php"
      ]
     },
     {
      "id": "ult-robonyan",
      "name": "Uロボニャン",
      "points": {
       "strength": 2,
       "spirit": -2,
       "defense": 2,
       "speed": -1
      },
      "sources": [
       "https://mtwildwood.net/ja/yw3/my-nyan",
       "https://www.g-takumi.com/youkai3/nyanpai.php"
      ]
     },
     {
      "id": "bastnetnyan",
      "name": "ニャステト",
      "points": {
       "strength": 0,
       "spirit": 3,
       "defense": -1,
       "speed": -1
      },
      "sources": [
       "https://mtwildwood.net/ja/yw3/my-nyan",
       "https://www.g-takumi.com/youkai3/nyanpai.php"
      ]
     },
     {
      "id": "nyanses-ii",
      "name": "ネコ2世",
      "officialNo": 694,
      "points": {
       "strength": -3,
       "spirit": 2,
       "defense": 0,
       "speed": 2
      },
      "sources": [
       "https://mtwildwood.net/ja/yw3/my-nyan（英語名 Nyanses II：ちから-15・ようりょく+10・まもり0・すばやさ+10）",
       "ユーザー確認（Nyanses II＝ネコ2世）"
      ],
      "note": "特訓値はMt. Wildwoodのみ（ゲームの匠・enjoiに掲載なし）。名称の対応はユーザー確認"
     }
    ],
    trainersExcluded: [{"name":"Tジバニャン","mtwildwood":[5,-15,5,10],"reason":"Mt. Wildwood（ちから+5・ようりょく-15・まもり+5・すばやさ+10）、ゲームの匠（ちから+5・ようりょく-15・まもり+5・すばやさ+5）、enjoi（+1/-2/+1/+1ポイント）の3資料が不一致のため未確認","status":"ユーザー指示により保留（2026-11-13）"}],
    trainersChecked: "2026-11-13",
    /* 妖術の候補（ユーザー指定：上位妖術と極楽の術・死神の術のみ） */
    magicNames: ["れんごくの術", "大滝の術", "雷神の術", "いん石の術", "嵐の術", "吹雪の術", "極楽の術", "死神の術"],
    /* 必殺技の候補：マッサラニャン自身の必殺技＋ニャン輩が教える必殺技（各ニャン輩の妖怪データの必殺技を複製して使う） */
    ultimateDonors: [
      { officialNo: 243, name: "ジバニャン" }, { officialNo: 47, name: "フユニャン" },
      { officialNo: 194, name: "ロボニャン" }, { officialNo: 195, name: "ロボニャンF型" },
      { officialNo: 197, name: "ゴルニャン" }, { officialNo: 249, name: "ワルニャン" },
      { officialNo: 250, name: "ブチニャン" }, { officialNo: 282, name: "イチゴニャン" },
      { officialNo: 283, name: "スイカニャン" }, { officialNo: 291, name: "セーラーニャン" },
      { officialNo: 420, name: "ガブニャン" }
    ],
    ultimateDonorsSource: "ニャン輩が教える必殺技（https://www.g-takumi.com/youkai3/nyanpai.php ・ https://enjoi.sakura.ne.jp/youkai-watch3/youkai_nyan2.html）。威力・説明・範囲は各ニャン輩の妖怪データの値を使用（マイニャンが使っても威力は本人と同じ：ユーザー確認 2026-11-13）",
    /* スキルの候補：マッサラニャン自身のスキル＋ニャン輩が教えるスキル（スキルの内容は同名スキルを持つ妖怪のデータを複製して使う） */
    skillNames: ["アクロバット", "猛虎のねばり", "きびだんご", "たてぼうぎょ", "魔女っ子パワー", "超クリティカル", "ブロッカー", "超電磁パワー", "カラフルボディー", "ゴールドガード", "まえのめり", "えんごしゃげき", "ノーガード", "超回避", "とげガード", "リーゼント", "もちはだ", "ながもち", "ナンバーワン！", "メリケンナイズ", "果汁100%", "じゅずつなぎ", "ムーンパワー", "チョコリジェネ", "モグパワー", "下克上", "すしパワー", "ホース", "釣り師", "吸血マニア", "ダークガード", "よゆうの風格", "ガードくずし", "武士道", "マント", "いっせん", "覚醒", "みかえり", "どろぼう", "古代の加護", "ぼうすい", "つまみぐい", "じゅうなん", "プレゼント", "雪かき", "かぜよけ", "いやしのしぶき", "におうだち", "閃光", "もえるとうし", "超回復", "おんねん", "魂食い", "ラッシュ", "火のようじん"],
    skillNamesSource: "ニャン輩が教えるスキル（https://www.g-takumi.com/youkai3/nyanpai.php ・ https://enjoi.sakura.ne.jp/youkai-watch3/youkai_nyan2.html）のうち、大辞典のデータに同名スキルがあるもの",
    /* 初期設定（ユーザー指定） */
    defaults: { slots: ["sailornyan", "sailornyan", "sailornyan", "", ""], magic: "大滝の術", ult: "no420", skill: "猛虎のねばり" },
    /* 得意属性＝妖術の属性、苦手属性は相性表から（ユーザー確認済みのルール）。回復・吸収の妖術は得意・苦手なし */
    weakOf: { "火": "水", "水": "雷", "雷": "土", "土": "風", "風": "氷", "氷": "火" }
  };
  window.YOKAI_MYNYAN_MASTER = MASTER;

  var D = window.YOKAI_DATA || [];
  var target = null;
  for (var i = 0; i < D.length; i++) if (D[i] && D[i].officialNo === MASTER.targetOfficialNo) { target = D[i]; break; }
  if (!target) return;
  target.myNyan = true;

  var KEY = "yw3-mynyan-training-v2", MKEY = "yw3-mynyan-moves-v2";
  var STAT_KEYS = ["strength", "spirit", "defense", "speed"];
  var STAT_LABEL = { strength: "ちから", spirit: "ようりょく", defense: "まもり", speed: "すばやさ" };
  var ATTR_CLASS = { "火": "fire", "水": "water", "風": "wind", "土": "earth", "雷": "thunder", "氷": "ice" };
  function clone(o){ return JSON.parse(JSON.stringify(o)); }
  function escHtml(s){ return String(s == null ? "" : s).replace(/[&<>"']/g, function(c){ return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }

  // 技の候補
  var originalMoves = clone(target.moves || []);
  var originalAffinity = target.attributeAffinity ? clone(target.attributeAffinity) : null;
  var magicPool = {};
  D.forEach(function(y){ (y.moves || []).forEach(function(m){ if (m && m.type === "magic" && MASTER.magicNames.indexOf(m.name) >= 0 && !magicPool[m.name]) magicPool[m.name] = m; }); });
  var magicNames = MASTER.magicNames.filter(function(n){ return !!magicPool[n]; });
  var defaultUlt = originalMoves.filter(function(m){ return m.type === "ultimate"; })[0] || null;
  var ultPool = [];
  if (defaultUlt) ultPool.push({ key: "own", label: defaultUlt.name + "（マッサラニャン）", move: defaultUlt, from: "マッサラニャン" });
  MASTER.ultimateDonors.forEach(function(dn){
    var y = null; for (var j = 0; j < D.length; j++) if (D[j].officialNo === dn.officialNo) { y = D[j]; break; }
    if (!y) return;
    (y.moves || []).forEach(function(m){ if (m.type === "ultimate" && !ultPool.some(function(u){ return u.move.name === m.name; })) ultPool.push({ key: "no" + dn.officialNo, label: m.name + "（" + y.name + "）", move: m, from: y.name }); });
  });
  function ultByKey(k){ return ultPool.filter(function(p){ return p.key === k; })[0] || null; }
  var originalSkills = clone(target.skills || []);
  var skillPool = {}, skillNames = [];
  originalSkills.forEach(function(s){ if (s && s.name && !skillPool[s.name]) { skillPool[s.name] = { skill: s, from: "マッサラニャン" }; skillNames.push(s.name); } });
  MASTER.skillNames.forEach(function(n){ if (skillPool[n]) return; for (var j = 0; j < D.length; j++) { var hit = (D[j].skills || []).filter(function(s){ return s && s.name === n; })[0]; if (hit) { skillPool[n] = { skill: hit, from: D[j].name }; skillNames.push(n); break; } } });

  // 状態（localStorage。保存がなければ初期設定）
  var slots = null, sel = null;
  try { slots = JSON.parse(localStorage.getItem(KEY) || "null"); } catch (e) { slots = null; }
  try { sel = JSON.parse(localStorage.getItem(MKEY) || "null"); } catch (e) { sel = null; }
  if (!Array.isArray(slots)) slots = MASTER.defaults.slots.slice();
  if (!sel || typeof sel !== "object") sel = { magic: MASTER.defaults.magic, ult: MASTER.defaults.ult };
  function trainerById(id){ for (var i = 0; i < MASTER.trainers.length; i++) if (MASTER.trainers[i].id === id) return MASTER.trainers[i]; return null; }
  (function(){ var out = []; for (var i = 0; i < MASTER.maxTrainings; i++) { var v = slots[i]; out.push(v && trainerById(v) ? v : ""); } slots = out; })();
  if (!magicPool[sel.magic]) sel.magic = magicPool[MASTER.defaults.magic] ? MASTER.defaults.magic : magicNames[0];
  if (!ultByKey(sel.ult)) sel.ult = ultByKey(MASTER.defaults.ult) ? MASTER.defaults.ult : "own";
  if (!skillPool[sel.skill]) sel.skill = skillPool[MASTER.defaults.skill] ? MASTER.defaults.skill : skillNames[0];
  function save(){ try { localStorage.setItem(KEY, JSON.stringify(slots)); localStorage.setItem(MKEY, JSON.stringify(sel)); } catch (e) {} }

  function affinityFor(attr){
    if (MASTER.weakOf[attr]) return { strong: attr, weak: MASTER.weakOf[attr] };
    return { strong: "なし", weak: "なし" };
  }
  function apply(){
    var out = [], magic = magicPool[sel.magic], u = ultByKey(sel.ult) || ultPool[0];
    originalMoves.forEach(function(m){
      if (m.type === "magic" && magic) { var c = clone(magic); c.myNyanMoveSource = "マイニャンの妖術付け替え（" + magic.name + "）。威力・説明は同名の妖術データを流用"; out.push(c); }
      else if (m.type === "ultimate" && u) { var cu = clone(u.move); if (u.key !== "own") cu.myNyanMoveSource = "マイニャンの必殺技付け替え（" + u.from + "の必殺技）。威力・説明・範囲は" + u.from + "のデータを流用"; out.push(cu); }
      else out.push(clone(m));
    });
    target.moves = out;
    var sp = skillPool[sel.skill];
    if (sp) { var cs = clone(sp.skill); if (sp.from !== "マッサラニャン") cs.myNyanSkillSource = "マイニャンのスキル付け替え（" + sp.skill.name + "）。効果は" + sp.from + "の同名スキルのデータを流用"; target.skills = [cs]; } else target.skills = clone(originalSkills);
    var af = affinityFor(magic && magic.attribute);
    target.attributeAffinity = {
      strong: af.strong, weak: af.weak, status: "mynyan-magic-derived",
      note: "マイニャンは付け替えた妖術（" + (magic ? magic.name : "—") + "）の属性を得意属性とし、苦手属性は相性表から決定。回復・吸収の妖術は得意・苦手なし（ユーザー確認済みのルール）",
      rule: "得意＝妖術の属性（火→苦手水、水→雷、雷→土、土→風、風→氷、氷→火）",
      original: originalAffinity
    };
  }
  apply();

  function totals(){ var t = { strength: 0, spirit: 0, defense: 0, speed: 0 }; slots.forEach(function(id){ var tr = trainerById(id); if (!tr) return; STAT_KEYS.forEach(function(k){ t[k] += (tr.points[k] || 0); }); }); return t; }
  function stats(){ var t = totals(), r = { hp: MASTER.base.hp }; STAT_KEYS.forEach(function(k){ r[k] = MASTER.base[k] + t[k] * MASTER.pointValue; }); return r; }
  function trainingText(){
    var counts = {}, used = 0;
    slots.forEach(function(id){ if (id) { counts[id] = (counts[id] || 0) + 1; used++; } });
    var names = Object.keys(counts).map(function(id){ return trainerById(id).name + "×" + counts[id]; }).join("、");
    var t = totals();
    var diff = STAT_KEYS.map(function(k){ var v = t[k] * MASTER.pointValue; return STAT_LABEL[k] + (v > 0 ? "+" : "") + v; }).join(" ");
    return { used: used, text: used ? names + "（" + diff + "）" : "特訓なし（初期値）" };
  }
  function summaryText(){
    var tt = trainingText(), u = ultByKey(sel.ult), af = target.attributeAffinity || {};
    return "特訓 " + tt.used + "/" + MASTER.maxTrainings + "回：" + tt.text + " / 妖術 " + sel.magic + " / 必殺技 " + (u ? u.move.name : "—") + " / スキル " + sel.skill + " / 得意 " + af.strong + "・苦手 " + af.weak;
  }
  // カード内：ダメージ計算機の詳細設定と同じく、ボタン＋概要だけを表示
  function controlHtml(x){
    return '<button type="button" class="mynyan-open" data-mynyan-open="1" aria-haspopup="dialog"><span class="mynyan-open-title">マイニャンの詳細設定</span><span class="mynyan-open-summary"> · ' + escHtml(summaryText()) + '</span></button>';
  }
  function pointHint(tr){ var ab = { strength: "A", spirit: "M", defense: "D", speed: "S" } /* v413: HAMDS表記（H=HP A=ちから M=ようりょく D=まもり S=すばやさ） */, parts = []; STAT_KEYS.forEach(function(k){ var v = tr.points[k] || 0; if (v) parts.push(ab[k] + (v > 0 ? "+" : "") + v); }); return parts.length ? "（" + parts.join(" ") + "）" : ""; }
  function attrHtml(v){ return ATTR_CLASS[v] ? '<span class="attr-char attr-' + ATTR_CLASS[v] + '">' + escHtml(v) + '</span>' : escHtml(v); }
  function modalBodyHtml(){
    var tt = trainingText(), af = target.attributeAffinity || {}, st = stats();
    var trainSel = slots.map(function(id, i){
      var opts = '<option value="">なし</option>' + MASTER.trainers.map(function(tr){ return '<option value="' + escHtml(tr.id) + '"' + (tr.id === id ? " selected" : "") + ">" + escHtml(tr.name + pointHint(tr)) + "</option>"; }).join("");
      return '<label class="mynyan-slot">' + (i + 1) + '回目<select data-mynyan-slot="' + i + '">' + opts + "</select></label>";
    }).join("");
    var magOpts = magicNames.map(function(n){ var m = magicPool[n]; return '<option value="' + escHtml(n) + '"' + (n === sel.magic ? " selected" : "") + ">" + escHtml(n) + "（" + escHtml(m.attribute || "—") + " " + escHtml(m.power || "—") + "）</option>"; }).join("");
    var skOpts = skillNames.map(function(n){ return '<option value="' + escHtml(n) + '"' + (n === sel.skill ? " selected" : "") + ">" + escHtml(n) + (skillPool[n].from === "マッサラニャン" ? "（マッサラニャン）" : "") + "</option>"; }).join("");
    var skEff = skillPool[sel.skill] ? (skillPool[sel.skill].skill.effect || "") : "";
    var ultOpts = ultPool.map(function(u){ return '<option value="' + escHtml(u.key) + '"' + (u.key === sel.ult ? " selected" : "") + ">" + escHtml(u.label) + "</option>"; }).join("");
    return '<section class="mynyan-sec"><h4>ニャン輩の特訓（合計' + MASTER.maxTrainings + '回まで）</h4><div class="mynyan-slots">' + trainSel + '</div><p class="mynyan-summary">' + tt.used + '/' + MASTER.maxTrainings + '回：' + escHtml(tt.text) + '</p></section>' +
      '<section class="mynyan-sec"><h4>技・スキル</h4><div class="mynyan-slots"><label class="mynyan-slot">妖術<select data-mynyan-move="magic">' + magOpts + '</select></label><label class="mynyan-slot">必殺技<select data-mynyan-move="ult">' + ultOpts + '</select></label><label class="mynyan-slot">スキル<select data-mynyan-move="skill">' + skOpts + '</select></label></div><p class="mynyan-summary">スキル効果：' + escHtml(skEff || '—') + '</p><p class="mynyan-summary">得意 ' + attrHtml(af.strong) + '　苦手 ' + attrHtml(af.weak) + '（妖術の属性で自動決定）</p></section>' +
      '<section class="mynyan-sec"><h4>ステータス（Lv.60）</h4><p class="mynyan-summary">HP ' + st.hp + ' / ちから ' + st.strength + ' / ようりょく ' + st.spirit + ' / まもり ' + st.defense + ' / すばやさ ' + st.speed + '</p></section>' +
      '<p class="agerank-note">マイニャンはアゲランクの代わりに特訓でステータスが変わります。1ポイント＝ステータス5（Lv.60の初期値 ちから・ようりょく・まもり・すばやさ各' + MASTER.base.strength + '、HP' + MASTER.base.hp + '）。HPは特訓で変わりません。特訓の順番は結果に影響しません。妖術・必殺技の威力・説明とスキルの効果は、同じ技・スキルを持つ妖怪のデータを流用しています。</p>';
  }

  // ウィンドウ（ダメージ計算機の詳細設定と同じ見た目のクラスを使用）
  var overlay = null, body = null, opener = null;
  function ensureModal(){
    if (overlay) return;
    overlay = document.createElement("div"); overlay.className = "damage-side-settings-modal mynyan-modal"; overlay.id = "mynyanSettingsModal"; overlay.hidden = true;
    overlay.setAttribute("role", "dialog"); overlay.setAttribute("aria-modal", "true"); overlay.setAttribute("aria-label", "マイニャンの詳細設定");
    var dialog = document.createElement("div"); dialog.className = "damage-side-settings-dialog";
    var head = document.createElement("div"); head.className = "damage-side-settings-head";
    var h = document.createElement("h3"); h.textContent = "マイニャン（マッサラニャン）の詳細設定";
    var close = document.createElement("button"); close.type = "button"; close.className = "damage-side-settings-close"; close.textContent = "閉じる"; close.id = "mynyanSettingsClose";
    head.appendChild(h); head.appendChild(close);
    body = document.createElement("div"); body.className = "damage-side-settings-content"; body.id = "mynyanSettingsBody";
    dialog.appendChild(head); dialog.appendChild(body); overlay.appendChild(dialog); document.body.appendChild(overlay);
    close.addEventListener("click", shut);
    overlay.addEventListener("click", function(e){ if (e.target === overlay) shut(); });
    document.addEventListener("keydown", function(e){ if (overlay && !overlay.hidden && e.key === "Escape") shut(); });
  }
  function open(btn){ ensureModal(); opener = btn || null; body.innerHTML = modalBodyHtml(); overlay.hidden = false; var c = document.getElementById("mynyanSettingsClose"); if (c) c.focus(); }
  function shut(){ if (!overlay) return; overlay.hidden = true; var b = document.querySelector('article.card[data-yokai-card="' + target.id + '"] [data-mynyan-open]'); if (b) b.focus(); }
  document.addEventListener("click", function(e){
    var b = e.target && e.target.closest ? e.target.closest("[data-mynyan-open]") : null;
    if (!b) return;
    e.preventDefault(); e.stopPropagation(); open(b);
  }, true);

  window.MYNYAN = { master: MASTER, target: target, stats: stats, controlHtml: controlHtml, totals: totals, summary: summaryText, open: open, close: shut, getSlots: function(){ return slots.slice(); }, getSelection: function(){ return { magic: sel.magic, ult: sel.ult, skill: sel.skill }; } };

  // 特訓・技の変更 → 一覧・比較・パーティ・計算機・ウィンドウに反映
  document.addEventListener("change", function(e){
    var t = e.target; if (!t || !t.closest) return;
    var s = t.closest("[data-mynyan-slot]"), mv = t.closest("[data-mynyan-move]");
    if (!s && !mv) return;
    e.stopPropagation();
    if (s) { var i = Number(s.getAttribute("data-mynyan-slot")); if (i >= 0 && i < MASTER.maxTrainings) slots[i] = trainerById(s.value) ? s.value : ""; }
    if (mv) { var kind = mv.getAttribute("data-mynyan-move"); if (kind === "magic" && magicPool[mv.value]) sel.magic = mv.value; if (kind === "ult" && ultByKey(mv.value)) sel.ult = mv.value; if (kind === "skill" && skillPool[mv.value]) sel.skill = mv.value; }
    apply(); save();
    try { if (typeof render === "function") render(); } catch (err) {}
    try { if (typeof showCompare === "function") showCompare(); } catch (err) {}
    try { if (typeof window.renderParty === "function") window.renderParty(); } catch (err) {}
    try {
      var atk = document.getElementById("dmgAttacker"), def = document.getElementById("dmgDefender");
      if (mv && atk && atk.value === target.id) atk.dispatchEvent(new Event("change", { bubbles: true }));
      else if (mv && def && def.value === target.id) def.dispatchEvent(new Event("change", { bubbles: true }));
      else { var b2 = document.getElementById("dmgBuff"); if (b2) b2.dispatchEvent(new Event("change", { bubbles: true })); }
    } catch (err) {}
    if (overlay && !overlay.hidden) { var focusSel = s ? '[data-mynyan-slot="' + s.getAttribute("data-mynyan-slot") + '"]' : '[data-mynyan-move="' + mv.getAttribute("data-mynyan-move") + '"]'; body.innerHTML = modalBodyHtml(); var f = body.querySelector(focusSel); if (f) f.focus(); }
  }, true);
})();
