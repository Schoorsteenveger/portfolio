/* eslint-disable no-undef */
const navMenu = document.querySelector('.nav-menu');
const hamburger = document.querySelector('.toggleBtn');
const closeIcon = document.querySelector('.closeIcon');
const menuIcon = document.querySelector('.menuIcon');
const navLink = document.querySelectorAll('.nav-link');

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

// GSAP Hero animation
let images = document.querySelector('.images');
const janouImage = images.firstElementChild;
const hertzImage = images.lastElementChild;

let tl = gsap.timeline();

gsap.to('.hero', { opacity: 1 });
gsap.set('.janou', { opacity: 1 });
gsap
  .timeline()
  .from(janouImage, 1.2, { y: '80vh', opacity: 1, ease: 'power3.out' }, 'Start')
  .from(
    janouImage.firstElementChild,
    2,
    { scale: 1.6, ease: 'power3.easeOut' },
    0.2
  )
  .from(hertzImage, 1.4, { x: '80vh', opacity: 1, ease: 'power3.easeOut' }, 0.2)
  .from(
    hertzImage.lastElementChild,
    2,
    { scale: 1.8, ease: 'power3.out' },
    0.2
  );

let content = document.querySelector('.hero-content-inner');

const headlineFirst = content.children[0].children[0];
const headlineSecond = content.children[0].children[1];
const headlineThird = content.children[0].children[2];
const contentP = content.children[1];
const btnRow = content.children[2];

tl.staggerFrom(
  [headlineFirst.children, headlineSecond.children, headlineThird.children],
  1,
  {
    y: 60,
    opacity: 0,
    stagger: 0.3,
    delay: 0.8,
  },
  0.15,
  'Start'
);
tl.from(contentP, 1, { y: 20, opacity: 0, ease: 'Power3.easeOut' }, 1.4);
tl.from(btnRow, 1, { y: 20, opacity: 0, ease: 'Power3.easeOut' }, 1.6);

// // Cursor animation
// const coords = { x: 0, y: 0 };
// const circles = document.querySelectorAll(".circle");

// const cursor = document.querySelector(".cursor");

// circles.forEach(function (circle, index) {
//     circle.x = 0;
//     circle.y = 0;
//     circle.style.backgroundColor = "white";
// });

// window.addEventListener("mousemove", function (e) {
//     coords.x = e.clientX;
//     coords.y = e.clientY;
// });

// function animateCircles() {
//     let x = coords.x;
//     let y = coords.y;

//     cursor.style.top = x;
//     cursor.style.left = y;

//     circles.forEach(function (circle, index) {
//         circle.style.left = x - 12 + "px";
//         circle.style.top = y - 12 + "px";

//         circle.style.scale = (circles.length - index) / circles.length;

//         circle.x = x;
//         circle.y = y;

//         const nextCircle = circles[index + 1] || circles[0];
//         x += (nextCircle.x - x) * 0.6;
//         y += (nextCircle.y - y) * 0.6;
//     });

//     requestAnimationFrame(animateCircles);
// }

// animateCircles();
