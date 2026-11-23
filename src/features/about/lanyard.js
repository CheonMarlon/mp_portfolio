import { $, RM } from '../../core/dom.js';
import { scrollState } from '../../core/scroll-state.js';

export function init() {
  const host = $('#lan');
  if (!host) return;
  const CW = 1.6,
    CH = 2.25,
    A0 = CH / 2 - 0.13,
    N = 8,
    PI = Math.PI,
    cl = (v, a, b) => Math.min(b, Math.max(a, v)),
    FD = "900 {s}px Orbitron,'Arial Black',sans-serif",
    FB = '800 {s}px Manrope,system-ui,sans-serif',
    FM = "700 {s}px 'Courier New',monospace",
    f = (F, s) => F.replace('{s}', s),
    me = $('.me');
  function badge(side, img) {
    const W = 1024,
      H = 1440,
      c = document.createElement('canvas');
    c.width = W;
    c.height = H;
    const x = c.getContext('2d');
    let s = 11;
    const r = () => (s = (s * 16807) % 2147483647) / 2147483647,
      rr = (a, b, w, h, q) => {
        x.beginPath();
        x.roundRect ? x.roundRect(a, b, w, h, q) : x.rect(a, b, w, h);
      },
      T = (t, X, Y, F, z, col, al, ls, mw) => {
        x.font = f(F, z);
        if (mw) {
          const m = x.measureText(t).width;
          if (m > mw) x.font = f(F, Math.floor((z * mw) / m));
        }
        x.fillStyle = col;
        x.textAlign = al || 'left';
        x.letterSpacing = ls || '0px';
        x.fillText(t, X, Y);
      },
      bars = (X, Y, w, h) => {
        x.fillStyle = '#fff';
        for (let a = X; a < X + w;) {
          const q = 2 + Math.floor(r() * 7);
          x.fillRect(a, Y, q, h);
          a += q + 2 + Math.floor(r() * 6);
        }
      };
    const g = x.createLinearGradient(0, 0, 0, H);
    g.addColorStop(0, '#151515');
    g.addColorStop(1, '#050505');
    x.fillStyle = g;
    x.fillRect(0, 0, W, H);
    x.fillStyle = 'rgba(255,255,255,.035)';
    for (let y = 0; y < H; y += 6) x.fillRect(0, y, W, 2);
    x.strokeStyle = '#fff';
    x.lineWidth = 3;
    rr(24, 24, W - 48, H - 48, 52);
    x.stroke();
    if (!side) {
      T('AGENT ID', 112, 205, FD, 40, '#fff', 'left', '8px');
      T('Nº 0001', 912, 205, FM, 30, '#888', 'right', '4px');
      x.save();
      rr(112, 240, 800, 640, 28);
      x.clip();
      const pg = x.createLinearGradient(0, 240, 0, 880);
      pg.addColorStop(0, '#d8d8d8');
      pg.addColorStop(1, '#8a8a8a');
      x.fillStyle = pg;
      x.fillRect(112, 240, 800, 640);
      if (img && img.naturalWidth) {
        const k = 800 / img.naturalWidth,
          sh = Math.min(img.naturalHeight, 640 / k);
        x.drawImage(img, 0, 0, img.naturalWidth, sh, 112, 240, 800, sh * k);
      }
      x.restore();
      x.strokeStyle = '#fff';
      x.lineWidth = 6;
      [
        [112, 240, 1, 1],
        [912, 240, -1, 1],
        [112, 880, 1, -1],
        [912, 880, -1, -1],
      ].forEach(([a, b, u, v]) => {
        x.beginPath();
        x.moveTo(a + u * 70, b);
        x.lineTo(a, b);
        x.lineTo(a, b + v * 70);
        x.stroke();
      });
      rr(140, 826, 190, 42, 21);
      x.fillStyle = '#000';
      x.fill();
      T('● ACTIVE', 162, 856, FM, 22, '#fff');
      T('MARLON', 112, 1030, FD, 150, '#fff', 'left', '0px', 800);
      T('PINPIN', 112, 1165, FD, 150, '#fff', 'left', '0px', 800);
      T('FULL-STACK DEVELOPER', 112, 1225, FB, 34, '#bbb', 'left', '7px');
      bars(112, 1262, 800, 70);
      T('MP-0001 · MANILA, PH · PUBLIC', 112, 1385, FM, 24, '#777', 'left', '3px');
    } else {
      x.fillStyle = '#000';
      x.fillRect(24, 170, W - 48, 110);
      T('FIELD NOTES', 112, 400, FD, 44, '#fff', 'left', '8px');
      T('Curious by nature.', 112, 500, FB, 62, '#fff');
      T('Developer by practice.', 112, 575, FB, 62, '#777');
      T('EQUIPMENT', 112, 690, FM, 26, '#888', 'left', '6px');
      let px = 112,
        py = 725;
      ['React', 'Next.js', 'Node.js', 'TypeScript', 'Supabase', 'Kotlin'].forEach((t) => {
        x.font = f(FB, 30);
        const w = x.measureText(t).width + 44;
        if (px + w > 912) {
          px = 112;
          py += 70;
        }
        x.strokeStyle = '#666';
        x.lineWidth = 2;
        rr(px, py, w, 52, 26);
        x.stroke();
        T(t, px + 22, py + 36, FB, 30, '#fff');
        px += w + 14;
      });
      T('STATUS  ACTIVE · LEARNING IN PUBLIC', 112, 990, FM, 26, '#aaa', 'left', '2px');
      T('BASE    MANILA, PH · 14.60°N 120.98°E', 112, 1030, FM, 26, '#aaa', 'left', '2px');
      x.fillStyle = '#fff';
      rr(112, 1090, 230, 230, 16);
      x.fill();
      x.fillStyle = '#000';
      for (let i = 0; i < 21; i++)
        for (let j = 0; j < 21; j++) if (r() > 0.52) x.fillRect(126 + i * 10, 1104 + j * 10, 9, 9);
      [
        [126, 1104],
        [266, 1104],
        [126, 1244],
      ].forEach(([a, b]) => {
        x.fillStyle = '#fff';
        x.fillRect(a - 3, b - 3, 76, 76);
        x.fillStyle = '#000';
        x.fillRect(a, b, 70, 70);
        x.fillStyle = '#fff';
        x.fillRect(a + 10, b + 10, 50, 50);
        x.fillStyle = '#000';
        x.fillRect(a + 20, b + 20, 30, 30);
      });
      T('IF FOUND, SAY HELLO', 380, 1150, FM, 24, '#888', 'left', '4px');
      T('marlonrimandopinpin@gmail.com', 380, 1200, FM, 27, '#fff', 'left', '0px', 532);
      T('CLASSIFICATION: PUBLIC', 512, 1385, FM, 24, '#666', 'center', '4px');
    }
    return c;
  }
  const fonts = Promise.all(
      ['900 40px Orbitron', '800 40px Manrope'].map((s) => document.fonts.load(s)),
    ).catch(() => {}),
    img =
      me && !me.complete
        ? new Promise((r) => {
            me.onload = r;
            me.onerror = r;
          })
        : Promise.resolve();
  Promise.all([fonts, img]).then(() => {
    let rd;
    try {
      rd = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    } catch {
      const c = badge(0, me);
      c.style.cssText =
        'position:relative;width:min(300px,70%);height:auto;margin:60px auto;display:block';
      host.appendChild(c);
      return;
    }
    rd.setPixelRatio(Math.min(devicePixelRatio, 2));
    rd.outputEncoding = THREE.sRGBEncoding;
    const cv = rd.domElement;
    cv.setAttribute('aria-hidden', 'true');
    host.appendChild(cv);
    const sc = new THREE.Scene(),
      cam = new THREE.PerspectiveCamera(24, 1, 0.1, 100),
      es = new THREE.Scene();
    es.background = new THREE.Color(0.04, 0.04, 0.045);
    [
      [3, [0, 4, 8], [9, 4]],
      [6, [-5.5, 0.5, 7], [0.9, 14]],
      [4, [5, -0.5, 8], [0.6, 14]],
      [1.2, [0, 6, -6], [12, 4]],
    ].forEach(([i, p, z]) => {
      const m = new THREE.Mesh(
        new THREE.PlaneGeometry(1, 1),
        new THREE.MeshBasicMaterial({ color: new THREE.Color(i, i, i), side: THREE.DoubleSide }),
      );
      m.position.set(...p);
      m.scale.set(z[0], z[1], 1);
      m.lookAt(0, 0, 0);
      es.add(m);
    });
    const pm = new THREE.PMREMGenerator(rd);
    sc.environment = pm.fromScene(es, 0.035).texture;
    pm.dispose();
    sc.add(new THREE.AmbientLight(0xffffff, 0.35));
    const dl = new THREE.DirectionalLight(0xffffff, 1.1);
    dl.position.set(-2.5, 4, 6);
    sc.add(dl);
    const tex = (c) => {
        const t = new THREE.CanvasTexture(c);
        t.encoding = THREE.sRGBEncoding;
        t.anisotropy = 8;
        return t;
      },
      RS = (w, h, r, cx = 0, cy = 0) => {
        const s = new THREE.Shape(),
          k = r * 0.4477,
          X = cx - w / 2,
          Y = cy - h / 2;
        s.moveTo(X + r, Y);
        s.lineTo(X + w - r, Y);
        s.bezierCurveTo(X + w - k, Y, X + w, Y + k, X + w, Y + r);
        s.lineTo(X + w, Y + h - r);
        s.bezierCurveTo(X + w, Y + h - k, X + w - k, Y + h, X + w - r, Y + h);
        s.lineTo(X + r, Y + h);
        s.bezierCurveTo(X + k, Y + h, X, Y + h - k, X, Y + h - r);
        s.lineTo(X, Y + r);
        s.bezierCurveTo(X, Y + k, X + k, Y, X + r, Y);
        return s;
      },
      ext = (s, d, b) => {
        const g = new THREE.ExtrudeGeometry(s, {
          depth: d,
          bevelEnabled: true,
          bevelThickness: b,
          bevelSize: b,
          bevelSegments: 4,
          curveSegments: 16,
        });
        g.translate(0, 0, -d / 2);
        return g;
      };
    const B = 0.012,
      shp = RS(CW - 2 * B, CH - 2 * B, 0.2);
    shp.holes.push(RS(0.34 + 2 * B, 0.07 + 2 * B, 0.04, 0, A0));
    const fg = new THREE.ShapeGeometry(shp, 16),
      pos = fg.attributes.position,
      uv = fg.attributes.uv;
    for (let i = 0; i < pos.count; i++)
      uv.setXY(i, (pos.getX(i) + CW / 2) / CW, (pos.getY(i) + CH / 2) / CH);
    const mk = (c) =>
        new THREE.MeshPhysicalMaterial({
          map: tex(c),
          roughness: 0.38,
          clearcoat: 1,
          clearcoatRoughness: 0.08,
          envMapIntensity: 0.4,
        }),
      mt = new THREE.MeshStandardMaterial({
        color: 0xcfd2d8,
        metalness: 1,
        roughness: 0.3,
        envMapIntensity: 0.6,
      }),
      card = new THREE.Group(),
      front = new THREE.Mesh(fg, mk(badge(0, me))),
      back = new THREE.Mesh(fg.clone(), mk(badge(1, me))),
      clip = new THREE.Mesh(ext(RS(0.34, 0.17, 0.035), 0.03, 0.012), mt),
      ring = new THREE.Mesh(new THREE.TorusGeometry(0.085, 0.013, 14, 40), mt);
    card.rotation.order = 'ZYX';
    front.position.z = 0.0226;
    back.position.z = -0.0226;
    back.rotation.y = PI;
    clip.position.set(0, A0 + 0.19, 0);
    ring.position.set(0, A0 + 0.02, 0);
    ring.rotation.y = PI / 2 - 0.7;
    card.add(
      new THREE.Mesh(
        ext(shp, 0.02, B),
        new THREE.MeshStandardMaterial({ color: 0x151515, roughness: 0.4, metalness: 0.3 }),
      ),
      front,
      back,
      clip,
      ring,
    );
    sc.add(card);
    const sq = document.createElement('canvas');
    sq.width = 128;
    sq.height = 512;
    const q = sq.getContext('2d');
    q.fillStyle = '#0c0c0c';
    q.fillRect(0, 0, 128, 512);
    q.fillStyle = '#fff';
    q.fillRect(8, 0, 2, 512);
    q.fillRect(118, 0, 2, 512);
    q.translate(64, 256);
    q.rotate(-PI / 2);
    q.font = f(FD, 32);
    q.textAlign = 'center';
    q.textBaseline = 'middle';
    q.fillText('AGENT ✳ PINPIN ✳', 0, 0);
    const st = tex(sq);
    st.wrapT = THREE.RepeatWrapping;
    const SS = 36,
      sg = new THREE.BufferGeometry(),
      sp = new Float32Array(SS * 6),
      su = new Float32Array(SS * 4),
      si = [];
    for (let i = 0; i < SS - 1; i++) {
      const a = i * 2;
      si.push(a, a + 1, a + 2, a + 1, a + 3, a + 2);
    }
    sg.setAttribute('position', new THREE.BufferAttribute(sp, 3));
    sg.setAttribute('uv', new THREE.BufferAttribute(su, 2));
    sg.setIndex(si);
    const strap = new THREE.Mesh(
      sg,
      new THREE.MeshBasicMaterial({ map: st, side: THREE.DoubleSide }),
    );
    strap.frustumCulled = false;
    sc.add(strap);
    const P = Array.from({ length: N + 1 }, () => new THREE.Vector3()),
      Pv = P.map(() => new THREE.Vector3()),
      SP = P.map(() => new THREE.Vector3()),
      cur = new THREE.CatmullRomCurve3(SP, false, 'centripetal'),
      wt = P.map((_, i) => (i ? (i === N ? 0.4 : 1) : 0));
    let seg = 0.3,
      AY = 2,
      rep = 3,
      BX = 1,
      YMIN = -2,
      grab = null,
      press = null,
      ry = 0,
      ryT = 0,
      ryv = 0,
      first = true;
    function layout() {
      const w = host.clientWidth,
        h = host.clientHeight;
      if (!w || !h || grab) return;
      rd.setSize(w, h, false);
      cam.aspect = w / h;
      const cs = w > 600 ? 0.46 : 0.52,
        vh = Math.max(CH / cs, CW / 0.62 / (w / h));
      BX = Math.max(0.1, (vh * (w / h)) / 2 - 0.85);
      YMIN = -vh / 2 + CH - 0.03;
      cam.position.z = vh / 2 / Math.tan((24 * PI) / 360);
      cam.updateProjectionMatrix();
      AY = vh / 2 + 0.3;
      const L = AY - (vh / 2 - vh * 0.3);
      seg = L / N;
      rep = L / 1.2;
      const sw = first && !RM ? 0.75 : 0;
      first = false;
      for (let i = 0; i <= N; i++) {
        P[i].set(Math.sin(sw) * seg * i, AY - Math.cos(sw) * seg * i, 0);
        Pv[i].copy(P[i]);
      }
    }
    function bound() {
      const e = P[N];
      if (e.x > BX || e.x < -BX) {
        const c = cl(e.x, -BX, BX),
          v = e.x - Pv[N].x;
        e.x = c;
        Pv[N].x = c + 0.3 * v;
      }
      if (e.y < YMIN) {
        const v = e.y - Pv[N].y;
        e.y = YMIN;
        Pv[N].y = YMIN + 0.3 * v;
      }
    }
    function step(dt) {
      for (let i = 1; i <= N; i++) {
        if (i === N && grab) continue;
        const v = P[i].clone().sub(Pv[i]).multiplyScalar(0.996);
        v.clampLength(0, 0.3);
        Pv[i].copy(P[i]);
        P[i].add(v);
        P[i].y -= 30 * dt * dt;
        P[i].x += scrollState.velocity * dt * dt * 3;
      }
      if (grab) {
        Pv[N].copy(P[N]);
        P[N].lerp(grab.t, 0.35);
      }
      for (let k = 0; k < 14; k++)
        for (let i = 0; i < N; i++) {
          const a = P[i],
            b = P[i + 1],
            wa = wt[i],
            wb = i + 1 === N && grab ? 0 : wt[i + 1],
            s = wa + wb;
          if (!s) continue;
          const d = b.clone().sub(a),
            l = d.length() || 1e-6,
            df = (l - seg) / l;
          a.addScaledVector(d, (df * wa) / s);
          b.addScaledVector(d, (-df * wb) / s);
        }
      bound();
    }
    function pose(dt) {
      const d = P[N].clone()
        .sub(P[N - 1])
        .normalize();
      card.position.copy(P[N]).addScaledVector(d, A0);
      card.rotation.z = Math.atan2(d.x, -d.y);
      ryv += (60 * (ryT - ry) - 8 * ryv) * dt;
      ry += ryv * dt;
      card.rotation.y = ry + cl((P[N].x - Pv[N].x) * 5, -0.35, 0.35);
      SP.forEach((v, i) => v.copy(P[i]));
      SP[N].addScaledVector(d, -0.19);
      const pts = cur.getPoints(SS - 1);
      for (let i = 0; i < SS; i++) {
        const a = pts[Math.max(0, i - 1)],
          b = pts[Math.min(SS - 1, i + 1)],
          tx = b.x - a.x,
          ty = b.y - a.y,
          l = Math.hypot(tx, ty) || 1,
          nx = (-ty / l) * 0.15,
          ny = (tx / l) * 0.15,
          p = pts[i],
          v = (i / (SS - 1)) * rep;
        {
          const th = card.rotation.y * Math.pow(i / (SS - 1), 1.4),
            c = Math.cos(th),
            z = Math.sin(th) * 0.15;
          sp.set([p.x + nx * c, p.y + ny * c, z, p.x - nx * c, p.y - ny * c, -z], i * 6);
        }
        su.set([0, v, 1, v], i * 4);
      }
      sg.attributes.position.needsUpdate = true;
      sg.attributes.uv.needsUpdate = true;
    }
    const rc = new THREE.Raycaster(),
      nd = new THREE.Vector2(),
      pl = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0),
      hit = new THREE.Vector3(),
      ray = (e) => {
        const b = cv.getBoundingClientRect();
        nd.set(((e.clientX - b.left) / b.width) * 2 - 1, -((e.clientY - b.top) / b.height) * 2 + 1);
        rc.setFromCamera(nd, cam);
        card.updateMatrixWorld();
        return rc.ray.intersectPlane(pl, hit);
      },
      over = () => rc.intersectObject(card, true).length > 0;
    cv.onpointerdown = (e) => {
      if (e.button > 0) return;
      ray(e);
      if (!over()) return;
      grab = { o: P[N].clone().sub(hit), t: P[N].clone() };
      press = { x: e.clientX, y: e.clientY, t: performance.now() };
      cv.setPointerCapture(e.pointerId);
      cv.style.cursor = 'grabbing';
      e.preventDefault();
    };
    cv.onpointermove = (e) => {
      if (grab) {
        if (press && Math.hypot(e.clientX - press.x, e.clientY - press.y) > 8) press = null;
        if (ray(e)) grab.t.copy(hit).add(grab.o);
        grab.t.x = cl(grab.t.x, -BX, BX);
        grab.t.y = Math.max(grab.t.y, YMIN);
      } else if (e.pointerType === 'mouse') {
        ray(e);
        cv.style.cursor = over() ? 'grab' : '';
      }
    };
    cv.onpointerup = cv.onpointercancel = (e) => {
      if (!grab) return;
      grab = null;
      if (press && e.type === 'pointerup' && performance.now() - press.t < 400)
        ryT = ryT > 1 ? 0 : PI;
      press = null;
      cv.style.cursor = '';
    };
    cv.addEventListener(
      'touchstart',
      (e) => {
        if (e.touches.length === 1) {
          ray(e.touches[0]);
          if (over()) e.preventDefault();
        }
      },
      { passive: false },
    );
    let vis = true,
      raf = 0,
      last = 0,
      acc = 0;
    function tick(now) {
      raf = 0;
      if (!vis) return;
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      acc += dt;
      while (acc >= 1 / 120) {
        step(1 / 120);
        acc -= 1 / 120;
      }
      pose(dt);
      rd.render(sc, cam);
      raf = requestAnimationFrame(tick);
    }
    new IntersectionObserver((e) => {
      vis = e[0].isIntersecting;
      if (vis && !raf) {
        last = performance.now();
        raf = requestAnimationFrame(tick);
      }
    }).observe(host);
    new ResizeObserver(layout).observe(host);
    layout();
  });
}
