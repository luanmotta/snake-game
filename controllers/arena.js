function renderArena() {
  ctx.beginPath();
  ctx.rect(0,0,WIDTH,HEIGHT);
  ctx.closePath();
  ctx.fillStyle = "white";
  ctx.fill();
  ctx.strokeStyle = "black";
  ctx.stroke();
}