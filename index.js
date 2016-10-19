  var ctx;
  var pixel = 20;
  var WIDTH = pixel*30;
  var HEIGHT = pixel*20;
  var x = WIDTH/2;
  var y = HEIGHT/2;

  function block(x,y,w,h) {
    ctx.beginPath();
    ctx.rect(x,y,w,h);
    ctx.closePath();
    ctx.fillStyle = "purple";
    ctx.fill();
    ctx.stroke();
  }
  
  function arena(x,y,w,h) {
    ctx.beginPath();
    ctx.rect(x,y,w,h);
    ctx.closePath();
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.strokeStyle = "black";
    ctx.stroke();
  }
  
  function clear() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
  }
  
  function init() {
    var canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    canvas.width  = WIDTH;
    canvas.height = HEIGHT;
    return setInterval(draw, 10);
  }
  
  function doKeyDown(evt){
    switch (evt.keyCode) {
      case 38:  /* Up arrow was pressed */
        if (y - pixel >= 0){
          y -= pixel;
        }
        break;
      case 40:  /* Down arrow was pressed */
        if (y + pixel < HEIGHT){
          y += pixel;
        }
        break;
      case 37:  /* Left arrow was pressed */
        if (x - pixel >= 0){
          x -= pixel;
        }            
        break;  
      case 39:  /* Right arrow was pressed */
        if (x + pixel < WIDTH){
          x += pixel;
        }
      }
    }
  
  function draw() {
    clear();
    arena(0,0,WIDTH,HEIGHT);
    block(x, y, pixel, pixel);
  }
  
  init();
  window.addEventListener('keydown', doKeyDown, true);
