import { $, RM } from '../../core/dom.js';
import { scrollState } from '../../core/scroll-state.js';
import { worldTexture } from './world-texture.js';

export function init() {
  const cv = $('#gc'),
    host = $('#gv'),
    R = 2;
  let w = host.clientWidth,
    h = host.clientHeight;
  const rd = new THREE.WebGLRenderer({ canvas: cv, alpha: true, antialias: true });
  rd.setPixelRatio(Math.min(devicePixelRatio, 2));
  rd.setSize(w, h, false);
  const sc = new THREE.Scene(),
    cam = new THREE.PerspectiveCamera(35, w / h, 0.1, 100);
  cam.position.z = 7.3;
  const G = new THREE.Group();
  sc.add(G);
  const ll = (la, lo, k = 1) => {
    const p = ((90 - la) * Math.PI) / 180,
      t = ((lo + 180) * Math.PI) / 180;
    return new THREE.Vector3(
      -R * k * Math.sin(p) * Math.cos(t),
      R * k * Math.cos(p),
      R * k * Math.sin(p) * Math.sin(t),
    );
  };
  const tx = new THREE.CanvasTexture(worldTexture(rd.capabilities.maxTextureSize));
  tx.anisotropy = rd.capabilities.getMaxAnisotropy();
  G.add(
    new THREE.Mesh(
      new THREE.SphereGeometry(R * 0.995, 64, 48),
      new THREE.MeshBasicMaterial({ map: tx }),
    ),
  );
  const M = ll(14.5995, 120.9842, 1.003),
    dot = new THREE.Mesh(
      new THREE.SphereGeometry(0.05, 16, 16),
      new THREE.MeshBasicMaterial({ color: 0xffffff }),
    );
  dot.position.copy(M);
  G.add(dot);
  const ring = new THREE.Mesh(
    new THREE.RingGeometry(0.07, 0.085, 48),
    new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, side: THREE.DoubleSide }),
  );
  ring.position.copy(M);
  ring.lookAt(M.clone().multiplyScalar(2));
  G.add(ring);
  const src = [
      [51.5, -0.12],
      [40.7, -74],
      [34, -118.2],
      [-23.5, -46.6],
      [25.2, 55.3],
      [-33.9, 151.2],
      [-26.2, 28],
    ],
    mv = [];
  src.forEach(([la, lo], i) => {
    const A = ll(la, lo, 1.003),
      d = A.distanceTo(M),
      c = A.clone()
        .add(M)
        .multiplyScalar(0.5)
        .normalize()
        .multiplyScalar(R * (1.1 + (0.45 * d) / (2 * R))),
      cv2 = new THREE.QuadraticBezierCurve3(A, c, M);
    G.add(
      new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(cv2.getPoints(64)),
        new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.4 }),
      ),
    );
    const s = new THREE.Mesh(
      new THREE.SphereGeometry(0.028, 12, 12),
      new THREE.MeshBasicMaterial({ color: 0xffffff }),
    );
    s.position.copy(A);
    G.add(s);
    const p = new THREE.Mesh(
      new THREE.SphereGeometry(0.04, 12, 12),
      new THREE.MeshBasicMaterial({ color: 0xffffff }),
    );
    G.add(p);
    mv.push({ c: cv2, p, o: i * 0.14 });
  });
  const q0 = new THREE.Quaternion()
      .setFromAxisAngle(new THREE.Vector3(1, 0, 0), (14.5995 * Math.PI) / 180)
      .multiply(
        new THREE.Quaternion().setFromUnitVectors(
          ll(0, 120.9842).normalize(),
          new THREE.Vector3(0, 0, 1),
        ),
      ),
    qd = new THREE.Quaternion(),
    eu = new THREE.Euler();
  let dx = 0,
    dy = 0,
    drag = false,
    px = 0,
    py = 0,
    vis = true;
  const t0 = performance.now();
  cv.addEventListener('pointerdown', (e) => {
    drag = true;
    px = e.clientX;
    py = e.clientY;
    cv.setPointerCapture(e.pointerId);
    cv.style.cursor = 'grabbing';
  });
  cv.addEventListener('pointermove', (e) => {
    if (!drag) return;
    dy += (e.clientX - px) * 0.006;
    dx = Math.max(-1, Math.min(1, dx + (e.clientY - py) * 0.006));
    px = e.clientX;
    py = e.clientY;
  });
  ['pointerup', 'pointercancel'].forEach((n) =>
    cv.addEventListener(n, () => {
      drag = false;
      cv.style.cursor = 'grab';
    }),
  );
  new IntersectionObserver((e) => (vis = e[0].isIntersecting)).observe(host);
  new ResizeObserver(() => {
    w = host.clientWidth;
    h = host.clientHeight;
    rd.setSize(w, h, false);
    cam.aspect = w / h;
    cam.updateProjectionMatrix();
  }).observe(host);
  function draw(now) {
    const t = (now - t0) / 1000;
    if (!drag) {
      dx *= 0.94;
      dy *= 0.94;
      dy += scrollState.velocity * 0.0006;
    }
    eu.set(dx, dy, 0);
    qd.setFromEuler(eu);
    G.quaternion.copy(qd).multiply(q0);
    const k = (t % 2.2) / 2.2;
    ring.scale.setScalar(1 + k * 3.2);
    ring.material.opacity = 0.8 * (1 - k);
    mv.forEach((m) => m.p.position.copy(m.c.getPoint((t * 0.16 + m.o) % 1)));
    if (vis) rd.render(sc, cam);
    if (!RM) requestAnimationFrame(draw);
  }
  requestAnimationFrame(draw);
}
