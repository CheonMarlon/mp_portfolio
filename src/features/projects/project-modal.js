import { $ } from '../../core/dom.js';
import { PROJECTS } from '../../data/projects.js';

const TAB_LABELS = { brief: 'Brief', web: 'Web', mobile: 'Mobile', demo: 'Demo' };

export function init() {
  let cur,
    view,
    idx = 0,
    opener;
  const md = $('#md'),
    pan = $('#pan');
  function tabs(p) {
    const keys = ['brief', ...Object.keys(p.views), ...(p.video ? ['demo'] : [])];
    return keys
      .map(
        (k) => `<button class="${k === view ? 'on' : ''}" data-v="${k}">${TAB_LABELS[k]}</button>`,
      )
      .join('');
  }
  function linksHtml(p) {
    return ['github', 'live']
      .map((k) => {
        const name = k === 'github' ? 'GitHub' : 'Live site';
        return p.links[k]
          ? `<a href="${p.links[k]}" target="_blank" rel="noopener">${name} ↗</a>`
          : `<span>${name} link — add later</span>`;
      })
      .join('');
  }
  function bind() {
    $('#x').onclick = close;
    pan.querySelectorAll('[data-v]').forEach(
      (b) =>
        (b.onclick = () => {
          view = b.dataset.v;
          idx = 0;
          render();
        }),
    );
  }
  function brief() {
    pan.className = 'pan b';
    const p = PROJECTS[cur],
      L = linksHtml(p);
    pan.innerHTML =
      '<div class="bar"><h4>' +
      p.title +
      '</h4><div>' +
      tabs(p) +
      '<button id="x">Close ✕</button></div></div><article class="dos"><div class="stamp">DECLASSIFIED</div><header><span>PROJECT FILE Nº ' +
      p.n +
      '</span><span>PERIOD: ' +
      p.year +
      '</span><span>CLASSIFICATION: PUBLIC</span></header><h5>' +
      p.title +
      '</h5><div class="des">' +
      p.sub +
      '</div><dl><dt>ROLE</dt><dd>' +
      p.role +
      '</dd><dt>OBJECTIVE</dt><dd>' +
      p.desc +
      '</dd><dt>CONTRIBUTIONS</dt><dd><ol>' +
      p.does.map((x) => '<li>' + x + '</li>').join('') +
      '</ol></dd><dt>EQUIPMENT</dt><dd class="tg">' +
      p.tech.map((x) => '<span>' + x + '</span>').join('') +
      '</dd></dl></article><div class="lk">' +
      L +
      '</div>';
    bind();
  }
  function demo() {
    pan.className = 'pan w';
    const p = PROJECTS[cur];
    const poster = p.videoPoster || `https://i.ytimg.com/vi/${p.video}/hqdefault.jpg`;
    pan.innerHTML = `<div class="bar"><h4>${p.title}</h4><div>${tabs(p)}<button id="x">Close ✕</button></div></div>
<div class="bw"><div class="bh"><i></i><i></i><i></i><u>${p.title.toLowerCase().replace(/\W/g, '')} — demo</u></div><div class="vp video"><div class="video-container" id="projectDemo"><button class="video-play" aria-label="Play project demo"><img src="${poster}" alt="${p.title} demonstration"><span>▶</span></button></div></div></div>
<div class="lk">${linksHtml(p)}</div>`;
    bind();
    $('#projectDemo').addEventListener('click', playDemo, { once: true });
  }
  /** Loads the YouTube player only after the visitor clicks play. */
  function playDemo(event) {
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube-nocookie.com/embed/${PROJECTS[cur].video}?autoplay=1`;
    iframe.title = `${PROJECTS[cur].title} demonstration`;
    iframe.allow = 'autoplay; encrypted-media; picture-in-picture';
    iframe.allowFullscreen = true;
    event.currentTarget.replaceChildren(iframe);
  }
  function render() {
    if (view === 'brief') return brief();
    if (view === 'demo') return demo();
    const p = PROJECTS[cur],
      v = p.views[view],
      s = v.shots,
      web = view === 'web';
    const img = s.length
      ? `<img src="${s[idx]}" alt="${p.title} screenshot ${idx + 1}">`
      : `<span>No screenshot yet.<br>Add images to <code>shots</code> for ${p.title} → ${v.label}.</span>`;
    const L = linksHtml(p);
    pan.className = 'pan ' + (web ? 'w' : 'p');
    pan.innerHTML = `<div class="bar"><h4>${p.title}</h4><div>${tabs(p)}<button id="x">Close ✕</button></div></div>
${web ? `<div class="bw"><div class="bh"><i></i><i></i><i></i><u>${p.title.toLowerCase().replace(/\W/g, '')} — screenshots</u></div><div class="vp">${img}</div></div>` : `<div class="phw"><div class="ph">${img}</div></div>`}
<div class="ctl"><button id="pv" ${s.length < 2 ? 'disabled style="opacity:.3"' : ''}>← Prev</button><span>${s.length ? idx + 1 + ' / ' + s.length : '0 / 0'} · ${v.label}</span><button id="nx" ${s.length < 2 ? 'disabled style="opacity:.3"' : ''}>Next →</button></div><div class="lk">${L}</div>`;
    $('#x').onclick = close;
    $('#pv').onclick = () => {
      idx = (idx - 1 + s.length) % s.length;
      render();
    };
    $('#nx').onclick = () => {
      idx = (idx + 1) % s.length;
      render();
    };
    pan.querySelectorAll('[data-v]').forEach(
      (b) =>
        (b.onclick = () => {
          view = b.dataset.v;
          idx = 0;
          render();
        }),
    );
  }
  function open(i, el) {
    opener = el;
    cur = i;
    view = 'brief';
    idx = 0;
    render();
    md.classList.add('on');
    document.body.style.overflow = 'hidden';
    $('#x').focus();
  }
  function close() {
    md.classList.remove('on');
    pan.innerHTML = ''; // also stops any playing video
    document.body.style.overflow = '';
    opener && opener.focus();
  }
  document.querySelectorAll('.fold').forEach((b) => (b.onclick = () => open(+b.dataset.i, b)));
  md.onclick = (e) => e.target === md && close();
  addEventListener('keydown', (e) => {
    if (!md.classList.contains('on')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowRight' && $('#nx')) $('#nx').click();
    if (e.key === 'ArrowLeft' && $('#pv')) $('#pv').click();
  });
}
