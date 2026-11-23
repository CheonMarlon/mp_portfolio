import { $ } from '../core/dom.js';

export function init() {
  $('#yr').textContent = new Date().getFullYear();
  $('#top').onclick = () => scrollTo({ top: 0 });
}
