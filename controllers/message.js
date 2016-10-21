function message(content, color) {
  ctx.fillStyle = color;
  ctx.font = "24px Helvetica";
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.fillText(content, 32, 32);
}