/* v449: マイセット共有の設定
   workerUrl … Cloudflare Worker のURL（例："https://yw3-share.あなたのサブドメイン.workers.dev"）。
               空（''）のままだと、共有URLは画像なしのURL（このサイトのURL＋#set=…）になります。
               Worker を設置したら、ここにそのURLを入れて GitHub に上げ直してください。
   siteUrl   … この大辞典の公開URL（共有URLを開いたときの行き先） */
window.YW3_SHARE_CONFIG = {
  workerUrl: 'https://yw3-share.passessed83e.workers.dev',
  siteUrl: 'https://passessed83e.github.io/yw3-battle-encyclopedia/'
};
