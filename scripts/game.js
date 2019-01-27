var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
const WIDTH = 512;
const HEIGHT = 480;
canvas.width = WIDTH;
canvas.height = HEIGHT;

var player = {
  speed: 256,
  x: canvas.width / 2,
  y: canvas.height / 2
};

// kb controls
var keysDown = {};

addEventListener("keydown", function(e) {
  keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function(e) {
  delete keysDown[e.keyCode];
}, false);

// update
function update(mod) {
  if (38 in keysDown) { // up
    player.y -= player.speed * mod;
  }
  if (40 in keysDown) { // down
    player.y += player.speed * mod;
  }
  if (37 in keysDown) { // left
    player.x -= player.speed * mod;
  }
  if (39 in keysDown) { // right
    player.x += player.speed * mod;
  }
}

function render() {
  ctx.fillStyle = "#98C6C3";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#EEE8AA";
  ctx.fillRect(player.x, player.y, 10, 10);
}

function main() {
  var now = Date.now();
  var delta = now - then;

  update(delta / 1000);
  render();

  then = now;

  requestAnimationFrame(main);
}

var then = Date.now();
main();
