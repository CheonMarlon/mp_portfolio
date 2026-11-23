import { $ } from '../../core/dom.js';
import { PROJECTS } from '../../data/projects.js';

export function init() {
  const S = (p) => Object.values(p.views).flatMap((v) => v.shots),
    sheet = (p, k) => {
      const s = S(p),
        u = s[k] || s[0];
      return (
        '<div class="pp s' +
        k +
        '">' +
        (u ? '<img src="' + u + '" alt="">' : '<span>SCREENSHOT 0' + (k + 1) + '</span>') +
        '</div>'
      );
    };
  $('#list').innerHTML = PROJECTS.map(
    (
      p,
      i,
    ) => `<div class="row rv ${i % 2 ? 'alt' : ''}"><div class="info"><span class="num">${p.n} / 0${PROJECTS.length}</span><h3>${p.title}</h3><div class="sub2">${p.sub}</div><div class="tags">${p.tech.map((t) => `<span>${t}</span>`).join('')}</div></div>
<button class="fold" data-i="${i}" aria-label="Open ${p.title} presentation"><div class="fd"><div class="bk"></div>${sheet(p, 1)}${sheet(p, 0)}<div class="pp br"><small>PROJECT BRIEF</small><p>${p.desc}</p></div><div class="fr"><b>${p.n}</b><em>OPEN PROJECT ↗</em></div></div></button></div>`,
  ).join('');
}
