import { $, RM } from '../core/dom.js';

export function init() {
  const sc = $('#scene'),
    lap = $('#lap');
  if (!RM && matchMedia('(hover:hover)').matches) {
    sc.addEventListener('pointermove', (e) => {
      const r = sc.getBoundingClientRect(),
        x = (e.clientX - r.left) / r.width - 0.5,
        y = (e.clientY - r.top) / r.height - 0.5;
      lap.style.setProperty('--ry', x * 16 + 'deg');
      lap.style.setProperty('--rx', 4 - y * 10 + 'deg');
    });
    sc.addEventListener('pointerleave', () => {
      lap.style.setProperty('--ry', '-8deg');
      lap.style.setProperty('--rx', '4deg');
    });
  }
}
