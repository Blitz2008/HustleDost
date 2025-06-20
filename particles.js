const canvas = document.getElementById("bgCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
let lines = [];

function initParticles() {
  particles = [];
  for (let i = 0; i < 60; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2 + 1,
      opacity: Math.random(),
      dx: (Math.random() - 0.5) * 0.5,
      dy: (Math.random() - 0.5) * 0.5,
      pulse: Math.random() * 0.05 + 0.01
    });
  }
}

function initLines() {
  lines = [];
  for (let i = 0; i < 12; i++) {
    lines.push({
      y: Math.random() * canvas.height,
      speed: 0.3 + Math.random() * 0.2,
      opacity: 0.05 + Math.random() * 0.1
    });
  }
}

function drawParticles() {
  particles.forEach(p => {
    p.opacity += p.pulse;
    if (p.opacity > 1 || p.opacity < 0.1) p.pulse *= -1;

    p.x += p.dx;
    p.y += p.dy;

    if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.dy *= -1;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
    ctx.fill();
  });
}

function drawLines() {
  lines.forEach(l => {
    l.y += l.speed;
    if (l.y > canvas.height) l.y = 0;

    ctx.beginPath();
    ctx.moveTo(0, l.y);
    ctx.lineTo(canvas.width, l.y);
    ctx.strokeStyle = `rgba(255, 255, 255, ${l.opacity})`;
    ctx.stroke();
  });
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawLines();
  drawParticles();
  requestAnimationFrame(animate);
}

initParticles();
initLines();
animate();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initParticles();
  initLines();
});
