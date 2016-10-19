function doKeyDown(pixel, h, w, evt){
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