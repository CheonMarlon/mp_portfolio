export function init() {
  const root = document.documentElement,
    el = document.getElementById('gb'),
    cv = el.querySelector('canvas'),
    x = cv.getContext('2d'),
    pt = document.getElementById('gbp');
  root.classList.add('ld');
  const RMq = matchMedia('(prefers-reduced-motion:reduce)').matches;
  let ready = document.readyState === 'complete';
  addEventListener('load', () => (ready = true));
  if (RMq) {
    const go = () =>
      setTimeout(() => {
        el.style.transition = 'opacity .4s';
        el.style.opacity = 0;
        root.classList.remove('ld');
        setTimeout(() => el.remove(), 450);
      }, 400);
    ready ? go() : addEventListener('load', go);
    return;
  }
  let W, H, D;
  const fit = () => {
    D = Math.min(devicePixelRatio || 1, 2);
    W = innerWidth;
    H = innerHeight;
    cv.width = W * D;
    cv.height = H * D;
    x.setTransform(D, 0, 0, D, 0, 0);
  };
  fit();
  addEventListener('resize', fit);
  let t0 = performance.now(),
    skip = false,
    freed = false;
  el.querySelector('.skip').onclick = () => (skip = true);
  addEventListener('keydown', (e) => {
    if (['Enter', 'Escape', ' '].includes(e.key)) skip = true;
  });
  const cl = (v, a, b) => Math.min(b, Math.max(a, v)),
    sg = (t, a, b) => cl((t - a) / (b - a), 0, 1),
    E = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2),
    TAU = Math.PI * 2;
  function fig(px, gy, s, ph, front, aim) {
    x.fillStyle = x.strokeStyle = '#060606';
    x.lineCap = 'round';
    x.lineJoin = 'round';
    const hip = gy - 0.5 * s,
      sh = gy - 0.84 * s;
    x.lineWidth = 0.11 * s;
    for (let k = 0; k < 2; k++) {
      const w = front ? (k ? 0.06 : -0.06) * s : Math.sin(ph + k * Math.PI) * 0.2 * s;
      x.beginPath();
      x.moveTo(px + (front ? (k ? 0.04 : -0.04) * s : 0), hip);
      x.lineTo(px + w, gy - 0.02 * s);
      x.stroke();
      x.beginPath();
      x.ellipse(px + w + (front ? 0 : 0.035 * s), gy, 0.065 * s, 0.03 * s, 0, 0, TAU);
      x.fill();
    }
    x.beginPath();
    x.moveTo(px - 0.15 * s, sh + 0.02 * s);
    x.quadraticCurveTo(px, sh - 0.03 * s, px + 0.15 * s, sh + 0.02 * s);
    x.lineTo(px + 0.11 * s, hip + 0.1 * s);
    x.lineTo(px - 0.11 * s, hip + 0.1 * s);
    x.closePath();
    x.fill();
    x.beginPath();
    x.arc(px, sh - 0.085 * s, 0.07 * s, 0, TAU);
    x.fill();
    x.lineWidth = 0.075 * s;
    x.beginPath();
    if (aim) {
      x.moveTo(px + 0.14 * s, sh + 0.05 * s);
      x.lineTo(px + 0.06 * s, sh + 0.14 * s);
      x.lineTo(px + 0.01 * s, sh + 0.02 * s);
      x.stroke();
      x.beginPath();
      x.moveTo(px - 0.14 * s, sh + 0.05 * s);
      x.lineTo(px - 0.16 * s, sh + 0.3 * s);
      x.stroke();
      x.beginPath();
      x.arc(px, sh, 0.04 * s, 0, TAU);
      x.fill();
      x.fillStyle = '#fff';
      x.beginPath();
      x.arc(px, sh, 0.016 * s, 0, TAU);
      x.fill();
    } else {
      const a = Math.sin(ph) * 0.1 * s;
      x.moveTo(px + 0.01 * s, sh + 0.05 * s);
      x.lineTo(px + 0.05 * s + a, sh + 0.3 * s);
      x.stroke();
      x.fillRect(px + 0.05 * s + a, sh + 0.27 * s, 0.1 * s, 0.04 * s);
    }
  }
  function draw(t) {
    x.globalCompositeOperation = 'source-over';
    x.globalAlpha = 1;
    x.fillStyle = '#000';
    x.fillRect(0, 0, W, H);
    const cx = W / 2,
      cy = H / 2,
      RB = Math.min(W, H) * 0.44,
      shk = t > 3.5 && t < 3.9 ? (1 - sg(t, 3.5, 3.9)) * 10 : 0;
    x.save();
    if (shk) x.translate((Math.random() - 0.5) * shk, (Math.random() - 0.5) * shk);
    if (t < 1.1) {
      const p = E(sg(t, 0, 1.1)),
        px = -30 + (cx + 30) * p;
      for (let k = 14; k > 0; k--) {
        x.globalAlpha = 0.5 * (1 - k / 14) * Math.min(1, p * 6);
        x.fillStyle = '#fff';
        x.beginPath();
        x.arc(px - k * 10 * (0.4 + p), cy, 4.5 * (1 - k / 20), 0, TAU);
        x.fill();
      }
      x.globalAlpha = 1;
      x.fillStyle = '#fff';
      x.beginPath();
      x.arc(px, cy, 5, 0, TAU);
      x.fill();
    } else if (t < 4.15) {
      const R = t < 1.9 ? RB * E(sg(t, 1.1, 1.9)) : t < 3.75 ? RB : RB * (1 - E(sg(t, 3.75, 4.1)));
      if (R > 1) {
        x.save();
        x.beginPath();
        x.arc(cx, cy, R, 0, TAU);
        x.clip();
        const g = x.createRadialGradient(cx, cy, R * 0.08, cx, cy, R);
        g.addColorStop(0, '#fff');
        g.addColorStop(0.7, '#e6e6e6');
        g.addColorStop(1, '#8c8c8c');
        x.fillStyle = g;
        x.fillRect(cx - R, cy - R, 2 * R, 2 * R);
        x.strokeStyle = 'rgba(25,25,25,.55)';
        x.lineWidth = Math.max(1, R * 0.012);
        for (let i = 0; i < 7; i++) {
          x.beginPath();
          for (let s = 0; s <= 1.001; s += 0.04) {
            const r = R * (1.02 - 0.84 * s),
              a = (i * TAU) / 7 + t * 0.12 + 1.25 * s;
            x.lineTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r);
          }
          x.stroke();
        }
        const gy = cy + R * 0.5,
          S = R * 1.15;
        if (t < 3.1) {
          const p = E(sg(t, 1.9, 3.1));
          fig(
            cx - R * 1.2 + R * 1.2 * p,
            gy + Math.abs(Math.sin(t * 9)) * -R * 0.012,
            S,
            t * 9,
            false,
            false,
          );
        } else fig(cx, gy, S, 0, true, t > 3.3);
        x.restore();
        x.strokeStyle = '#2a2a2a';
        x.lineWidth = 2;
        x.beginPath();
        x.arc(cx, cy, R + 3, 0, TAU);
        x.stroke();
      }
    }
    x.restore();
    if (t >= 3.5 && t < 3.95) {
      x.fillStyle = 'rgba(255,255,255,' + (t < 3.56 ? 1 : 1 - sg(t, 3.56, 3.95)) + ')';
      x.fillRect(0, 0, W, H);
    }
    if (t >= 3.95) {
      const a = sg(t, 3.95, 4.35) * (1 - sg(t, 4.6, 4.9)),
        fs = Math.min(W * 0.085, 72);
      x.globalAlpha = a;
      x.fillStyle = '#fff';
      x.textAlign = 'center';
      x.textBaseline = 'middle';
      x.font = '900 ' + fs + "px Orbitron,'Arial Black',sans-serif";
      x.letterSpacing = fs * 0.12 + 'px';
      x.fillText('AGENT PINPIN', cx, cy - fs * 0.3);
      x.font = '700 ' + Math.max(11, fs * 0.2) + "px 'Courier New',monospace";
      x.letterSpacing = '4px';
      x.fillText('FULL-STACK DEVELOPER · ACCESS GRANTED', cx, cy + fs * 0.5);
      x.globalAlpha = 1;
    }
    if (t >= 4.6) {
      const p = E(sg(t, 4.6, 5.5)),
        r = p * (Math.hypot(W, H) / 2 + 30);
      x.globalCompositeOperation = 'destination-out';
      x.beginPath();
      x.arc(cx, cy, r, 0, TAU);
      x.fill();
      x.globalCompositeOperation = 'source-over';
      x.strokeStyle = 'rgba(255,255,255,' + (1 - p) + ')';
      x.lineWidth = 2;
      x.beginPath();
      x.arc(cx, cy, r, 0, TAU);
      x.stroke();
    }
  }
  function loop(now) {
    let t = (now - t0) / 1000;
    if (skip && t < 4.6) {
      t0 = now - 4600;
      t = 4.6;
    }
    if (!ready && t > 4.6) {
      t0 = now - 4600;
      t = 4.6;
    }
    if (t >= 4.6 && !freed) {
      freed = true;
      root.classList.remove('ld');
    }
    pt.textContent =
      'LOADING ' +
      String(Math.round(t >= 4.6 ? 100 : Math.min(95, (t / 4.6) * 100))).padStart(3, '0') +
      '%';
    if (t >= 4.6) pt.style.opacity = 0;
    draw(t);
    el.style.background = 'transparent';
    if (t >= 5.5) {
      el.remove();
      return;
    }
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
}
