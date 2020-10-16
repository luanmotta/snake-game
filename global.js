var ctx,
    updateInterval = 100,
    pixel          = 30,
    matrixWidth    = 16,
    matrixHeight   = 16,
    WIDTH          = pixel*matrixWidth,
    HEIGHT         = pixel*matrixHeight,
    margin         = pixel*0.2,
    snake          = {},
    food;


var scoreFormula = () => Math.round( (foodsEaten*500)  / (matrixWidth/4) / (matrixHeight/4) / (updateInterval/50) );
