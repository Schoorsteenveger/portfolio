document.addEventListener('DOMContentLoaded', () => {
  if (
    typeof gsap === 'undefined' ||
    typeof ScrollToPlugin === 'undefined' ||
    typeof ScrollTrigger === 'undefined'
  ) {
    console.error('GSAP, ScrollToPlugin, or ScrollTrigger is not loaded.');
    return;
  }

  gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

  const navMenu = document.querySelector('.nav-menu');
  const hamburger = document.querySelector('.toggleBtn');
  const closeIcon = document.querySelector('.closeIcon');
  const menuIcon = document.querySelector('.menuIcon');
  const navLinks = document.querySelectorAll('.nav-link');
  const scrollBtn = document.querySelector('.scroll-btn');
  const nextSection = document.querySelector('#section-intro');

  const closeMenu = () => {
    hamburger?.classList.remove('active');
    navMenu?.classList.remove('active');
    if (closeIcon) closeIcon.style.display = 'none';
    if (menuIcon) menuIcon.style.display = 'block';
  };

  const toggleMenu = () => {
    if (!navMenu || !hamburger) return;

    const isActive = navMenu.classList.toggle('active');
    hamburger.classList.toggle('active', isActive);

    if (isActive) {
      if (closeIcon) closeIcon.style.display = 'block';
      if (menuIcon) menuIcon.style.display = 'none';
    } else {
      closeMenu();
    }
  };

  hamburger?.addEventListener('click', toggleMenu);
  navLinks.forEach((link) => link.addEventListener('click', closeMenu));

  const scrollToNextSection = () => {
    if (!nextSection) return;

    gsap.to(window, {
      duration: 1,
      scrollTo: {
        y: nextSection,
        offsetY: 50,
      },
      ease: 'power2',
    });
  };

  const circleContainer = document.querySelector('.circle-container');
  if (circleContainer) {
    gsap.fromTo(
      circleContainer,
      { y: 0, x: 0, rotate: 0, scale: 1 },
      {
        y: -120,
        x: 30,
        rotate: 360,
        scale: 1.15,
        ease: 'none',
        scrollTrigger: {
          trigger: '.section-paintme',
          start: 'top center',
          end: 'bottom center',
          scrub: true,
        },
      },
    );
  }

  scrollBtn?.addEventListener('click', (event) => {
    event.preventDefault();
    scrollToNextSection();
  });

  gsap.from('.hero__content h1 span', {
    y: 60,
    opacity: 0,
    duration: 1,
    stagger: 0.4,
    ease: 'power3.out',
  });

  gsap
    .timeline()
    .from('.background-square', {
      scale: 0,
      duration: 1,
      ease: 'back.out(1.7)',
    })
    .from(
      '.hero__image--1',
      { scale: 0, duration: 1, ease: 'back.out(1.7)' },
      0.2,
    )
    .from(
      '.hero__image--2',
      { scale: 0, duration: 1, ease: 'back.out(1.7)' },
      0.1,
    );

  const introText = document.getElementById('intro-text');
  if (introText) {
    const observer = new IntersectionObserver(
      (entries, observerInstance) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observerInstance.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        threshold: 0.25,
      },
    );

    observer.observe(introText);
  }
});
