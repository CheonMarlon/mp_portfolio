# Marlon Pinpin — Dev Portfolio

Plain HTML, CSS and ES modules. No build step.

## Run it

ES modules and canvas image drawing don't work from `file://`, so serve the folder:

```bash
npx serve .          # or: python3 -m http.server 8000
```

## Structure

```
index.html                 markup only
assets/images/             images (me.png)
src/
  main.js                  boots every feature, each one isolated
  core/                    tiny shared helpers (dom, safe-run, load-script, scroll-state)
  data/                    content you edit: projects.js, stack.js (world-topology.js is map data)
  features/                one file per behaviour
    loader.js  nav.js  reveal.js  scroll-motion.js  hero-marquee.js
    cursor-scope.js  laptop-tilt.js  stack-explorer.js  footer.js
    projects/              project-list.js, project-modal.js
    about/                 lanyard.js  (3D badge)
    contact/               globe.js, world-texture.js, copy-email.js
  styles/
    base/                  reset, sections, scrollbar, reduced-motion
    layout/                nav, footer
    sections/              hero, projects, about, stack, contact
    components/            project-modal, cursor
    effects/               loader, scroll-motion
```

Stylesheet load order is set in `index.html` and matters (later files can override earlier ones).

## Fault tolerance

- `main.js` imports each feature dynamically inside `safeRun()`. A syntax error, a missing
  element or a failing CDN disables that one feature; everything else keeps running.
- Feature modules have no top-level side effects: they only export `init()`.
- If the intro loader fails, `main.js` removes the overlay. A 15 s inline timer in `index.html`
  does the same if `main.js` itself never loads.
- three.js (globe + badge) loads from a CDN; if it's blocked, only those two scenes are skipped.
- The page content is static HTML, so it still reads with JavaScript off.

## Common edits

- **Add a project:** append an object to `src/data/projects.js` (screenshots go in `shots`).
- **Change the tech stack:** edit `src/data/stack.js`.
- **Add a feature:** create `src/features/my-thing.js` exporting `init()`, then add one line to
  the right list in `src/main.js`.

## Tooling (optional)

```bash
npm install
npm run format   # prettier
npm run lint     # eslint (catches undefined variables)
```
