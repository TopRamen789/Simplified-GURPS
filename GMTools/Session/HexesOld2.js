var hexGridObj = [];
var hex = {};
var savedHex = {};
var hoverHex = {};

var iterator = 0;

$(document).ready(function () {

    var hexSize = 120;
    var canvas = $('#HexCanvas')[0];
    var clearContext = canvas.getContext("2d");
    var canvasXSize = canvas.width;
    var canvasYSize = canvas.height;

    hexGridGeneration(canvas, hexSize, canvasXSize, canvasYSize);
    //drawHexGrid(canvas, hexSize);
});

var drawHexagon = function (context, x, y, radius, startAngle, anticlockwise) {
    var a = (Math.PI * 2) / 6;

    hex.xCoords = [];
    hex.yCoords = [];

    a = anticlockwise ? -a : a;
    context.beginPath();
    context.save();
    context.translate(x, y);
    context.rotate(startAngle);
    context.moveTo(radius, 0);
    context.fillStyle = "rgba(220, 220, 220, 1)";
    for (var i = 1; i < 6; i++) {
        context.lineTo(radius * Math.cos(a * i), radius * Math.sin(a * i));

         var xCoord = radius * Math.cos(a * i);
         var yCoord = radius * Math.sin(a * i);
         hex.xCoords.push(xCoord);
         hex.yCoords.push(yCoord);
    }

    context.closePath();
    context.restore();

    //hexGridObj.push(hex);
}

var drawPlainHex = function (context, x, y, radius) {
    drawHexagon(context, x, y, radius);
    context.fillStyle = "rgba(220, 220, 220, 1)";
    context.fill();
    context.stroke();
}

function hexGridGeneration(canvas, radius, canvasXSize, canvasYSize) {
    hexGridObj = [];
    var context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);

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

            hex.xCenter = xIncrement;
            hex.yCenter = yIncrement;
            hex.xHexCoordinate = x;
            hex.yHexCoordinate = y;
            hex.hover = false;

            drawPlainHex(context, xIncrement, yIncrement, radius);

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

//Needs to transition hex grid instead of redraw?
function drawHexGrid(canvas, radius) {
    var a = (Math.PI * 2) / 6;
    var context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < hexGridObj.length; i++) {
        //drawPlainHex(context, hexGridObj[i].xActualCoordinate, hexGridObj[i].yActualCoordinate, radius);
        drawPlainHex(context, getXActualCoord(i), getYActualCoord(i), radius);
        if (savedHex.xCoordinate == getXHexCoord(i) && savedHex.yCoordinate == getYHexCoord(i)) {
            context.beginPath();
            context.moveTo(radius * Math.cos(a) + getXActualCoord(i), radius * Math.sin(a) + getYActualCoord(i));
            for (var x = 1; x < 8; x++) {
                context.lineTo((radius + 1) * Math.cos(a * x) + getXActualCoord(i), (radius + 1) * Math.sin(a * x) + getYActualCoord(i));
            }

            context.strokeStyle = "rgba(255, 0, 0, 1)";
            context.stroke();
            context.strokeStyle = "rgba(0, 0, 0, 1)";
        }
    }
}

function getRelativePosition() {
    var x = 0, y = 0;
    var layoutElement = $('#HexCanvas')[0];
    if (layoutElement.offsetParent) {
        do {
            x += layoutElement.offsetLeft;
            y += layoutElement.offsetTop;
        } while (layoutElement = layoutElement.offsetParent);

        return { x: x, y: y };
    }
}

$(document).ready(function () {
    var hexSize = 120;
    var canvas = $('#HexCanvas')[0];
    var clearContext = canvas.getContext("2d");
    var canvasXSize = canvas.width;
    var canvasYSize = canvas.height;

    $(canvas).bind('mousewheel DOMMouseScroll', function (e) {
        e.preventDefault();
        var offset = getRelativePosition();
        var zoomX = e.pageX - offset.x;
        var zoomY = e.pageY - offset.y;

        if (e.originalEvent.wheelDelta > 0 || e.originalEvent.detail < 0) {
            //Zoom in
            if (hexSize < 120) {
                hexSize += 10;
                //Need to redraw based on center of mouse coordinates
                hexGridGeneration(canvas, hexSize, canvasXSize, canvasYSize);
                //drawHexGrid(canvas, hexSize);
            }
        }
        else {
            //Zoom out
            if (hexSize > 10) {
                hexSize -= 10;
                hexGridGeneration(canvas, hexSize, canvasXSize, canvasYSize);
                //drawHexGrid(canvas, hexSize);
            }
        }
    });

    $(canvas).click(function (event) {
        var offset = getRelativePosition();
        var clickedX = event.pageX - offset.x;
        var clickedY = event.pageY - offset.y;
        var a = (Math.PI * 2) / 6;
        
        var width = hexSize * 2;
        var height = Math.sqrt(3) / 2 * width;

        var context = canvas.getContext('2d');

        for (var i = 0; i < hexGridObj.length; i++) {
            if (clickedX < hexGridObj[i].xCenter && clickedX < hexGridObj[i].yCenter)
            {
                context.beginPath();
                context.moveTo(hexSize * Math.cos(a) + hexGridObj[i].xCenter, hexSize * Math.sin(a) + hexGridObj[i].yCenter);
                for (var x = 1; x < 8; x++) {
                    context.lineTo((hexSize + 1) * Math.cos(a * x) + hexGridObj[i].xCenter, (hexSize + 1) * Math.sin(a * x) + hexGridObj[i].yCenter);
                }

                context.strokeStyle = "rgba(255, 0, 0, 1)";
                context.stroke();
                context.strokeStyle = "rgba(0, 0, 0, 1)";
            }
        }
    });

    $('#HexCanvas').mousemove(function (event) {
        var offset = getRelativePosition();
        var mouseX = event.pageX - offset.x;
        var mouseY = event.pageY - offset.y;
        var context = canvas.getContext('2d');
        var a = (Math.PI * 2) / 6;

        for (var i = 0; i < hexGridObj.length; i++) {
            if (mouseX < hexGridObj[i].right && mouseX > hexGridObj[i].left && mouseY < hexGridObj[i].bottom && mouseY > hexGridObj[i].top) { //&&hexGridObj.hover == true) {
                if (hexGridObj[i].hover == false) {
                    context.beginPath();
                    context.moveTo(hexSize * Math.cos(a) + getXActualCoord(i), hexSize * Math.sin(a) + getYActualCoord(i));
                    for (var x = 1; x < 8; x++) {
                        context.lineTo((hexSize) * Math.cos(a * x) + getXActualCoord(i), (hexSize) * Math.sin(a * x) + getYActualCoord(i));
                    }
                    context.fillStyle = "rgba(190, 190, 190, 1)";
                    context.fill();
                    context.strokeStyle = "rgba(0, 0, 0, 1)";
                    context.stroke();

                    hexGridObj[i].hover = true;
                    hoverHex.xCoordinate = getXActualCoord(i);
                    hoverHex.yCoordinate = getYActualCoord(i);
                }
            }
            else if (mouseX > hexGridObj[i].right && mouseY < hexGridObj[i].top ||
	                mouseX > hexGridObj[i].right && mouseY > hexGridObj[i].bottom ||
	                mouseX < hexGridObj[i].left && mouseY < hexGridObj[i].top ||
	                mouseX < hexGridObj[i].left && mouseY > hexGridObj[i].bottom) { //if (hexGridObj[i].hover == true) {
                if (hexGridObj[i].hover == true) {
                    context.beginPath();
                    context.moveTo(hexSize * Math.cos(a) + hoverHex.xCoordinate, hexSize * Math.sin(a) + hoverHex.yCoordinate);
                    for (var x = 1; x < 8; x++) {
                        context.lineTo((hexSize) * Math.cos(a * x) + hoverHex.xCoordinate, (hexSize) * Math.sin(a * x) + hoverHex.yCoordinate);
                    }
                    context.fillStyle = "rgba(220, 220, 220, 1)";
                    context.fill();
                    context.strokeStyle = "rgba(0, 0, 0, 1)";
                    context.stroke();

                    hexGridObj[i].hover = false;
                    //hoverHex = null;
                }
            }
        }
    });
});