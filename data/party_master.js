/* v430: パーティ編成の性格・そうび・肉体改造のマスター
   - アイコン画像は images/items/ に元のファイル名（item_XXXX.png）のまま置いている。差し替えるときは同じ名前で上書きすればよい
   - 並び順は item.zip の番号順。「該当なし」の2つ（item_0562・item_0787）はどちらの一覧でも最後
   - partyIconDir：パーティの妖怪アイコンを差し替えるときに使う。null の間は妖怪の画像（一覧用サムネイル）を表示。
     例えば "images/party_icons/" にすると images/party_icons/001.png（図鑑番号3桁）を表示し、無ければ妖怪の画像に戻る */
(function(){
  var I = function(id){ return "images/items/" + id + ".png"; };
  window.YW3_PARTY_MASTER = {
    version: "v431",
    partyIconDir: null,
    natures: [
      { id: "item_0161", name: "短気" },
      { id: "item_0162", name: "荒くれ" },
      { id: "item_0163", name: "れいせい" },
      { id: "item_0164", name: "ずのう的" },
      { id: "item_0165", name: "しんちょう" },
      { id: "item_0166", name: "動じない" },
      { id: "item_0167", name: "やさしい" },
      { id: "item_0168", name: "情け深い" },
      { id: "item_0169", name: "いやらしい" },
      { id: "item_0170", name: "非道" },
      { id: "item_0171", name: "協力的" },
      { id: "item_0172", name: "けんしん的" },
      { id: "item_0562", name: "該当なし" },
      { id: "item_0787", name: "該当なし" }
    ],
    equips: [
      { id: "item_0514", name: "神話のうでわ", kind: "装備" },
      { id: "item_0515", name: "神話のゆびわ", kind: "装備" },
      { id: "item_0516", name: "神話のおまもり", kind: "装備" },
      { id: "item_0517", name: "神話のバッジ", kind: "装備" },
      { id: "item_0518", name: "エンマブレード", kind: "装備" },
      { id: "item_0770", name: "イサマシ", kind: "魂" },
      { id: "item_0771", name: "フシギ", kind: "魂" },
      { id: "item_0772", name: "ゴーケツ", kind: "魂" },
      { id: "item_0773", name: "プリチー", kind: "魂" },
      { id: "item_0774", name: "ポカポカ", kind: "魂" },
      { id: "item_0775", name: "ウスラカゲ", kind: "魂" },
      { id: "item_0776", name: "ブキミー", kind: "魂" },
      { id: "item_0777", name: "ニョロロン", kind: "魂" },
      { id: "item_0778", name: "怪魔", kind: "魂" },
      { id: "item_0779", name: "ハグレ", kind: "魂" },
      { id: "item_0780", name: "レア魂（赤）", kind: "魂" },
      { id: "item_0781", name: "レア魂（銀）", kind: "魂" },
      { id: "item_0783", name: "レア魂（青）", kind: "魂" },
      { id: "item_0562", name: "該当なし", kind: "" },
      { id: "item_0787", name: "該当なし", kind: "" }
    ],
    /* 肉体改造（スポーツクラブ）：補正値・回数の上限（合計5回）ともユーザー確認（v431） */
    club: {
      maxTotal: 5,
      maxTotalNote: "ユーザー確認（2026-11-18）",
      courses: [
        { key: "strength", name: "ちからコース", short: "ち", gain: { strength: 5, defense: -2 } },
        { key: "spirit", name: "ようりょくコース", short: "よ", gain: { spirit: 5, speed: -2 } },
        { key: "defense", name: "まもりコース", short: "ま", gain: { defense: 5, speed: -2 } },
        { key: "speed", name: "すばやさコース", short: "す", gain: { speed: 5, defense: -2 } }
      ]
    }
  };
  window.YW3_PARTY_MASTER.natures.forEach(function(x){ x.icon = I(x.id); });
  window.YW3_PARTY_MASTER.equips.forEach(function(x){ x.icon = I(x.id); });
})();
