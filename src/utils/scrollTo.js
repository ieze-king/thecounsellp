export function smoothScrollTo(hash) {
  const target = document.querySelector(hash);
  if (!target) return;
  const top = target.getBoundingClientRect().top + window.pageYOffset - 80;
  window.scrollTo({ top, behavior: 'smooth' });
}
