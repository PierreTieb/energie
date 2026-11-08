// ===== L'Énergie sous toutes ses formes - accueil =====
(function () {
  'use strict';

  // Ambiances du décor. « top » sert aussi de couleur à la barre du navigateur.
  var AMBIANCES = [
    { id: 'jour',       label: '☀️ Jour',       top: '#4A8FD6' },
    { id: 'aube',       label: '🌅 Aube',       top: '#6C7DC4' },
    { id: 'crepuscule', label: '🌇 Crépuscule', top: '#3E4D8F' },
    { id: 'nuit',       label: '🌙 Nuit',       top: '#070D26' },
    { id: 'orage',      label: '⛈️ Orage',      top: '#3D464F' },
    { id: 'hiver',      label: '❄️ Hiver',      top: '#8FAECB' },
    { id: 'canicule',   label: '🔥 Canicule',   top: '#5FA6DE' }
  ];

  var meta = document.querySelector('meta[name="theme-color"]');

  function store(key, value) {
    try {
      if (value === undefined) return localStorage.getItem(key);
      localStorage.setItem(key, value);
    } catch (e) { return null; }
  }

  function setAmbiance(id) {
    var a = AMBIANCES.filter(function (x) { return x.id === id; })[0] || AMBIANCES[0];
    document.body.setAttribute('data-ambiance', a.id);
    if (meta) meta.setAttribute('content', a.top);
    var chips = document.querySelectorAll('.demo__chip');
    for (var i = 0; i < chips.length; i++) chips[i].setAttribute('aria-pressed', chips[i].dataset.id === a.id ? 'true' : 'false');
    store('energie.demo.ambiance', a.id);
  }
  window.setAmbiance = setAmbiance;

  // ----- Aperçu provisoire -----
  var chipsBox = document.getElementById('demo-chips');
  AMBIANCES.forEach(function (a) {
    var b = document.createElement('button');
    b.type = 'button'; b.className = 'demo__chip'; b.dataset.id = a.id; b.textContent = a.label;
    b.addEventListener('click', function () { setAmbiance(a.id); });
    chipsBox.appendChild(b);
  });
  setAmbiance(location.hash.slice(1) || store('energie.demo.ambiance') || 'jour');

  var progressBox = document.getElementById('demo-progress');
  function showProgress(on) {
    var els = document.querySelectorAll('.demo-progress');
    for (var i = 0; i < els.length; i++) els[i].hidden = !on;
    store('energie.demo.progress', on ? '1' : '0');
  }
  progressBox.checked = store('energie.demo.progress') === '1' || /[?&]progression/.test(location.search);
  showProgress(progressBox.checked);
  progressBox.addEventListener('change', function () { showProgress(progressBox.checked); });

  // ----- Boutons de mode (modules pas encore construits) -----
  var toast = document.getElementById('toast'), toastTimer;
  function say(text) {
    toast.textContent = text; toast.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.hidden = true; }, 1800);
  }
  ['btn-lessons', 'btn-story', 'btn-challenge'].forEach(function (id) {
    var btn = document.getElementById(id);
    btn.addEventListener('click', function () {
      btn.classList.remove('nudge'); void btn.offsetWidth; btn.classList.add('nudge');
      say('Prochainement…');
    });
  });
})();
