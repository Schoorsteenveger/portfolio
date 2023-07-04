window.addEventListener('load', () => {
  const canvas = document.querySelector('canvas');
  const container = document.getElementById('container-intro');
  const ctx = canvas.getContext('2d');
  let containerWidth = container.offsetWidth;
  let containerHeight = container.offsetHeight;

  canvas.width = containerWidth;
  canvas.height = containerHeight;

  ctx.strokeStyle = '#ffffa2';
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';
  ctx.lineWidth = 100;

  let isDrawing = false;
  let lastX = 0;
  let lastY = 0;
  let hue = 0;

  function draw(x, y) {
    ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
    ctx.beginPath();
    ctx.closePath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(x, y);
    ctx.stroke();
    lastX = x;
    lastY = y;

    hue++;
    if (hue >= 360) {
      hue = 0;
    }
  }

  function clearCanvas() {
    setTimeout(function () {
      ctx.clearRect(0, 0, containerWidth, containerHeight);
    }, 2000);
  }

  window.addEventListener('resize', () => {
    setTimeout(() => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }, 100); // Delay clearing the canvas for 100 milliseconds
  });

  canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
  });

  canvas.addEventListener('mousemove', (e) => {
    if (isDrawing) {
      draw(e.offsetX, e.offsetY);
    }
  });

  canvas.addEventListener('mouseup', () => {
    isDrawing = false;
    clearCanvas();
  });

  canvas.addEventListener('mouseout', () => {
    isDrawing = false;
    clearCanvas();
  });

  // Prevent touch events from scrolling on devices with innerWidth smaller than 768px
  canvas.addEventListener(
    'touchstart',
    (e) => {
      if (container.offsetWidth < 768) {
        e.preventDefault();
      }
      isDrawing = true;
      [lastX, lastY] = [e.touches[0].clientX, e.touches[0].clientY];
      draw(lastX, lastY); // Call draw initially when touch starts
    },
    false
  );

  canvas.addEventListener('touchmove', (e) => {
    if (container.offsetWidth <= 768) {
      // e.preventDefault();
    }
    [lastX, lastY] = [e.touches[0].clientX, e.touches[0].clientY];
    draw(lastX, lastY);
  });

  canvas.addEventListener('touchend', (e) => {
    if (container.offsetWidth <= 768) {
      // e.preventDefault();
    }
    isDrawing = false;
    clearCanvas();
  });
});
