document.addEventListener('DOMContentLoaded', () => {
  if (typeof gsap === 'undefined' || typeof SplitText === 'undefined') {
    console.error('GSAP or SplitText is not loaded.');
    return;
  }

  const introText = document.querySelector('.intro-text');
  if (!introText) return;

  gsap.registerPlugin(SplitText);

  const splitText = new SplitText(introText, { type: 'words' });
  const words = splitText.words || [];

  if (words.length) {
    gsap.from(words, {
      yPercent: 130,
      duration: 1,
      ease: 'power3.out',
      stagger: 0.05,
    });
  }

  gsap.to(introText, {
    y: 100,
    stagger: {
      each: 0.1,
      from: 'center',
      grid: 'auto',
      ease: 'power2.inOut',
    },
  });

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
      threshold: 0.1,
    },
  );

  observer.observe(introText);
});
