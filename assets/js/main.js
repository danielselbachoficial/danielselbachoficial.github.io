(() => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) return;

  // ----------------------------
  // 1) Hero intro (WAAPI)
  // ----------------------------
  const heroIntro = () => {
    const sequence = [
      [document.querySelector(".logo"), 0],
      [document.querySelectorAll(".nav-links li"), 60],
      [document.querySelector(".hero-profile-image img"), 120],
      [document.querySelector(".hero-title"), 180],
      [document.querySelector(".hero-subtitle"), 240],
      [document.querySelector(".hero-description"), 300],
      [document.querySelectorAll(".hero-cta .btn"), 360],
    ];

    const animateEl = (el, delay = 0) => {
      if (!el) return;
      el.animate(
        [
          { opacity: 0, transform: "translateY(12px)" },
          { opacity: 1, transform: "translateY(0)" },
        ],
        { duration: 520, easing: "cubic-bezier(.2,.8,.2,1)", delay, fill: "both" }
      );
    };

    sequence.forEach(([target, baseDelay]) => {
      if (!target) return;
      if (target instanceof NodeList || Array.isArray(target)) {
        [...target].forEach((el, i) => animateEl(el, baseDelay + i * 70));
      } else {
        animateEl(target, baseDelay);
      }
    });
  };

  // ----------------------------
  // 2) Scroll reveal (IntersectionObserver)
  // ----------------------------
  const setupScrollReveal = () => {
    const targets = [
      ...document.querySelectorAll(".section-title, .section-subtitle"),
      ...document.querySelectorAll(".sobre-content p"),
      ...document.querySelectorAll(".cert-category"),
      ...document.querySelectorAll("#projetos p"),
      ...document.querySelectorAll(".contact-card"),
    ];

    // aplica classe base + stagger leve
    targets.forEach((el, i) => {
      el.classList.add("reveal");
      el.style.transitionDelay = `${Math.min(i * 40, 220)}ms`;
    });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -10% 0px" }
    );

    targets.forEach((el) => io.observe(el));
  };

  // ----------------------------
  // 3) Micro-interação: tilt sutil na foto (opcional, leve)
  // ----------------------------
  const subtleTilt = () => {
    const img = document.querySelector(".hero-profile-image img");
    if (!img) return;

    const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

    const onMove = (ev) => {
      const r = img.getBoundingClientRect();
      const x = (ev.clientX - r.left) / r.width - 0.5;
      const y = (ev.clientY - r.top) / r.height - 0.5;

      const rx = clamp(-y * 6, -6, 6);
      const ry = clamp(x * 6, -6, 6);

      img.style.transform = `perspective(700px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.01)`;
    };

    const reset = () => (img.style.transform = "");

    img.addEventListener("mousemove", onMove);
    img.addEventListener("mouseleave", reset);
    img.addEventListener("touchstart", reset, { passive: true });
  };

  // init
  heroIntro();
  setupScrollReveal();
  subtleTilt();
})();
