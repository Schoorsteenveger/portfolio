window.addEventListener('load', () => {
  const canvas = document.querySelector('canvas');
  const container = document.getElementById('container-intro');
  const ctx = canvas.getContext('2d');
  let containerWidth = container.offsetWidth;
  let containerHeight = container.offsetHeight;

  canvas.width = containerWidth;
  canvas.height = containerHeight;

  // Calculate canvas position
  const canvasRect = canvas.getBoundingClientRect();
  const offsetX = canvasRect.left;
  const offsetY = canvasRect.top;

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
    setTimeout(function () {
      ctx.clearRect(0, 0, containerWidth, containerHeight);
    }, 2000);
  }

  window.addEventListener('resize', () => {
    setTimeout(() => {
      clearCanvas();
    }, 100); // Delay clearing the canvas for 100 milliseconds
  });

  canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    [lastX, lastY] = [e.pageX - offsetX, e.clientY - offsetY];
  });

  canvas.addEventListener('mousemove', (e) => {
    if (isDrawing) {
      draw(e.pageX - offsetX, e.clientY - offsetY);
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

  canvas.addEventListener('touchstart', function (e) {
    console.log('touchstart');
    isDrawing = true;
    const touchX = e.changedTouches[0].pageX - offsetX;
    const touchY = e.changedTouches[0].pageY - offsetY;
    draw(touchX, touchY);
  });

  canvas.addEventListener('touchmove', function (e) {
    e.preventDefault();
    if (isDrawing) {
      const touchX = e.changedTouches[0].pageX - offsetX;
      const touchY = e.changedTouches[0].pageY - offsetY;
      draw(touchX, touchY);
      console.log(touchX, touchY, 'touchmove, touchX, touchY');
      console.log(isDrawing, 'isDrawing');
    }
  });

  canvas.addEventListener('touchend', function (e) {
    isDrawing = false;
    clearCanvas();
  });
});
