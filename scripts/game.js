var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
const WIDTH = 512;
const HEIGHT = 480;
canvas.width = WIDTH;
canvas.height = HEIGHT;

var player = {
  speed: 256,
  height: 8,
  width: 8,
  x: canvas.width / 2,
  y: canvas.height / 2
};

// kb controls
var keysDown = {};

addEventListener("keydown", function(e) {
  keysDown[e.key] = true;
}, false);

addEventListener("keyup", function(e) {
  delete keysDown[e.key];
}, false);

// update
function update(mod) {
  if ("ArrowUp" in keysDown) { // up
    player.y -= player.speed * mod;
    if (player.y <= -player.height) {
      player.y = canvas.height - player.height/2;
    }
  }
  if ("ArrowDown" in keysDown) { // down
    player.y += player.speed * mod;
    if (player.y >= canvas.height + player.height) {
      player.y = -player.height/2;
    }
  }
  if ("ArrowLeft" in keysDown) { // left
    player.x -= player.speed * mod;
    if (player.x <= -player.width) {
      player.x = canvas.width - player.width/2;
    }
  }
  if ("ArrowRight" in keysDown) { // right
    player.x += player.speed * mod;
    if (player.x >= canvas.width + player.width) {
      player.x = -player.width/2;
    }
  }
}

function render() {
  ctx.fillStyle = "#98C6C3";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#EEE8AA";
  ctx.fillRect(player.x, player.y, player.height, player.width);
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
