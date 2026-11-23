import { safeRun } from './core/safe-run.js';
import { loadScript } from './core/load-script.js';

const THREE_URL = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';

/**
 * Boot order matters only where one feature needs another's DOM:
 *   1. content   - renders markup into the page
 *   2. behaviour - wires up the markup that now exists
 *   3. 3D scenes - need three.js from the CDN
 * Every feature is imported dynamically and isolated by safeRun, so a syntax
 * error, a missing element or a dead CDN only disables that one feature.
 */
const CONTENT = [
  ['footer', './features/footer.js'],
  ['project-list', './features/projects/project-list.js'],
  ['stack-explorer', './features/stack-explorer.js'],
];

const BEHAVIOUR = [
  ['project-modal', './features/projects/project-modal.js'],
  ['reveal', './features/reveal.js'],
  ['hero-marquee', './features/hero-marquee.js'],
  ['laptop-tilt', './features/laptop-tilt.js'],
  ['cursor-scope', './features/cursor-scope.js'],
  ['copy-email', './features/contact/copy-email.js'],
  ['nav', './features/nav.js'],
  ['scroll-motion', './features/scroll-motion.js'],
];

const SCENES_3D = [
  ['globe', './features/contact/globe.js'],
  ['lanyard', './features/about/lanyard.js'],
];

const runFeature = ([name, path]) =>
  safeRun(name, async () => {
    const feature = await import(path);
    feature.init();
  });

const runAll = (features) => Promise.all(features.map(runFeature));

/** If the intro loader can't run, never leave the visitor stuck behind it. */
function removeLoaderOverlay() {
  document.documentElement.classList.remove('ld');
  document.getElementById('gb')?.remove();
}

async function boot() {
  runFeature(['loader', './features/loader.js']).then((ok) => ok || removeLoaderOverlay());

  await runAll(CONTENT);
  await runAll(BEHAVIOUR);
  await safeRun('three.js', () => loadScript(THREE_URL).then(() => runAll(SCENES_3D)));
}

boot();
