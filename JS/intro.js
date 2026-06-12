// Animate intro text elements on scroll without splitting sentences
(function () {
  function initIntroAnimation() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
      console.warn('GSAP or ScrollTrigger not loaded');
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const targets = document.querySelectorAll('.intro-text h3, .intro-text p');

    gsap.set(targets, {
      y: 20,
      opacity: 0,
      backgroundPosition: '0% 0%',
    });

    targets.forEach((target) => {
      gsap.fromTo(
        target,
        { y: 20, opacity: 0, backgroundPosition: '0% 0%' },
        {
          y: 0,
          opacity: 1,
          backgroundPosition: '100% 100%',
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: target,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        },
      );
    });
  }

  document.addEventListener('DOMContentLoaded', initIntroAnimation);
})();
