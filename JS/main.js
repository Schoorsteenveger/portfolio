document.addEventListener('DOMContentLoaded', () => {
  gsap.registerPlugin(ScrollToPlugin);

  const navMenu = document.querySelector('.nav-menu');
  const hamburger = document.querySelector('.toggleBtn');
  const closeIcon = document.querySelector('.closeIcon');
  const menuIcon = document.querySelector('.menuIcon');
  const navLink = document.querySelectorAll('.nav-link');
  const scrollBtn = document.querySelector('.scroll-btn');
  const nextSection = document.querySelector('#section-intro');

  const toggleMenu = () => {
    if (navMenu.classList.toggle('active')) {
      closeIcon.style.display = 'block';
      menuIcon.style.display = 'none';
    } else {
      closeMenu();
    }
  };
  hamburger.addEventListener('click', toggleMenu);

  const closeMenu = () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    closeIcon.style.display = 'none';
    menuIcon.style.display = 'block';
  };
  navLink.forEach((navLink) => navLink.addEventListener('click', closeMenu));

  const scrollToNextSection = () => {
    gsap.to(window, {
      duration: 1,
      scrollTo: {
        y: nextSection,
        offsetY: 50,
      },
      ease: 'power2',
    });
  };

  scrollBtn.addEventListener('click', (event) => {
    console.log('clicked', event.target);
    event.stopPropagation();
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
      0.2
    )
    .from(
      '.hero__image--2',
      { scale: 0, duration: 1, ease: 'back.out(1.7)' },
      0.1
    );

  // Text animation on scroll

  function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  function showIntroTextOnScroll() {
    const introText = document.getElementById('intro-text');

    window.addEventListener('scroll', function () {
      if (isElementInViewport(introText)) {
        introText.classList.add('visible');

        window.removeEventListener('scroll', showIntroTextOnScroll);
      }
    });
  }

  showIntroTextOnScroll();
});
