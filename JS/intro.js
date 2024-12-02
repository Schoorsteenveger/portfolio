document.addEventListener('DOMContentLoaded', () => {
  gsap.registerPlugin(SplitText);

  const introText = document.getElementById('intro-text');

  let split = new SplitText('.intro-text', { type: 'words' });
  let words = mySplitText.words;

  gsap.from(words, {
    yPercent: 130,
  });

  gsap.to('.introtext', {
    y: 100,
    stagger: {
      each: 0.1,
      from: 'center',
      grid: 'auto',
      ease: 'power2.inOut',
    },
  });

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        // Log when the observer is triggered
        console.log('Observer triggered:', entry.target);

        if (entry.isIntersecting) {
          // Log when the 'visible' class is added
          console.log("Element is visible. Adding 'visible' class.");
          entry.target.classList.add('visible');
          // Optionally, unobserve the element after adding the class
          observer.unobserve(entry.target);
        } else {
          // Log if the element is not in the viewport
          console.log('Element is not in the viewport.');
        }
      });
    },
    {
      root: null, // Use the viewport as the root
      threshold: 0.1, // Trigger when at least 10% of the element is visible
    }
  );

  // Start observing the intro text element
  observer.observe(introText);
});
