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
    var intent = 'intent://#Intent;scheme=com.foodpicasso.lososkz;package=com.foodpicasso.lososkz;' +
                 'S.browser_fallback_url=' + encodeURIComponent(AND) + ';end';
    btn.href = intent;
    /* 26.09.2026: счётчик показал, что во встроенном браузере Instagram на Android
       intent:// молча не срабатывает — люди жали «в приложение» по 4 раза и уходили на сайт.
       Остались на странице через 1,5 с — ведём в Google Play («Открыть» или «Установить»). */
    btn.addEventListener('click', function () {
      var gone = false;
      function left() { gone = true; }
      document.addEventListener('visibilitychange', function () { if (document.hidden) left(); });
      window.addEventListener('pagehide', left);
      window.addEventListener('blur', left);
      setTimeout(function () { if (!gone) location.href = AND; }, 1500);
    });
    return;
  }
  if (!ios) { btn.href = ANY; return; }
  /* iPhone: пробуем приложение, остались на странице — ведём в App Store.
     ⚠️ 26.09.2026: без приложения Safari на миг показывает «адрес недействителен».
     Пробовали вместо этого всегда вести в App Store — Азамат вернул: главное, чтобы
     с установленным приложением открывалось сразу. */
  btn.href = SCHEME;
  btn.addEventListener('click', function (e) {
    e.preventDefault();
    var gone = false;
    function left() { gone = true; }
    document.addEventListener('visibilitychange', function () { if (document.hidden) left(); });
    window.addEventListener('pagehide', left);
    window.addEventListener('blur', left);
    setTimeout(function () { if (!gone) location.href = IOS; }, 1600);
    location.href = SCHEME;
  });
}
