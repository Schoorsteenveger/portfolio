document.addEventListener('DOMContentLoaded', () => {
  if (!window.gsap) {
    console.error('GSAP is not defined. Check your script imports.');
    return;
  } else {
    console.log('youre a genius');
  }

  gsap.to('.circle-container', {
    scrollTrigger: {
      trigger: '.section-intro',
      start: 'top center',
      end: 'bottom center',
      scrub: true,
    },
    rotate: 360,
    scale: 1.2,
    duration: 3,
    ease: 'none',
  });

  const details = gsap.utils.toArray(
    '.desktopContentSection:not(:first-child)'
  );
  const photos = gsap.utils.toArray('.desktopPhoto:not(:first-child)');

  gsap.set(photos, { yPercent: 101 });

  const allPhotos = gsap.utils.toArray('.desktopPhoto');

  let matchmedia = gsap.matchMedia();

  matchmedia.add('(min-width: 600px)', () => {
    console.log('desktop');

    ScrollTrigger.create({
      trigger: '.gallery',
      start: 'top top',
      end: 'bottom bottom',
      pin: '.right',
    });

    details.forEach((detail, index) => {
      let headline = detail.querySelector('h1');
      let animation = gsap
        .timeline()
        .to(photos[index], { yPercent: 0 })
        .set(allPhotos[index], { autoAlpha: 0 });
      ScrollTrigger.create({
        trigger: headline,
        start: 'top 80%',
        end: 'top 50%',
        animation: animation,
        scrub: true,
        markers: false,
      });
    });

    return () => {
      console.log('mobile');
    };
  });
});
