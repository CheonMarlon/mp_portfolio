import { $, RM } from '../core/dom.js';
import { scrollState } from '../core/scroll-state.js';

export function init() {
  const bar = document.createElement('i');
  bar.id = 'sp';
  document.body.appendChild(bar);
  const home = $('#home'),
    els = [...document.querySelectorAll('.scene,.fold,section h2')],
    cl = (v, a, b) => Math.min(b, Math.max(a, v));
  let pv = scrollY,
    sv = 0,
    q = 0;
  const frame = () => {
    q = 0;
    const y = scrollY,
      H = innerHeight,
      dv = y - pv;
    pv = y;
    sv += (dv - sv) * 0.18;
    scrollState.velocity = Math.abs(sv) < 0.05 ? 0 : sv;
    bar.style.transform =
      'scaleX(' +
      cl(y / Math.max(1, document.documentElement.scrollHeight - H), 0, 1).toFixed(4) +
      ')';
    if (!RM) {
      home.style.setProperty('--p', cl(y / H, 0, 1).toFixed(4));
      els.forEach((e) => {
        const r = e.getBoundingClientRect();
        if (r.bottom < -200 || r.top > H + 200) return;
        const p = cl(1 - (r.top + r.height / 2) / H, 0, 1);
        e.style.setProperty('--p', p.toFixed(4));
        e.style.setProperty('--e', cl(p * 2, 0, 1).toFixed(4));
      });
    }
    if (Math.abs(dv) > 0.1 || scrollState.velocity) q = requestAnimationFrame(frame);
  };
  const go = () => {
    if (!q) q = requestAnimationFrame(frame);
  };
  addEventListener('scroll', go, { passive: true });
  addEventListener('resize', go);
  go();
}
