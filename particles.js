const canvas = document.getElementById("bgCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];
const numParticles = 100;

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 1;
    this.speedX = (Math.random() - 0.5) * 0.5;
    this.speedY = (Math.random() - 0.5) * 0.5;
    this.opacity = Math.random();
    this.fade = Math.random() > 0.5 ? 0.005 : -0.005;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.opacity += this.fade;

    if (this.opacity <= 0 || this.opacity >= 1) {
      this.fade = -this.fade;
    }

    if (this.x < 0 || this.x > canvas.width) this.speedX = -this.speedX;
    if (this.y < 0 || this.y > canvas.height) this.speedY = -this.speedY;
  }

  draw() {
    ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function init() {
  particlesArray = [];
  for (let i = 0; i < numParticles; i++) {
    particlesArray.push(new Particle());
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let particle of particlesArray) {
    particle.update();
    particle.draw();
  }

  requestAnimationFrame(animate);
}

init();
animate();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init();
});
