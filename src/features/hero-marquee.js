import { $, RM } from '../core/dom.js';

export function init() {
  const TXT = 'building digital experiences ✳ solving problems ✳ turning ideas into reality ✳ ',
    F = '800 {s}px Manrope,system-ui,sans-serif',
    cv = $('#cv'),
    cx = cv.getContext('2d'),
    src = document.createElement('canvas'),
    sx = src.getContext('2d'),
    dpr = Math.min(devicePixelRatio || 1, 2);
  let W,
    H,
    unit,
    off = 0,
    last = 0,
    raf;
  function build() {
    const r = cv.getBoundingClientRect();
    W = cv.width = Math.round(r.width * dpr);
    H = cv.height = Math.round(r.height * dpr);
    const fs = H * 0.3,
      f = F.replace('{s}', fs);
    sx.font = f;
    unit = sx.measureText(TXT).width;
    src.width = Math.ceil(unit * 2 + W);
    src.height = Math.ceil(fs * 1.6);
    sx.font = f;
    sx.fillStyle = '#000';
    sx.textBaseline = 'middle';
    for (let x = 0; x < src.width; x += unit) sx.fillText(TXT, x, src.height / 2);
  }
  function draw() {
    cx.clearRect(0, 0, W, H);
    const sh = src.height;
    for (let x = 0; x < W; x += 2) {
      const u = x / W,
        h = H * (0.62 + 0.2 * Math.cos(u * Math.PI * 3 + 0.8)),
        c = H * 0.5 + H * 0.12 * Math.sin(u * Math.PI * 2 + 0.5);
      cx.fillStyle = '#fff';
      cx.fillRect(x, c - h / 2, 2, h);
      cx.drawImage(src, Math.floor(off + x), 0, 2, sh, x, c - h / 2, 2, h);
    }
  }
  function loop(t) {
    off = (off + (t - last) * 0.09 * dpr) % unit;
    last = t;
    draw();
    raf = requestAnimationFrame(loop);
  }
  function start() {
    build();
    last = performance.now();
    cancelAnimationFrame(raf);
    if (RM) draw();
    else raf = requestAnimationFrame(loop);
  }
  document.fonts.load('800 20px Manrope').then(start);
  addEventListener('resize', start);
}
