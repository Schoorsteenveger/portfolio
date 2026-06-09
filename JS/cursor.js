document.addEventListener('DOMContentLoaded', () => {
  const cursorContainer = document.getElementById('cursorFollower');
  if (!cursorContainer) return;

  const isTouchDevice =
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    window.matchMedia('(pointer: coarse)').matches;
  if (isTouchDevice) return;

  let mousePos = { x: -1, y: -1 };
  let rafId = null;
  let lastTimestamp = 0;
  const frameThrottle = 33; // ~30 FPS

  const getRandomInt = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  const createBall = (x, y) => {
    const sizeInt = getRandomInt(5, 15);
    const ball = document.createElement('div');

    ball.className = 'ball';
    ball.style.cssText = `
      left: ${x - sizeInt / 2}px;
      top: ${y - sizeInt / 2}px;
      width: ${sizeInt}px;
      height: ${sizeInt}px;
      background: rgb(${getRandomInt(0, 255)}, ${getRandomInt(0, 255)}, ${getRandomInt(0, 255)});
      pointer-events: none;
    `;

    ball.addEventListener(
      'animationend',
      function () {
        this.remove();
      },
      { once: true },
    );

    cursorContainer.appendChild(ball);
  };

  const animate = (timestamp) => {
    if (
      timestamp - lastTimestamp >= frameThrottle &&
      mousePos.x >= 0 &&
      mousePos.y >= 0
    ) {
      createBall(mousePos.x, mousePos.y);
      lastTimestamp = timestamp;
    }
    rafId = requestAnimationFrame(animate);
  };

  const stopAnimation = () => {
    mousePos.x = -1;
    mousePos.y = -1;
    if (rafId) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
  };

  window.addEventListener('mousemove', (event) => {
    if (event.target.closest('canvas')) return;

    mousePos.x = event.pageX;
    mousePos.y = event.pageY;

    if (!rafId) {
      rafId = requestAnimationFrame(animate);
    }
  });

  window.addEventListener('mouseleave', stopAnimation);
  window.addEventListener('blur', stopAnimation);
});
