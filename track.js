/* Счётчик хабов: открытие страницы и нажатия кнопок → таблица «Лосось · клики хаба».
   Источник берётся из ?src= в ссылке (bio, target_sep, stories…) и помнится до конца сессии.
   Пока ENDPOINT пустой — ничего никуда не шлёт. */
(function () {
  var ENDPOINT = '';
  var page = document.documentElement.getAttribute('data-page') || 'main';
  var src = '';
  try {
    src = new URLSearchParams(location.search).get('src') || sessionStorage.getItem('losos_src') || '';
    if (src) sessionStorage.setItem('losos_src', src);
  } catch (e) {}
  var ua = navigator.userAgent || '';
  var os = /iPhone|iPad|iPod/i.test(ua) ? 'ios' : /Android/i.test(ua) ? 'android' : 'other';
  var ref = '';
  try { ref = document.referrer ? new URL(document.referrer).hostname : ''; } catch (e) {}

  function send(ev) {
    if (!ENDPOINT) return;
    var body = JSON.stringify({ p: page, e: ev, s: src, os: os, r: ref });
    try {
      if (navigator.sendBeacon) { navigator.sendBeacon(ENDPOINT, body); return; }
    } catch (e) {}
    try { fetch(ENDPOINT, { method: 'POST', body: body, mode: 'no-cors', keepalive: true }); } catch (e) {}
  }

  send('view');
  document.addEventListener('click', function (e) {
    var el = e.target.closest && e.target.closest('[data-e]');
    if (el) send(el.getAttribute('data-e'));
  }, true);

  // Метку источника передаём и на сайт, чтобы заказ с losos.kz тоже был подписан.
  if (src) document.querySelectorAll('a[href*="losos.kz"]').forEach(function (a) {
    a.href += (a.href.indexOf('?') < 0 ? '?' : '&') + 'utm_campaign=' + encodeURIComponent(src);
  });
})();
