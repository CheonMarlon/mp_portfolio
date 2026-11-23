export function init() {
  const io = new IntersectionObserver(
    (e) =>
      e.forEach((x) => x.isIntersecting && (x.target.classList.add('in'), io.unobserve(x.target))),
    { threshold: 0.15 },
  );
  document.querySelectorAll('.rv').forEach((e) => io.observe(e));
  document.querySelectorAll('.rv').forEach((e) => {
    if (e.classList.contains('row')) return;
    const s = [...e.parentElement.children].filter((c) => c.classList.contains('rv'));
    e.style.setProperty('--i', Math.min(3, s.indexOf(e)));
  });
}
