import { $ } from '../../core/dom.js';

export function init() {
  $('#mail').onclick = async () => {
    const m = 'marlonrimandopinpin@gmail.com';
    try {
      await navigator.clipboard.writeText(m);
    } catch {}
    $('#ok').textContent = 'Copied ✓';
    $('#ok').classList.add('on');
    setTimeout(() => $('#ok').classList.remove('on'), 1800);
  };
}
