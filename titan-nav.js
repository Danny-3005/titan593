/* ===================================================================
   TITAN593 · Navegación unificada + selector de paleta
   Se inyecta idéntica en todas las páginas. Un solo archivo manda.
   =================================================================== */
(function () {

  /* ---------- Paletas disponibles ---------- */
  var TEMAS = [
    { k: 'selva',     n: 'Selva profundo',   c: ['#14532D', '#65A30D', '#F4F6F3'] },
    { k: 'esmeralda', n: 'Esmeralda fresco', c: ['#059669', '#ECFDF5', '#F8FAF9'] },
    { k: 'bosque',    n: 'Bosque clásico',   c: ['#15803D', '#B45309', '#F7F8F6'] },
    { k: 'oliva',     n: 'Oliva agro',       c: ['#4D7C0F', '#9A3412', '#F7F6EF'] },
    { k: 'petroleo',  n: 'Petróleo elegante',c: ['#0F766E', '#2DD4BF', '#F5F7F7'] },
    { k: 'banano',    n: 'Banano oscuro',    c: ['#FFD400', '#A3E635', '#0B0F14'] },
    { k: 'cyber',     n: 'Cyber banano',     c: ['#FF4B89', '#00F0FF', '#0D0221'] }
  ];
  var temaActual = localStorage.getItem('titan_tema') || 'selva';
  function aplicarTema(k) {
    temaActual = k;
    document.documentElement.setAttribute('data-theme', k);
    localStorage.setItem('titan_tema', k);
    var pop = document.getElementById('tnPop');
    if (pop) pop.querySelectorAll('.tn-opt').forEach(function (b) {
      var on = b.dataset.k === k;
      b.classList.toggle('on', on);
      b.querySelector('em').textContent = on ? '✓' : '';
    });
  }
  aplicarTema(temaActual);

  /* ---------- Iconos ---------- */
  var I = {
    home:   '<path d="M3 10.5 12 4l9 6.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',
    box:    '<path d="M3 8.5 12 4l9 4.5v7L12 20 3 15.5z"/><path d="M3 8.5 12 13l9-4.5M12 13v7"/>',
    card:   '<rect x="3" y="5.5" width="18" height="13" rx="2.5"/><path d="M3 10h18M6.5 14.5h4"/>',
    calc:   '<rect x="4.5" y="3.5" width="15" height="17" rx="2.5"/><path d="M8 7.5h8M8.5 12h.01M12 12h.01M15.5 12h.01M8.5 16h.01M12 16h.01M15.5 16h3"/>',
    receipt:'<path d="M6 3.5h12v17l-3-1.6-3 1.6-3-1.6-3 1.6z"/><path d="M9.5 8.5h5M9.5 12.5h5"/>',
    chart:  '<path d="M4 20h16"/><rect x="6" y="12" width="3.2" height="6" rx="1"/><rect x="11.4" y="8" width="3.2" height="10" rx="1"/><rect x="16.8" y="14" width="3.2" height="4" rx="1"/>',
    paint:  '<path d="M12 3a9 9 0 1 0 0 18c1.4 0 2-.9 2-1.8 0-1.6-1.6-1.9-1.6-3.2 0-1 .8-1.8 1.8-1.8h1.3A4.5 4.5 0 0 0 21 9.8C21 6 16.9 3 12 3z"/><circle cx="8" cy="10" r="1.1"/><circle cx="12" cy="7.6" r="1.1"/><circle cx="16" cy="10" r="1.1"/>'
  };
  function svg(name, w) {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="' + (w || 1.6) +
           '" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + I[name] + '</svg>';
  }

  /* ---------- Módulos ---------- */
  var MODS = [
    { f: 'index.html',       n: '',  t: 'Inicio',      s: 'Plataforma',   i: 'home' },
    { f: 'por-pagar.html',   n: '1', t: 'Por Pagar',   s: 'Producción',   i: 'box' },
    { f: 'por-cobrar.html',  n: '2', t: 'Por Cobrar',  s: 'Deudas',       i: 'card' },
    { f: 'liquidacion.html', n: '3', t: 'Liquidación', s: 'Conciliación', i: 'calc' },
    { f: 'pagos.html',       n: '4', t: 'Pagos',       s: 'Soportes',     i: 'receipt' },
    { f: 'dashboard.html',   n: '5', t: 'Dashboard',   s: 'Reportes',     i: 'chart' }
  ];
  var seg = location.pathname.split('/').pop().toLowerCase();
  if (!seg) seg = 'index.html';
  if (seg.indexOf('.') < 0) seg = seg + '.html';
  var cur = MODS.filter(function (m) { return m.f === seg; })[0] || MODS[0];

  var items = MODS.map(function (m) {
    return '<a class="tn-item' + (m === cur ? ' is-active' : '') + '" href="' + m.f + '"' +
           (m === cur ? ' aria-current="page"' : '') + '>' +
             '<span class="tn-ic">' + svg(m.i) + '</span>' +
             '<span class="tn-tx"><b>' + (m.n ? '<i class="tn-n">' + m.n + '</i>' : '') + m.t + '</b>' +
             '<small>' + m.s + '</small></span></a>';
  }).join('');

  var aside = document.createElement('aside');
  aside.className = 'tn-side';
  aside.innerHTML =
    '<a class="tn-brand" href="index.html" aria-label="TITAN593 inicio">' +
      '<span class="tn-logo"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" ' +
      'stroke-linecap="round" aria-hidden="true"><path d="M5 5c0 8 4.5 13 12 13"/>' +
      '<path d="M5 5c2.6 0 4.4 1.3 5 3.6"/><path d="M17 18c1.4 0 2.4-.6 3-1.8"/></svg></span>' +
      '<span class="tn-bt">TITAN593<small>GESTIÓN FINANCIERA</small></span></a>' +
    '<nav class="tn-list">' + items + '</nav>' +
    '<div class="tn-foot">by <b>TRIBUDAN AI</b><span>© 2026</span></div>';

  var top = document.createElement('div');
  top.className = 'tn-top';
  top.innerHTML =
    '<button class="tn-burger" id="tnBurger" aria-label="Abrir menú" aria-expanded="false">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg></button>' +
    '<div class="tn-crumb">' +
      (cur.n ? '<span class="tn-badge">' + cur.n + '</span>'
             : '<span class="tn-badge">' + svg('home', 2) + '</span>') +
      '<span class="tn-h1">' + cur.t + '</span><span class="tn-sep">/</span>' +
      '<span class="tn-sub">' + cur.s + '</span></div>' +
    '<button class="tn-theme" id="tnTheme" aria-haspopup="true" aria-expanded="false">' +
      svg('paint') + '<span>Colores</span></button>' +
    '<a class="tn-back" href="index.html">Inicio</a>';

  var pop = document.createElement('div');
  pop.className = 'tn-pop'; pop.id = 'tnPop';
  pop.innerHTML = '<h4>Paleta de colores</h4>' + TEMAS.map(function (t) {
    return '<button class="tn-opt" data-k="' + t.k + '">' +
      '<span class="tn-dots">' + t.c.map(function (c) { return '<i style="background:' + c + '"></i>'; }).join('') + '</span>' +
      t.n + '<em></em></button>';
  }).join('');

  var scrim = document.createElement('div');
  scrim.className = 'tn-scrim'; scrim.id = 'tnScrim';

  document.body.classList.add('titan-shell');
  document.body.insertBefore(pop, document.body.firstChild);
  document.body.insertBefore(scrim, document.body.firstChild);
  document.body.insertBefore(top, document.body.firstChild);
  document.body.insertBefore(aside, document.body.firstChild);

  aplicarTema(temaActual);  /* marca la opción activa ahora que el popup existe */

  pop.querySelectorAll('.tn-opt').forEach(function (b) {
    b.addEventListener('click', function () { aplicarTema(b.dataset.k); });
  });

  var btT = document.getElementById('tnTheme');
  btT.addEventListener('click', function (e) {
    e.stopPropagation();
    var on = pop.classList.toggle('on');
    btT.setAttribute('aria-expanded', on ? 'true' : 'false');
  });
  document.addEventListener('click', function (e) {
    if (!pop.contains(e.target) && e.target !== btT) {
      pop.classList.remove('on'); btT.setAttribute('aria-expanded', 'false');
    }
  });

  function setOpen(on) {
    document.body.classList.toggle('tn-open', on);
    document.getElementById('tnBurger').setAttribute('aria-expanded', on ? 'true' : 'false');
  }
  document.getElementById('tnBurger').addEventListener('click', function () {
    setOpen(!document.body.classList.contains('tn-open'));
  });
  scrim.addEventListener('click', function () { setOpen(false); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { setOpen(false); pop.classList.remove('on'); }
  });
})();

/* ===================================================================
   ASISTENTE TITAN · avatar que reacciona a la voz y responde hablando
   =================================================================== */
(function () {
  var IMG_LOCAL = 'asistente.png';
  var IMG_WEB = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCGnlzRYTaN2wnPwNo2cwcYBSt7ePXxIPr5MbgEwRXA7YVmeLiqPL-M5WCybZNinagaQpE20WOJMpSa_1P7GTRZZgsP4JZvKbe_Y8XTtRJd86JSe8I9_s37wCP3xwUTw8sVaAJGRiiXD5GDUYjmBf8raIVVA0yQhJ77_xenOuLgtiB8-9w2OvozO3b7bGvN6fLMTDF52myf0VGuCvYVWgp2ygWlrmfUAB40Lr2bhdmE7HWYbeVFhXpc';

  var voz = localStorage.getItem('titan_voz') !== 'off';

  var wrap = document.createElement('div');
  wrap.className = 'ta-wrap';
  wrap.innerHTML =
    '<button class="ta-mute" id="taMute"></button>' +
    '<div class="ta-bubble" id="taBubble"></div>' +
    '<div class="ta-av" id="taAv" title="Asistente TITAN — clic para saludar">' +
      '<span class="ta-ring"></span><span class="ta-ring2"></span>' +
      '<img id="taImg" alt="Asistente TITAN">' +
      '<span class="ta-dot"></span>' +
    '</div>';
  document.body.appendChild(wrap);

  /* imagen: local -> web -> inicial */
  var img = document.getElementById('taImg'), intento = 0;
  img.addEventListener('error', function () {
    intento++;
    if (intento === 1) { img.src = IMG_WEB; return; }
    img.remove();
    var fb = document.createElement('span');
    fb.className = 'ta-fallback'; fb.textContent = 'AI';
    document.getElementById('taAv').insertBefore(fb, document.querySelector('.ta-dot'));
  });
  img.src = IMG_LOCAL;

  var bubble = document.getElementById('taBubble'), tOcultar;
  function decir(txt, eco, hablar) {
    bubble.innerHTML = '<b>Asistente TITAN</b>' + (eco ? '<span class="ta-eco">' + txt + '</span>' : txt);
    bubble.classList.add('on');
    clearTimeout(tOcultar);
    tOcultar = setTimeout(function () { bubble.classList.remove('on'); }, eco ? 4000 : 9000);
    if (hablar && voz && window.speechSynthesis) {
      try {
        speechSynthesis.cancel();
        var u = new SpeechSynthesisUtterance(txt.replace(/<[^>]+>/g, ''));
        u.lang = 'es-EC'; u.rate = 1.02;
        u.onstart = function () { wrap.classList.add('talking'); };
        u.onend = function () { wrap.classList.remove('talking'); };
        speechSynthesis.speak(u);
      } catch (e) {}
    }
  }
  window.titanDecir = function (t) { decir(t, false, true); };

  /* botón de voz */
  var bm = document.getElementById('taMute');
  function pintarMute() { bm.textContent = voz ? '🔊 Voz activa' : '🔇 Voz apagada'; }
  pintarMute();
  bm.addEventListener('click', function () {
    voz = !voz;
    localStorage.setItem('titan_voz', voz ? 'on' : 'off');
    pintarMute();
    if (voz) decir('Voz activada. Te confirmo cada registro.', false, true);
    else { if (window.speechSynthesis) speechSynthesis.cancel(); decir('Voz apagada.', false, false); }
  });

  /* saludo al hacer clic en el avatar */
  var modulo = (document.querySelector('.tn-h1') || {}).textContent || 'la plataforma';
  document.getElementById('taAv').addEventListener('click', function () {
    var h = new Date().getHours();
    var s = h < 12 ? 'Buenos días' : (h < 19 ? 'Buenas tardes' : 'Buenas noches');
    decir(s + ', Danny. Estás en ' + modulo + '. Toca el micrófono y dicta; yo te confirmo el resultado.', false, true);
  });

  /* reacciona al micrófono de la página */
  var mic = document.getElementById('mic');
  if (mic) {
    new MutationObserver(function () {
      var rec = mic.classList.contains('rec');
      wrap.classList.toggle('listening', rec);
      if (rec) decir('Escuchando…', false, false);
      else setTimeout(resumir, 700);
    }).observe(mic, { attributes: true, attributeFilter: ['class'] });
  }

  /* muestra lo que va entendiendo */
  var tr = document.getElementById('transcript');
  if (tr) {
    var ult = '';
    new MutationObserver(function () {
      if (!wrap.classList.contains('listening')) return;
      var t = (tr.textContent || '').trim().slice(-90);
      if (t && t !== ult) { ult = t; decir(t, true, false); }
    }).observe(tr, { childList: true, subtree: true, characterData: true });
  }

  /* al dejar de dictar: confirma con los números de la pantalla */
  function val(id) { var e = document.getElementById(id); return e ? (e.value || e.textContent || '').trim() : ''; }
  function resumir() {
    var prod = val('f_prod'), partes = [];
    var neto = val('f_neto'), valor = val('f_valor'), saldo = val('f_saldo');
    var cajas = val('f_cajas'), pvu = val('f_pvu');
    if (prod) partes.push('Productor ' + prod);
    if (cajas && pvu) partes.push(cajas + ' cajas a ' + pvu);
    if (neto) partes.push('neto ' + neto);
    else if (valor && valor !== '$0,00') partes.push('valor ' + valor);
    else if (saldo) partes.push('saldo ' + saldo);
    if (!partes.length) { decir('No capté datos. Toca el micrófono e intenta de nuevo.', false, true); return; }
    var msg = partes.join(', ') + '.';
    var n = parseFloat((neto || '').replace(/[^0-9,-]/g, '').replace(',', '.'));
    if (!isNaN(n) && n < 0) msg += ' Atención: el neto salió negativo, revísalo antes de guardar.';
    decir('Listo. ' + msg + ' Revisa y guarda.', false, true);
  }
})();
