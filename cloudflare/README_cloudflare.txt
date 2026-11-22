マイセット共有（Xに貼ると画像が出るURL）の設置手順　v449
================================================================

このフォルダの worker.js を Cloudflare Workers に置くと、大辞典の「共有（URL・画像）」で
画像つきの短いURL（https://〜.workers.dev/s/〜）が作れるようになります。
設置しなくても、共有URL（画像なし）と「画像を保存」は使えます。

※ Cloudflare の画面の文言や配置は変わることがあります。見つからないときは近い名前のメニューを探してください。

■ 1. アカウントを作る
  https://dash.cloudflare.com/sign-up でメールアドレスとパスワードを入力し、届いたメールで確認します。
  無料プラン（Free）のままで使えます。

■ 2. 保存場所（KV）を作る
  左のメニュー「Storage & Databases」→「Workers KV」（または「KV」）→「Create」
  名前：yw3-shares（何でもよい）→ 作成

■ 3. Worker を作る
  左のメニュー「Compute (Workers)」→「Workers & Pages」→「Create」
  →「Start with Hello World!」（Hello World のテンプレート）
  Worker の名前：yw3-share（何でもよい）→「Deploy」

■ 4. プログラムを貼り付ける
  作った Worker の画面で「Edit code」（コードを編集）を押す
  → 左の worker.js（または index.js）の中身を全部消して、このフォルダの worker.js の中身を全部貼り付ける
  →「Deploy」

■ 5. KV をつなぐ
  Worker の画面 →「Settings」（設定）→「Bindings」→「Add binding」→「KV namespace」
  Variable name（変数名）：SHARES　← 必ずこの名前（大文字）
  KV namespace：2. で作った yw3-shares
  →「Deploy」または「Save」

■ 6. 動いているか確認
  Worker の画面に出ている URL（https://yw3-share.〇〇〇.workers.dev）をブラウザで開く
  → 大辞典のページに移動すればOK

■ 7. 大辞典に Worker の URL を設定する
  data/share_config.js をメモ帳などで開き、
    workerUrl: '',
  を
    workerUrl: 'https://yw3-share.〇〇〇.workers.dev',
  に書き換えて保存（最後の / は付けない）。
  いつもどおり GitHub に上げ直す（GitHub Pages に反映されるまで数分かかることがあります）。

■ 8. 試す
  GitHub Pages の大辞典を開く → パーティ編成 →「共有（URL・画像）」→「共有URLを作ってコピー」
  → URL が https://yw3-share.〇〇〇.workers.dev/s/〜 になっていれば成功
  → X の投稿欄に貼ると、少しして画像つきのカードが出ます

■ 大辞典のURLを変えたとき
  Worker の「Settings」→「Variables and Secrets」（環境変数）に
    名前：SITE_URL　値：新しい大辞典のURL（例 https://〜.github.io/〜/）
  を追加します（入れないときは https://passessed83e.github.io/yw3-battle-encyclopedia/ を使います）。
  data/share_config.js の siteUrl も同じURLにします。

■ 無料プランの目安
  ・保存（共有URLを作る）：1日1000回まで（KVの書き込み 1回の共有で2回使う → 1日約500件）
  ・表示（URLを開く・画像を読む）：1日10万回まで
  ・保存容量：1GB まで（画像1枚 約200〜400KB → 約3000件）
  ・上限を超えると、その日は共有URLを作れなくなります（大辞典そのものは普通に使えます。画像なしのURLに切り替わります）

■ 安全のための作り
  ・大辞典のサイト（siteUrl のドメイン）からの送信だけ受け付けます
  ・受け付ける画像は PNG・1200×630・1MB まで
  ・共有URLの英数字はランダムで、作った後に上書きはできません
  ・不要になった共有は、Cloudflare の KV の画面で「img:ID」「set:ID」の2つを削除すると消せます
