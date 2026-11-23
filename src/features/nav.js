function initMenu() {
  const n = document.querySelector('nav'),
    b = document.createElement('button');
  b.className = 'bg';
  b.type = 'button';
  b.setAttribute('aria-label', 'Menu');
  b.setAttribute('aria-expanded', 'false');
  b.innerHTML = '<i></i><i></i><i></i>';
  n.prepend(b);
  const set = (o) => {
    n.classList.toggle('open', o);
    b.setAttribute('aria-expanded', o);
  };
  b.onclick = (e) => {
    e.stopPropagation();
    set(!n.classList.contains('open'));
  };
  n.addEventListener('click', (e) => {
    if (e.target.closest('a')) set(false);
  });
  document.addEventListener('click', (e) => {
    if (!n.contains(e.target)) set(false);
  });
  addEventListener('keydown', (e) => {
    if (e.key === 'Escape') set(false);
  });
}

function initScrollSpy() {
  const links = [...document.querySelectorAll('nav a')],
    ids = ['home', 'work', 'about', 'stack', 'contact'];
  function spy() {
    let c = 'home';
    const y = scrollY + innerHeight * 0.4;
    ids.forEach((i) => {
      if (document.getElementById(i).offsetTop <= y) c = i;
    });
    if (scrollY + innerHeight >= document.body.scrollHeight - 4) c = 'contact';
    const a = links.find((l) => l.getAttribute('href') === '#' + c);
    links.forEach((l) => l.classList.toggle('on', l === a));
  }
  addEventListener('scroll', spy, { passive: true });
  spy();
}

export function init() {
  initMenu();
  initScrollSpy();
}
