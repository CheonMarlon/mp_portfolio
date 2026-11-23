import { WORLD } from '../../data/world-topology.js';

export function worldTexture(max, t = WORLD) {
  const [sx, sy] = t.transform.scale,
    [tx, ty] = t.transform.translate,
    A = t.arcs.map((a) => {
      let x = 0,
        y = 0;
      return a.map((q) => [(x += q[0]) * sx + tx, (y += q[1]) * sy + ty]);
    }),
    ring = (r) => {
      const o = [];
      r.forEach((i) => {
        const a = i < 0 ? A[~i].slice().reverse() : A[i];
        o.push(...(o.length ? a.slice(1) : a));
      });
      return o;
    },
    W = Math.min(4096, max),
    H = W / 2,
    c = document.createElement('canvas');
  c.width = W;
  c.height = H;
  const x = c.getContext('2d');
  x.fillStyle = '#000';
  x.fillRect(0, 0, W, H);
  x.strokeStyle = 'rgba(255,255,255,.07)';
  x.lineWidth = 1;
  x.beginPath();
  for (let l = -150; l <= 150; l += 30) {
    const X = ((l + 180) / 360) * W;
    x.moveTo(X, 0);
    x.lineTo(X, H);
  }
  for (let l = -60; l <= 60; l += 30) {
    const Y = ((90 - l) / 180) * H;
    x.moveTo(0, Y);
    x.lineTo(W, Y);
  }
  x.stroke();
  const P = (p) => [((p[0] + 180) / 360) * W, ((90 - p[1]) / 180) * H];
  t.objects.countries.geometries.forEach((g) => {
    const pl = g.type === 'Polygon' ? [g.arcs] : g.type === 'MultiPolygon' ? g.arcs : [],
      rs = [];
    pl.forEach((a) => a.forEach((r) => rs.push(ring(r))));
    x.beginPath();
    rs.forEach((r) => {
      r.forEach((p, i) => {
        const [a, b] = P(p);
        i ? x.lineTo(a, b) : x.moveTo(a, b);
      });
      x.closePath();
    });
    const ph = g.properties.name === 'Philippines';
    x.fillStyle = ph ? '#fff' : '#1b1b1b';
    x.fill('evenodd');
    if (g.properties.name === 'Antarctica') return;
    x.strokeStyle = ph ? '#fff' : 'rgba(255,255,255,.55)';
    x.lineWidth = (W / 2048) * 1.2;
    x.beginPath();
    rs.forEach((r) =>
      r.forEach((p, i) => {
        const [a, b] = P(p),
          e = i && Math.abs(p[0]) > 179.9 && Math.abs(r[i - 1][0]) > 179.9;
        i && !e ? x.lineTo(a, b) : x.moveTo(a, b);
      }),
    );
    x.stroke();
  });
  return c;
}
