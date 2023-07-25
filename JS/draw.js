window.addEventListener('DOMContentLoaded', () => {
  const canvas = document.querySelector('canvas');
  const container = document.getElementById('container-intro');
  const ctx = canvas.getContext('2d');
  let containerWidth = container.offsetWidth;
  let containerHeight = container.offsetHeight;
  let offsetX = 0;
  let offsetY = 0;

  // Calculate canvas position

  function updateCanvasRect() {
    const canvasRect = canvas.getBoundingClientRect();
    offsetX = canvasRect.left;
    offsetY = canvasRect.top;
  }

  // Initial canvas size update

  updateCanvasRect();

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
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.closePath();
    lastX = x;
    lastY = y;

    hue++;
    if (hue >= 360) {
      hue = 0;
    }
  }

  function clearCanvas() {
    ctx.clearRect(0, 0, container.offsetWidth, container.offsetHeight);
  }

  window.addEventListener('resize', () => {
    clearCanvas();
    updateCanvasRect();
  });

  canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    updateCanvasRect();
    [lastX, lastY] = [e.pageX - offsetX, e.clientY - offsetY];
    draw(e.pageX - offsetX, e.clientY - offsetY);
  });

  canvas.addEventListener('mousemove', (e) => {
    if (isDrawing) {
      draw(e.pageX - offsetX, e.clientY - offsetY);
    }
  });

  canvas.addEventListener('mouseup', () => {
    isDrawing = false;
  });

  canvas.addEventListener('mouseout', () => {
    isDrawing = false;
    clearCanvas();
  });

  // Prevent touch events from scrolling on devices with innerWidth smaller than 768px
  canvas.addEventListener('touchstart', function (e) {
    e.preventDefault();
    isDrawing = true;
    updateCanvasRect();
    const touchX = e.touches[0].clientX - offsetX;
    const touchY = e.touches[0].clientY - offsetY;
    draw(touchX, touchY);
  });

  canvas.addEventListener('touchmove', function (e) {
    e.preventDefault();
    if (isDrawing) {
      updateCanvasRect();
      const touchX = e.touches[0].clientX - offsetX;
      const touchY = e.touches[0].clientY - offsetY;
      draw(touchX, touchY);
    }
  });

  canvas.addEventListener('touchend', function (e) {
    isDrawing = false;
  });
});
