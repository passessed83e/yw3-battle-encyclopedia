/* 妖怪ウォッチ3 対戦大辞典：マイセット共有用 Cloudflare Worker（v449）
   必要な設定（Cloudflare のダッシュボード → この Worker → 設定 → バインディング／変数）
     - KV ネームスペースのバインディング：変数名 SHARES
     - 環境変数（任意）：SITE_URL（大辞典の公開URL。省略時は下の DEFAULT_SITE）
   できること
     POST /api/share  … 大辞典から画像（PNG 1200×630）と共有データを受け取って保存し、短いURLを返す
     GET  /s/<id>     … Xなどが読む共有ページ（画像・タイトルのOGP）。人が開くと大辞典に移動してマイセットを読み込む
     GET  /i/<id>.png … 共有画像
   安全のため：大辞典のサイトからの送信だけ受け付ける／PNGで1200×630・1MBまで／同じIDには上書きしない */
const DEFAULT_SITE = 'https://passessed83e.github.io/yw3-battle-encyclopedia/';
const MAX_PNG = 1024 * 1024;
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const dec = s => { try { return decodeURIComponent(s || ''); } catch (e) { return ''; } };
const newId = () => { const a = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789', b = crypto.getRandomValues(new Uint8Array(10)); return [...b].map(x => a[x % a.length]).join(''); };

export default {
  async fetch(req, env) {
    const url = new URL(req.url);
    const site = (env.SITE_URL || DEFAULT_SITE).replace(/#.*$/, '');
    const siteOrigin = new URL(site).origin;
    const origin = req.headers.get('Origin') || '';
    const cors = { 'Access-Control-Allow-Origin': siteOrigin, 'Access-Control-Allow-Methods': 'POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type, X-Set-Code, X-Set-Name, X-Set-Desc', 'Access-Control-Max-Age': '86400', 'Vary': 'Origin' };
    const json = (o, status = 200) => new Response(JSON.stringify(o), { status, headers: { 'Content-Type': 'application/json; charset=utf-8', ...cors } });

    if (url.pathname === '/api/share') {
      if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors });
      if (req.method !== 'POST') return json({ error: 'POSTだけ受け付けます' }, 405);
      if (origin !== siteOrigin) return json({ error: '大辞典のサイトからだけ共有できます' }, 403);
      if (!env.SHARES) return json({ error: 'KV（SHARES）が設定されていません' }, 500);
      const code = req.headers.get('X-Set-Code') || '';
      if (!/^[AJ][A-Za-z0-9_-]{4,7000}$/.test(code)) return json({ error: '共有データの形式が違います' }, 400);
      const len = Number(req.headers.get('Content-Length') || 0);
      if (len > MAX_PNG) return json({ error: '画像が大きすぎます' }, 413);
      const buf = new Uint8Array(await req.arrayBuffer());
      if (buf.length > MAX_PNG) return json({ error: '画像が大きすぎます' }, 413);
      const sig = [137, 80, 78, 71, 13, 10, 26, 10];
      if (buf.length < 33 || sig.some((v, i) => buf[i] !== v)) return json({ error: 'PNG画像ではありません' }, 400);
      const dv = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
      if (dv.getUint32(16) !== 1200 || dv.getUint32(20) !== 630) return json({ error: '画像の大きさが違います（1200×630）' }, 400);
      const name = dec(req.headers.get('X-Set-Name')).slice(0, 30);
      const desc = dec(req.headers.get('X-Set-Desc')).slice(0, 120);
      let id = newId();
      for (let i = 0; i < 3 && await env.SHARES.get('set:' + id); i++) id = newId();
      await env.SHARES.put('img:' + id, buf);
      await env.SHARES.put('set:' + id, JSON.stringify({ code, name, desc, at: Date.now() }));
      return json({ id, url: url.origin + '/s/' + id });
    }

    let m = /^\/i\/([A-Za-z0-9]{6,16})\.png$/.exec(url.pathname);
    if (m && req.method === 'GET') {
      const img = env.SHARES && await env.SHARES.get('img:' + m[1], 'arrayBuffer');
      if (!img) return new Response('Not found', { status: 404 });
      return new Response(img, { headers: { 'Content-Type': 'image/png', 'Cache-Control': 'public, max-age=31536000, immutable' } });
    }

    m = /^\/s\/([A-Za-z0-9]{6,16})\/?$/.exec(url.pathname);
    if (m && req.method === 'GET') {
      const raw = env.SHARES && await env.SHARES.get('set:' + m[1]);
      if (!raw) return Response.redirect(site, 302);
      let s; try { s = JSON.parse(raw); } catch (e) { return Response.redirect(site, 302); }
      const dest = site + '#set=' + s.code;
      const title = (s.name ? `「${s.name}」` : '') + 'マイセット | 妖怪ウォッチ3 対戦大辞典';
      const desc = s.desc || '妖怪ウォッチ3 対戦大辞典で作ったマイセット';
      const img = url.origin + '/i/' + m[1] + '.png';
      const html = `<!doctype html><html lang="ja"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(title)}</title><meta name="description" content="${esc(desc)}">
<meta property="og:type" content="website"><meta property="og:site_name" content="妖怪ウォッチ3 対戦大辞典">
<meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${esc(url.origin + url.pathname)}"><meta property="og:image" content="${esc(img)}">
<meta property="og:image:width" content="1200"><meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(desc)}"><meta name="twitter:image" content="${esc(img)}">
<style>body{margin:0;background:#1b1625;color:#f7f2fb;font-family:sans-serif;display:grid;place-items:center;min-height:100vh;text-align:center}a{color:#ffcf5c}</style>
</head><body><p>マイセットを開いています…<br><a href="${esc(dest)}">開かないときはここを押してください</a></p>
<script>location.replace(${JSON.stringify(dest).replace(/</g, '\\u003c')});</script></body></html>`;
      return new Response(html, { headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'public, max-age=300' } });
    }

    if (url.pathname === '/' || url.pathname === '') return Response.redirect(site, 302);
    return new Response('Not found', { status: 404 });
  }
};
