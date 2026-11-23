import { $ } from '../core/dom.js';

export function init() {
  if (matchMedia('(hover:hover) and (pointer:fine)').matches) {
    const s = $('#scope');
    document.documentElement.classList.add('sc');
    addEventListener('pointermove', (e) => {
      s.style.transform = 'translate(' + e.clientX + 'px,' + e.clientY + 'px)';
      s.style.opacity = 1;
      s.classList.toggle('lock', !!(e.target.closest && e.target.closest('a,button')));
    });
    document.documentElement.addEventListener('pointerleave', () => (s.style.opacity = 0));
    addEventListener('pointerdown', () => s.classList.add('fire'));
    addEventListener('pointerup', () => s.classList.remove('fire'));
  }
}
