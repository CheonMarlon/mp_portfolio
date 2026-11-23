import { $ } from '../core/dom.js';
import { STACK } from '../data/stack.js';

export function init() {
  const KEYS = Object.keys(STACK),
    slug = (x) => x.toLowerCase().replace(/[^a-z]+/g, '_');
  function showStack(i) {
    const k = KEYS[i],
      v = STACK[k];
    $('#side').innerHTML =
      '<small>EXPLORER</small>' +
      KEYS.map(
        (x, j) =>
          '<button data-i="' +
          j +
          '" class="' +
          (j === i ? 'on' : '') +
          '"><span>▸</span>' +
          slug(x) +
          '.ts</button>',
      ).join('');
    const L = [
      '<span class="c">// ' + k + '</span>',
      '<span class="k">export const</span> ' + slug(k) + ' = [',
    ].concat(
      v.map((x) => '  "' + x + '",'),
      ['];'],
    );
    $('#code').innerHTML = L.map(
      (t, j) =>
        '<span class="l" style="animation-delay:' +
        j * 60 +
        'ms"><span class="n">' +
        (j + 1) +
        '</span>' +
        t +
        (j === L.length - 1 ? '<span class="cu"></span>' : '') +
        '</span>',
    ).join('');
    $('#pos').textContent = 'Ln ' + L.length + ', Col 3';
  }
  $('#side').onclick = (e) => {
    const b = e.target.closest('button');
    b && showStack(+b.dataset.i);
  };
  showStack(0);
}
