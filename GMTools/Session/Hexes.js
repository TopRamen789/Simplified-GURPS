var hexGridObj = [];
var savedHex = {};
var hoverHex = [];

var iter = 0;

$(document).ready(function () {

    var hexSize = 120;
    var canvas = $('#HexCanvas')[0];
    var clearContext = canvas.getContext("2d");
    var canvasXSize = canvas.width;
    var canvasYSize = canvas.height;

    hexGridGeneration(canvas, hexSize, canvasXSize, canvasYSize);
    drawHexGrid(canvas, hexSize, 0 ,0);
});

var drawHexagon = function(context, x, y, radius, startAngle, anticlockwise) {
    var a = (Math.PI * 2) / 6;

    //hex.xCenter = x;
    //hex.yCenter = y;

    a = anticlockwise ? -a : a;
    context.beginPath();
    context.save();
    context.translate(x, y);
    context.rotate(startAngle);
    context.moveTo(radius, 0);
    //context.fillStyle = "rgba(255, 220, 220, 1)";
    for (var i = 1; i < 6; i++) {
        context.lineTo(radius * Math.cos(a * i), radius * Math.sin(a * i));
    }
    context.closePath();
    context.restore();

    //hexGridObj.push(hex);
}

var drawPlainHex = function(context, x, y, radius) {
    drawHexagon(context, x, y, radius);
    context.fillStyle = "rgba(220, 220, 220, 1)";
    context.fill();
    context.stroke();
}

function hexGridGeneration(canvas, radius, canvasXSize, canvasYSize) {
    hexGridObj = [];
    //This should be changed. Makes it so the hex grid draws based on the canvas size,
    //we want it to make a set amount of hexes.
    //This is something that could be useful for our draw method.
    //var xSize = canvasXSize / (radius * 2);
    //var ySize = canvasYSize / (radius * 2);

    var xSize = 60; //temporarily hardcoded
    var ySize = 30;
    //Making a set amount of hexes for the JSON array makes scrolling easier.

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
            hex.xSide = [];
            hex.ySide = [];

            hex.left = xIncrement - radius;
            hex.top = yIncrement - radius;
            hex.right = xIncrement + radius;
            hex.bottom = yIncrement + radius;
            
            hex.xCenter = xIncrement;
            hex.yCenter = yIncrement; 
            hex.xHexCoordinate = x;
            hex.yHexCoordinate = y;
            hex.hover = false;

            var a = (Math.PI * 2) / 6;
            for (var i = 1; i < 7; i++)
            {
                var xSide = (radius * Math.cos(a * i)) + xIncrement;
                var ySide = (radius * Math.sin(a * i)) + yIncrement;
                hex.xSide.push(xSide);
                hex.ySide.push(ySide);
            }

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

function getXHexCoord(index) {
    var x = hexGridObj[index].xHexCoordinate;
    return x;
}
function getYHexCoord(index) {
    var y = hexGridObj[index].yHexCoordinate;
    return y;
}
function getXActualCoord(index) {
    var x = hexGridObj[index].xCenter;
    return x;
}
function getYActualCoord(index) {
    var y = hexGridObj[index].yCenter;
    return y;
}

//Scrolling needs to be a feature.
//Also grab mouse coordinates then move grid based on that.
function drawHexGrid(canvas, radius, scrollX, scrollY) {
    var a = (Math.PI * 2) / 6;
    var context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    //ReDraw hex grid
    for (var i = 0; i < hexGridObj.length; i++) {
        drawPlainHex(context, getXActualCoord(i) + scrollX, getYActualCoord(i) + scrollY, radius);
    }
    //ReDraw selection
    for (var i = 0; i < hexGridObj.length; i++) {
        if (savedHex.xCoordinate == getXHexCoord(i) && savedHex.yCoordinate == getYHexCoord(i)) {
            context.beginPath();
            context.moveTo(radius * Math.cos(a) + getXActualCoord(i) + scrollX, radius * Math.sin(a) + getYActualCoord(i) + scrollY);
            //context.moveTo(radius * Math.cos(a) + getXActualCoord(i), radius * Math.sin(a) + getYActualCoord(i));
            for (var x = 1; x < 8; x++) {
                context.lineTo((radius + 1) * Math.cos(a * x) + getXActualCoord(i) + scrollX, (radius + 1) * Math.sin(a * x) + getYActualCoord(i) + scrollY);
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

function sign(p1, p2, p3) {
    return (p1.x - p3.x) * (p2.y - p3.y) - (p2.x - p3.x) * (p1.y - p3.y);
}

function pointInTriangle(pt, v1, v2, v3) {
    var b1, b2, b3;

    b1 = sign(pt, v1, v2) < 0.0;
    b2 = sign(pt, v2, v3) < 0.0;
    b3 = sign(pt, v3, v1) < 0.0;

    return ((b1 == b2) && (b2 == b3));
}

$(document).ready(function () {
    var scrollX = 0;
    var scrollY = 0;
	var hexSize = 120;
	var canvas = $('#HexCanvas')[0];
	var clearContext = canvas.getContext("2d");
	var canvasXSize = canvas.width;
	var canvasYSize = canvas.height;

    //This is kind of weird with the scroll, zooms in on top left, not center.
	$(canvas).bind('mousewheel DOMMouseScroll', function (event) {
	    event.preventDefault();
		var offset = getRelativePosition();
		var zoomX = event.pageX - offset.x;
		var zoomY = event.pageY - offset.y;

		if (event.originalEvent.wheelDelta > 0 || event.originalEvent.detail < 0) {
            //Zoom in
            if (hexSize < 120) {
                hexSize += 10;
                //Need to redraw based on center of mouse coordinates
                hexGridGeneration(canvas, hexSize, canvasXSize, canvasYSize);
                drawHexGrid(canvas, hexSize, scrollX, scrollY);
            }
        }
        else {
            //Zoom out
            if (hexSize > 10) {
                hexSize -= 10;
                hexGridGeneration(canvas, hexSize, canvasXSize, canvasYSize);
                drawHexGrid(canvas, hexSize, scrollX, scrollY);
            }
        }
    });

	$(document).keydown(onKeyDown);

    //The grid moves like I want it to,
    //now I need to make it so that it clears the context properly
    //and make it add on extra hexes when I move far enough in a direction.
	function onKeyDown(event) {
	    var context = canvas.getContext("2d");
	    var offset = getRelativePosition();
	    if (event.keyCode == 38) {
	        event.preventDefault();
	        scrollY += 200;
	        drawHexGrid(canvas, hexSize, scrollX, scrollY);
	    }
	    else if (event.keyCode == 39) {
	        event.preventDefault();
	        scrollX += -200;
	        drawHexGrid(canvas, hexSize, scrollX, scrollY);
	    }
	    else if (event.keyCode == 40) {
	        event.preventDefault();
	        scrollY += -200;
	        drawHexGrid(canvas, hexSize, scrollX, scrollY);
	    }
	    else if (event.keyCode == 37) {
	        event.preventDefault();
	        scrollX += 200;
	        drawHexGrid(canvas, hexSize, scrollX, scrollY);
	    }
	}

	$(canvas).click(function (event) {
		var offset = getRelativePosition();
		var clickedX = event.pageX - offset.x;
		var clickedY = event.pageY - offset.y;
        var context = canvas.getContext('2d');

        var a = (Math.PI * 2) / 6;

        var mouse = new Object();
        mouse.x = clickedX;
        mouse.y = clickedY;

	    //TODO: Change this 'for' loop, divide the clickedX and clickedY by the hexSize or by width and height
	    //then use that to get the hex you need.

        //var xCoordinate = Math.floor(clickedX / (2 * hexSize));
	    //var yCoordinate = ;

        //var doNothing;

        for (var i = 0; i < hexGridObj.length; i++) {

            var p1 = new Object();
            var p2 = new Object();
            var p3 = new Object();
            var p4 = new Object();
            var p5 = new Object();
            var p6 = new Object();

            p1.x = hexGridObj[i].xSide[0] + scrollX;
            p1.y = hexGridObj[i].ySide[0] + scrollY;
            p2.x = hexGridObj[i].xSide[1] + scrollX;
            p2.y = hexGridObj[i].ySide[1] + scrollY;
            p3.x = hexGridObj[i].xSide[2] + scrollX;
            p3.y = hexGridObj[i].ySide[2] + scrollY;
            p4.x = hexGridObj[i].xSide[3] + scrollX;
            p4.y = hexGridObj[i].ySide[3] + scrollY;
            p5.x = hexGridObj[i].xSide[4] + scrollX;
            p5.y = hexGridObj[i].ySide[4] + scrollY;
            p6.x = hexGridObj[i].xSide[5] + scrollX;
            p6.y = hexGridObj[i].ySide[5] + scrollY;

            if (pointInTriangle(mouse, p2, p3, p4) ||
                pointInTriangle(mouse, p5, p6, p1) ||
                mouse.x < hexGridObj[i].xSide[0] + scrollX &&
                mouse.x > hexGridObj[i].xSide[1] + scrollX &&
                mouse.x > hexGridObj[i].xSide[3] + scrollX &&
                mouse.x < hexGridObj[i].xSide[4] + scrollX &&
                mouse.y < hexGridObj[i].ySide[0] + scrollY &&
                mouse.y < hexGridObj[i].ySide[1] + scrollY &&
                mouse.y > hexGridObj[i].ySide[3] + scrollY &&
                mouse.y > hexGridObj[i].ySide[4] + scrollY) {
                savedHex.xCoordinate = getXHexCoord(i);
                savedHex.yCoordinate = getYHexCoord(i);

                context.beginPath();
                context.moveTo(hexSize * Math.cos(a) + getXActualCoord(i) + scrollX, hexSize * Math.sin(a) + getYActualCoord(i) + scrollY);
                for (var x = 1; x < 8; x++) {
                    context.lineTo((hexSize + 1) * Math.cos(a * x) + getXActualCoord(i) + scrollX, (hexSize + 1) * Math.sin(a * x) + getYActualCoord(i) + scrollY);
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

	    var mouse = new Object();
	    mouse.x = mouseX;
	    mouse.y = mouseY;

	    //TODO: Change this 'for' loop, divide the mouseX and mouseY by the hexSize
        //then use that to get the hex you need.
	    for (var i = 0; i < hexGridObj.length; i++) {

	        var p1 = new Object();
	        var p2 = new Object();
	        var p3 = new Object();
	        var p4 = new Object();
	        var p5 = new Object();
	        var p6 = new Object();

	        p1.x = hexGridObj[i].xSide[0] + scrollX;
	        p1.y = hexGridObj[i].ySide[0] + scrollY;
	        p2.x = hexGridObj[i].xSide[1] + scrollX;
	        p2.y = hexGridObj[i].ySide[1] + scrollY;
	        p3.x = hexGridObj[i].xSide[2] + scrollX;
	        p3.y = hexGridObj[i].ySide[2] + scrollY;
	        p4.x = hexGridObj[i].xSide[3] + scrollX;
	        p4.y = hexGridObj[i].ySide[3] + scrollY;
	        p5.x = hexGridObj[i].xSide[4] + scrollX;
	        p5.y = hexGridObj[i].ySide[4] + scrollY;
	        p6.x = hexGridObj[i].xSide[5] + scrollX;
	        p6.y = hexGridObj[i].ySide[5] + scrollY;

	        if (pointInTriangle(mouse, p2, p3, p4) ||
                pointInTriangle(mouse, p5, p6, p1) ||
                mouse.x < hexGridObj[i].xSide[0] + scrollX &&
                mouse.x > hexGridObj[i].xSide[1] + scrollX &&
                mouse.x > hexGridObj[i].xSide[3] + scrollX &&
                mouse.x < hexGridObj[i].xSide[4] + scrollX &&
                mouse.y < hexGridObj[i].ySide[0] + scrollY &&
                mouse.y < hexGridObj[i].ySide[1] + scrollY &&
                mouse.y > hexGridObj[i].ySide[3] + scrollY &&
                mouse.y > hexGridObj[i].ySide[4] + scrollY) {
	            context.beginPath();
	            context.moveTo(hexSize * Math.cos(a) + getXActualCoord(i) + scrollX, hexSize * Math.sin(a) + getYActualCoord(i) + scrollY);
	            for (var x = 1; x < 8; x++) {
	                context.lineTo((hexSize - 2) * Math.cos(a * x) + getXActualCoord(i) + scrollX, (hexSize - 2) * Math.sin(a * x) + getYActualCoord(i) + scrollY);
	            }

	            context.fillStyle = "rgba(190, 190, 190, 1)";
	            context.fill();

	            hexGridObj[i].hover = true;
	        }
	        else {
	            hexGridObj[i].hover = false;
	        }
	    }
	});

	setInterval(function () {
	    var context = canvas.getContext('2d');
	    var a = (Math.PI * 2) / 6;

	    for (var i = 0; i < hexGridObj.length; i++) {
	        if (hexGridObj[i].hover != true) {
	            context.beginPath();
	            context.moveTo(hexSize * Math.cos(a) + getXActualCoord(i) + scrollX, hexSize * Math.sin(a) + getYActualCoord(i) + scrollY);
	            for (var x = 1; x < 8; x++) {
	                context.lineTo((hexSize - 2) * Math.cos(a * x) + getXActualCoord(i) + scrollX, (hexSize - 2) * Math.sin(a * x) + getYActualCoord(i) + scrollY);
	            }

	            context.fillStyle = "rgba(220, 220, 220, 1)";
	            context.fill();
	        }
	    }

	}, 5000);
});