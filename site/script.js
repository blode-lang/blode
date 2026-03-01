'use strict';

const observer = new IntersectionObserver(
  entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } }),
  { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
);
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', e => {
    const r = btn.getBoundingClientRect();
    const dot = document.createElement('span');
    dot.style.cssText = `position:absolute;width:6px;height:6px;border-radius:50%;background:rgba(255,255,255,0.3);left:${e.clientX-r.left}px;top:${e.clientY-r.top}px;transform:translate(-50%,-50%) scale(0);animation:rpl .5s ease forwards;pointer-events:none`;
    btn.appendChild(dot);
    setTimeout(() => dot.remove(), 500);
  });
});

const s = document.createElement('style');
s.textContent = '@keyframes rpl{to{transform:translate(-50%,-50%) scale(18);opacity:0}}';
document.head.appendChild(s);
