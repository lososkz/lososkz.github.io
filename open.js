/* Открыть приложение Лосось: есть — сразу в него, нет — в магазин.
   Схема com.foodpicasso.lososkz:// найдена тестом 26.09.2026 (iPhone). */
function lososOpen(btn) {
  var SCHEME = 'com.foodpicasso.lososkz://';
  var IOS = 'https://apps.apple.com/app/id6740765547';
  var AND = 'https://play.google.com/store/apps/details?id=com.foodpicasso.lososkz';
  var ANY = 'https://foodpicasso.com/x/3341xacf';
  var ua = navigator.userAgent || '';
  var ios = /iPhone|iPad|iPod/i.test(ua) || (/Macintosh/i.test(ua) && 'ontouchend' in document);
  var and = /Android/i.test(ua);
  if (and) {
    btn.href = 'intent://#Intent;scheme=com.foodpicasso.lososkz;package=com.foodpicasso.lososkz;' +
               'S.browser_fallback_url=' + encodeURIComponent(AND) + ';end';
    return;
  }
  if (!ios) { btn.href = ANY; return; }
  /* 🔴 26.09.2026: на iPhone схему НЕ пробуем. Без установленного приложения Safari
     показывает «адрес недействителен» (проверено Азаматом с удалённым приложением),
     а узнать заранее, стоит ли оно, iOS сайту не даёт. Ведём в App Store: там
     «Открыть», если приложение есть, и «Загрузить», если нет. */
  btn.href = IOS;
}
