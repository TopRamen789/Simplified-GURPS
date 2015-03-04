var hexGridObj = [];

var iterator = 0;
$(document).ready(function () {

    var hexSize = 10;
    var canvas = $('#canvas')[0];
    var clearContext = canvas.getContext("2d");

    //var requestAnimationFrame = window.requestAnimationFrame ||
    //                            window.mozRequestAnimationFrame ||
    //                            window.webkitRequestAnimationFrame ||
    //                            window.msRequestAnimationFrame;
    //requestAnimationFrame(drawHexGrid(canvas, hexSize));

    var canvasXSize = canvas.width;
    var canvasYSize = canvas.height;

    hexGridGeneration(canvas, hexSize, canvasXSize, canvasYSize);
    drawHexGrid(canvas, hexSize);

    $(canvas).bind('mousewheel DOMMouseScroll', function (event) {
        event.preventDefault();
        var zoomX = event.pageX - this.offsetLeft;
        var zoomY = event.pageY - this.offsetTop;
        //var extraOffsetX = 1.75;
        //var extraOffsetY = .35;

        if (event.originalEvent.wheelDelta > 0 || event.originalEvent.detail < 0) {
            //Zoom in
            if (hexSize < 120) {
                hexSize += 10;
                //Need to redraw based on center of mouse coordinates
                hexGridGeneration(canvas, hexSize, canvasXSize, canvasYSize);
                drawHexGrid(canvas, hexSize);
            }
        }
        else {
            //Zoom out
            if (hexSize > 10) {
                hexSize -= 10;
                hexGridGeneration(canvas, hexSize, canvasXSize, canvasYSize);
                drawHexGrid(canvas, hexSize);
            }
        }
    });

    $(canvas).click(function (e) {
        var clickedX = e.pageX - this.offsetLeft;
        var clickedY = e.pageY - this.offsetTop;
        var context = canvas.getContext('2d');
        var a = (Math.PI * 2) / 6;

        var extraOffsetX = 1.75;
        var extraOffsetY = .35;

        for (var i = 0; i < hexGridObj.length; i++) {
            if (clickedX < hexGridObj[i].right + (this.offsetLeft * extraOffsetX) && clickedX > hexGridObj[i].left + (this.offsetLeft * extraOffsetX) &&
                clickedY < hexGridObj[i].bottom + (this.offsetTop * extraOffsetY) && clickedY > hexGridObj[i].top + (this.offsetTop * extraOffsetY)) {
                //alert('Coords clicked: ' + hexGridObj[i].xCoordinate + ', ' + hexGridObj[i].yCoordinate);
                var a = (Math.PI * 2) / 6;
                context.beginPath();
                //this might also be good for the conditional statement above..
                context.moveTo(hexGridObj[i].xActualCoordinate, hexGridObj[i].yActualCoordinate);
                context.moveTo(hexSize * Math.cos(a) + hexGridObj[i].xActualCoordinate, hexSize * Math.sin(a) + hexGridObj[i].yActualCoordinate);
                for (var x = 1; x < 8; x++) {
                    context.lineTo(hexSize * Math.cos(a * x) + hexGridObj[i].xActualCoordinate, hexSize * Math.sin(a * x) + hexGridObj[i].yActualCoordinate);
                }

                /*Accidental, but maybe useful one day?
                context.moveTo(hexGridObj[i].xSpacing, hexGridObj[i].ySpacing);
                for (var x = 1; x < 6; x++) {
                    context.lineTo(hexSize * Math.cos(a * i), hexSize * Math.sin(a * i));
                }
                */

                //Makes square selection around hex
                //context.moveTo(hexGridObj[i].right, hexGridObj[i].top);
                //context.lineTo(hexGridObj[i].left, hexGridObj[i].top);
                //context.lineTo(hexGridObj[i].left, hexGridObj[i].bottom);
                //context.lineTo(hexGridObj[i].right, hexGridObj[i].bottom);
                //context.lineTo(hexGridObj[i].right, hexGridObj[i].top);
                context.strokeStyle = "rgba(255, 0, 0, 1)";
                context.stroke();
                context.strokeStyle = "rgba(0, 0, 0, 1)";
            }
        }
    });
});

var drawHexagon = function(context, x, y, radius, startAngle, anticlockwise) {
    var a = (Math.PI * 2) / 6;
    a = anticlockwise ? -a : a;
    context.beginPath();
    context.save();
    context.translate(x, y);
    context.rotate(startAngle);
    context.moveTo(radius, 0);
    for (var i = 1; i < 6; i++) {
        context.lineTo(radius * Math.cos(a * i), radius * Math.sin(a * i));
    }
    context.closePath();
    context.restore();
}

var drawPlainHex = function(context, x, y, radius) {
    drawHexagon(context, x, y, radius);
    context.fillStyle = "rgba(200, 200, 200, 0.50)";
    context.fill();
    context.stroke();
}

function hexGridGeneration(canvas, radius, canvasXSize, canvasYSize) {
    hexGridObj = []; //reset hexGridObj for zoom in/out
    //Might want to keep selected node in a temp variable so I can move the drawing with the grid
    var xSize = canvasXSize / (radius * 2);
    var ySize = canvasYSize / (radius * 2);

    var width = radius * 2;
    var height = Math.sqrt(3) / 2 * width;

    var horizontalSpacing = width * 3 / 4;
    var verticalSpacing = height;

    var yIncrement = radius;
    var xIncrement = radius;

    //For JSON objects
    var i = 0;
    for (var y = 0; y < ySize; y++) {
        for (var x = 0; x < xSize; x++) {
            if (x % 2 == 0) {
                yIncrement += verticalSpacing / 2;
            }
            else {
                yIncrement -= verticalSpacing / 2;
            }
            xIncrement += horizontalSpacing;

            var hex = {};
            //hex.radius = radius;

            hex.left = xIncrement - radius;
            hex.top = yIncrement - radius;
            hex.right = xIncrement + radius;
            hex.bottom = yIncrement + radius;
            
            hex.xActualCoordinate = xIncrement;
            hex.yActualCoordinate = yIncrement;
            hex.xHexCoordinate = x;
            hex.yHexCoordinate = y;

            hexGridObj.push(hex);
        }

        //Since the xSize changes based on radius and the canvas size...
        //we might end up with different numbers of rows, and therefore
        //even or odd numbers of rows.
        //And since we offest with even rows,
        //we need to check for that before we move on to the next iteration of this loop.
        if (x % 2 == 0) {
            yIncrement += verticalSpacing
        }
        else {
            yIncrement += verticalSpacing / 2;
        }

        //Reset xIncrement to 0 for next row.
        xIncrement = radius;

        i++;
    }
}

//Hex x and y spacing needs to change on zoom in/out
function drawHexGrid(canvas, radius) {
    var context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < hexGridObj.length; i++) {
        var context = canvas.getContext("2d");
        drawPlainHex(context, hexGridObj[i].xActualCoordinate, hexGridObj[i].yActualCoordinate, radius);
    }
}