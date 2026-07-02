// ==========================================================
// 空き状況の管理ファイル
//
// 予約が入った日・撮影できない日を、月ごとに数字で書くだけ。
//   例）'2026-7': [4, 5, 11]
//       → 2026年7月の 4日・5日・11日 が「×」になります。
// 数字を消せば「◯」に戻ります。ここ以外は触らなくてOK。
// カレンダーは常に「今月から3ヶ月分」を自動で表示します。
// ==========================================================
const BOOKED_DAYS = {
  '2026-7': [4, 5, 6, 8, 11, 12, 14, 18, 19, 20, 23, 25, 26, 29, 31],
  '2026-8': [1, 2, 5, 8, 9, 11, 14, 15, 16, 19, 22, 23, 27, 29, 30],
  '2026-9': [2, 5, 6, 9, 12, 13, 15, 19, 20, 21, 23, 24, 26, 27, 30]
};

// ---- ここから下はカレンダーの描画処理（編集不要） ----
(function () {
  const wrap = document.getElementById('cal-wrap');
  if (!wrap) return;

  const today = new Date();
  const WEEK = ['日', '月', '火', '水', '木', '金', '土'];

  for (let i = 0; i < 3; i++) {
    const first = new Date(today.getFullYear(), today.getMonth() + i, 1);
    const y = first.getFullYear();
    const m = first.getMonth();
    const booked = BOOKED_DAYS[y + '-' + (m + 1)] || [];
    const daysInMonth = new Date(y, m + 1, 0).getDate();

    let html = '<p class="cal-title">' + y + '年' + (m + 1) + '月</p><div class="cal-grid">';
    WEEK.forEach(w => { html += '<span class="cal-w">' + w + '</span>'; });
    for (let pad = 0; pad < first.getDay(); pad++) html += '<span></span>';

    for (let day = 1; day <= daysInMonth; day++) {
      const isPast = i === 0 && day < today.getDate();
      const isBooked = booked.includes(day);
      const cls = isPast ? 'cal-past' : (isBooked ? 'cal-x' : 'cal-o');
      const mark = isPast ? '−' : (isBooked ? '×' : '◯');
      html += '<span class="cal-d ' + cls + '"><em>' + day + '</em>' + mark + '</span>';
    }

    html += '</div>';
    const month = document.createElement('div');
    month.className = 'cal-month';
    month.innerHTML = html;
    wrap.appendChild(month);
  }
})();
