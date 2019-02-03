let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

let score = document.querySelector('p');

function random (min, max) {
  let num = Math.floor(Math.random() * (max - min)) + min;
  return num;
}

class Shape {
  constructor (x, y, velX, velY, exists) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.exists = exists;
  }
}

class Ball extends Shape {
  constructor (x, y, velX, velY, exists, color, size) {
    super(x, y, velX, velY, exists);
    this.color = color;
    this.size = size;
  }
  draw () {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
  }
  update (mod) {
    if ((this.x + this.size) >= width) {
      this.velX = -(this.velX);
    }
    if ((this.x - this.size) <= 0) {
      this.velX = -(this.velX);
    }
    if ((this.y + this.size) >= height) {
      this.velY = -(this.velY);
    }
    if ((this.y - this.size) <= 0) {
      this.velY = -(this.velY);
    }
    this.x += this.velX * mod;
    this.y += this.velY * mod;
  }
  collisionDetect () {
    for (let j = 0; j < balls.length; j++) {
      if (!(this === balls[j])) {
        let dx = this.x - balls[j].x;
        let dy = this.y - balls[j].y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < this.size + balls[j].size) {
          balls[j].color = this.color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) + ')';
        }
      }
    }
  }
}

class Orb extends Shape {
  constructor (x, y, exists) {
    super(x, y, 20, 20, exists);
    this.color = '#1F2522';
    this.size = 10;
    this.keysDown = {};
    this.speed = 1;
  }
  draw () {
    ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 5;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.stroke();
  }
  setControls () {
    let _this = this;
    window.addEventListener('keydown', function (e) {
      _this.keysDown[e.key] = true;
    }, false);
    window.addEventListener('keyup', function (e) {
      delete _this.keysDown[e.key];
    }, false);
  }
  update (mod) {
    if ('w' in this.keysDown) {
      this.y -= this.speed * mod;
      if (this.y <= -this.size) {
        this.y = height + this.size / 2;
      }
    }
    if ('s' in this.keysDown) {
      this.y += this.speed * mod;
      if (this.y >= height + this.size) {
        this.y = -this.size / 2;
      }
    }
    if ('a' in this.keysDown) {
      this.x -= this.speed * mod;
      if (this.x <= -this.size) {
        this.x = width + this.size / 2;
      }
    }
    if ('d' in this.keysDown) {
      this.x += this.speed * mod;
      if (this.x >= width + this.size) {
        this.x = -this.size / 2;
      }
    }
  }
  collisionDetect () {
    for (var j = 0; j < balls.length; j++) {
      if (balls[j].exists) {
        var dx = this.x - balls[j].x;
        var dy = this.y - balls[j].y;
        var distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < this.size + balls[j].size) {
          balls[j].exists = false;
          this.size++;
          count--;
        }
      }
    }
  }
}

let balls = [];
let orb = new Orb(width / 2, height / 2, true);
orb.setControls();
let count = 0;

function main () {
  let now = Date.now();
  let delta = now - then;

  ctx.fillStyle = 'rgba(223, 193, 199, 0.1)';
  ctx.fillRect(0, 0, width, height);

  while (balls.length < 200) {
    let size = random(10, 20);
    let ball = new Ball(
      random(0 + size, width - size),
      random(0 + size, height - size),
      random(-200, 200),
      random(-200, 200),
      true,
      'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) + ')',
      size
    );
    balls.push(ball);
    count++;
  }

  for (let i = 0; i < balls.length; i++) {
    if (balls[i].exists) {
      balls[i].draw();
      balls[i].update(delta / 1000);
      balls[i].collisionDetect();
    }
    orb.draw();
    orb.update(delta / 1000);
    orb.collisionDetect();
  }
  score.textContent = 'ball count: ' + count;
  then = now;
  requestAnimationFrame(main);
}

let then = Date.now();
main();
