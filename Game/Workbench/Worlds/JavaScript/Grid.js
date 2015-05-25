//Grid Square object
var gridSquare = function (canvas, sideLength, x, y) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    this.sideLength = sideLength;
    this.x = x;
    this.y = y;

    this.top = y;
    this.bottom = y + sideLength;
    this.left = x;
    this.right = x + sideLength;

    this.hovering = false;

    this.drawSquare = function (erase) {
        this.context.beginPath();
        this.context.save();

        if (!erase) {
            this.context.moveTo(this.x, this.y);
            this.context.lineTo(this.x, this.y + this.sideLength);
            this.context.lineTo(this.x + this.sideLength, this.y + this.sideLength);
            this.context.lineTo(this.x + this.sideLength, this.y);
            this.context.lineTo(this.x, this.y);
        }
        else {
            this.context.moveTo(this.x, this.y);
            this.context.lineTo(this.x, this.y + this.sideLength - 1);
            this.context.lineTo(this.x + this.sideLength - 1, this.y + this.sideLength - 1);
            this.context.lineTo(this.x + this.sideLength - 1, this.y);
            this.context.lineTo(this.x, this.y);
        }
        this.context.strokeStyle = "rgba(0, 0, 0, 1)";
        this.context.fillStyle = "rgba(255, 255, 255, 1)";
        //this.context.lineWidth = .3;
        //this.context.lineWidth = 1;

        this.context.stroke();
        this.context.fill();
        //lameo fix
        this.context.stroke();
        this.context.fill();
        this.context.stroke();
        this.context.fill();

        this.context.closePath();
        this.context.restore();
    };

    this.fillSquare = function (color, brush) {
        this.context.beginPath();
        this.context.save();

        this.context.moveTo(this.x, this.y);
        this.context.lineTo(this.x, this.y + this.sideLength);
        this.context.lineTo(this.x + this.sideLength, this.y + this.sideLength);
        this.context.lineTo(this.x + this.sideLength, this.y);
        this.context.lineTo(this.x, this.y);

        //this.context.strokeStyle = "rgba(0, 0, 0, 1)";
        if (color != null) {
            this.context.fillStyle = color;
            this.context.fill();
        }
        else if (brush != null) {
            this.context.drawImage(brush, this.x, this.y);
        }
        else {
            this.context.fillStyle = "rgba(180, 180, 180, 1)";
            this.context.fill();
        }
        //this.context.stroke();

        this.context.closePath();
        this.context.restore();
    }
}

var grid = function (canvas, sideLength) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    this.sideLength = sideLength;
    this.grid = [];

    this.outline = function () {
        this.context.beginPath();
        this.context.save();

        this.context.moveTo(0, 0);
        this.context.lineTo(0, this.canvas.height);
        this.context.lineTo(this.canvas.width, this.canvas.height);
        this.context.lineTo(this.canvas.width, 0);
        this.context.lineTo(0, 0);

        this.context.strokeStyle = "rgba(0, 0, 0, 1)";
        this.context.stroke();

        this.context.closePath();
        this.context.restore();
    }

    this.drawGrid = function () {
        var rows = canvas.height / this.sideLength;
        var columns = canvas.width / this.sideLength;

        this.context.clearRect(0, 0, canvas.width, canvas.height);
        var xIncrement = 0;
        var yIncrement = 0;
        this.grid = [];
        var square = {};

        for (var y = 0; y < rows; y++) {
            this.grid[y] = [];
            for (var x = 0; x < columns; x++) {
                square = new gridSquare(this.canvas, this.sideLength, xIncrement, yIncrement);
                square.drawSquare();
                //square.fillSquare();
                this.grid[y].push(square);
                xIncrement += this.sideLength;
            }
            xIncrement = 0;
            yIncrement += this.sideLength;
        }

        this.outline();
    };

    this.drawBlankGrid = function () {
        var rows = canvas.height / this.sideLength;
        var columns = canvas.width / this.sideLength;

        this.context.clearRect(0, 0, canvas.width, canvas.height);
        var xIncrement = 0;
        var yIncrement = 0;
        this.grid = [];
        var square = {};

        for (var y = 0; y < rows; y++) {
            this.grid[y] = [];
            for (var x = 0; x < columns; x++) {
                square = new gridSquare(this.canvas, this.sideLength, xIncrement, yIncrement);
                this.grid[y].push(square);
                xIncrement += this.sideLength;
            }
            xIncrement = 0;
            yIncrement += this.sideLength;
        }

        //this.outline();
    };

    this.getSquare = function (x, y) {
        var col = Math.floor(y / this.sideLength);
        var row = Math.floor(x / this.sideLength);

        return this.grid[col][row];
    };

    this.setSize = function (sideLength) {
        this.sideLength = sideLength;
    };
}

function getRelativePosition(canvas) {
    var x = 0, y = 0;
    var layoutElement = canvas;
    if (layoutElement.offsetParent) {
        do {
            x += layoutElement.offsetLeft;
            y += layoutElement.offsetTop;
        } while (layoutElement = layoutElement.offsetParent);

        return { x: x, y: y };
    }
}

$(document).ready(function () {
    /**SpectrumJS**/
    var cst = $('input[name="custom"]');
    var cst2 = $('input[name="custom2"]');
    var cst3 = $('input[name="custom3"]');
    var brushColor = $('#brushColor');
    brushColor.val("rgba(150, 150, 150, 1)");

    cst.spectrum({
        color: "#f00",
        showAlpha: true,
        clickoutFiresChange: true
    });

    cst2.spectrum({
        color: "#0f0",
        showAlpha: true,
        clickoutFiresChange: true
    });

    cst3.spectrum({
        color: "#00f",
        showAlpha: true,
        clickoutFiresChange: true
    });

    cst.on("dragstop.spectrum", function (e, color) {
        brushColor.val(color.toRgbString());
    });

    cst.on("show.spectrum", function (e, color) {
        brushColor.val(color.toRgbString());
    });

    cst2.on("dragstop.spectrum", function (e, color) {
        brushColor.val(color.toRgbString());
    });

    cst2.on("show.spectrum", function (e, color) {
        brushColor.val(color.toRgbString());
    });

    cst3.on("dragstop.spectrum", function (e, color) {
        brushColor.val(color.toRgbString());
    });

    cst3.on("show.spectrum", function (e, color) {
        brushColor.val(color.toRgbString());
    });
    /**************/

    var draw = $('.modal div[data-tooltype="draw"]');
    var erase = $('.modal div[data-tooltype="erase"]');
    var fill = $('.modal div[data-tooltype="fill"]');

    /*************Semantic Events*************/
    var generate = $('#generate');
    var add = $('#add');
    var nameInput = $('#name');
    var widthInput = $('#width');
    var heightInput = $('#height');
    var patternSizeInput = $('#patternSquareSize');
    var gridSizeInput = $('#squareSize');
    var squareSize = gridSizeInput.val();
    if (squareSize = "");
    {
        squareSize = 25;
    }

    var patternBtn = $('#addPattern');
    var patternModal = $('#addPatternModal');

    var toolbar = $('#patterns');

    patternBtn.click(function () {
        patternModal.modal('show');
    });

    var patternNumber = 0;

    generate.click(function () {
        patternCanvas.width = widthInput.val() * grid1.sideLength;
        patternCanvas.height = heightInput.val() * grid1.sideLength;
        patternCanvasOutline.width = widthInput.val() * grid1.sideLength;
        patternCanvasOutline.height = heightInput.val() * grid1.sideLength;
        if (patternSizeInput.val() == "") {
            grid2.setSize(10, 10);
        }
        else {
            grid2.setSize(parseInt(patternSizeInput.val(), 10));
        }
        grid2.drawBlankGrid();
        grid3.outline();
    });

    add.click(function () {
        toolbar.append(
            '<a class="item">' +
                '<i class="cloud icon"></i>' +
                '<canvas id="' + patternNumber + '" width="' + patternCanvas.width + '" height="' + patternCanvas.height + '"></canvas>' +
            '</a>'
            );

        var destCanvas = $('#' + patternNumber)[0];
        var destContext = destCanvas.getContext('2d');
        destContext.drawImage(patternCanvas, 0, 0);

        patternNumber++;
    });

    //World Grid
    var canvas = $('#WorldGrid')[0];
    var context = canvas.getContext('2d');
    var width = canvas.width;
    var height = canvas.height;

    var squareSize = 25;
    var sizeInput = $('#squareSize');

    context.beginPath();
    context.save();

    context.moveTo(0, 0);

    context.lineTo(0, height);
    context.lineTo(width, height);
    context.lineTo(width, 0);
    context.lineTo(0, 0);

    context.strokeStyle = "rgba(0, 0, 0, 1)";
    context.stroke();

    context.closePath();
    context.restore();

    grid1 = new grid(canvas, squareSize);
    grid1.drawGrid();

    $(canvas).on("mousedown", function (event) {
        var offset = getRelativePosition(canvas);
        var x = event.pageX - offset.x;
        var y = event.pageY - offset.y;

        if ($('#negativeSpace').hasClass('active')) {
            var square = grid1.getSquare(x, y);
            square.fillSquare();
        }
        else if ($('#gridErase').hasClass('active')) {
            var square = grid1.getSquare(x, y);
            square.drawSquare(true);
        }
        else if ($('#gridFill').hasClass('active')) {
            context.fillStyle = "rgba(180, 180, 180, 1)";
            context.fillRect(0, 0, canvas.width, canvas.height);
        }
        else if ($('#gridmodal').hasClass('active')) {
            var brush = new Image();
            brush.src = 'Images/Blip.svg';

            context.drawImage(brush, x - 20, y - 40);
        }
        else if ($('#patterns').children().hasClass('active')) {
            var brush = $('#patterns .item.active canvas')[0];

            var square = grid1.getSquare(x, y);
            square.fillSquare(null, brush);
        }
    });

    var patternCanvas = $('#PatternCanvas')[0];
    var patternCanvasOutline = $('#PatternCanvasOutline')[0];
    grid2 = new grid(patternCanvas, 10);
    grid2.drawBlankGrid();
    grid3 = new grid(patternCanvasOutline, 10);
    grid3.outline();

    sizeInput.keypress(function (event) {
        if (event.keyCode == 13) {
            squareSize = parseInt(sizeInput.val(), 10);
            if (sizeInput.val() == "") {
                squareSize = 25;
            }
            grid1.setSize(squareSize);
            grid1.drawGrid();
        }
    });

    $(patternCanvas).on("mousedown", function (event) {
        var offset = getRelativePosition(patternCanvas);
        var x = event.pageX - offset.x;
        var y = event.pageY - offset.y;

        var square = grid2.getSquare(x, y);

        if (draw.hasClass('active')) {
            square.fillSquare(brushColor.val());
        }
        else if (erase.hasClass('active')) {
            square.fillSquare("rgba(255, 255, 255, 1)");
        }
        else if (fill.hasClass('active')) {
            var context = patternCanvas.getContext('2d');
            context.fillStyle = brushColor.val();
            context.fillRect(0, 0, patternCanvas.width, patternCanvas.height);
        }
    });

    //Not really needed...
    /*
    Though, if I were to pursue this, I would need to figure out
    how to keep the square hovering boolean true when the mouse is
    in the right coordinates, and make it false when it is not.
    It would be preferable not to loop through the whole array.
    */

    //setInterval(function () {
    //    for (var y = 0; y < grid.rows; y++) {
    //        for (var x = 0; x < grid.columns; x++) {
    //            if(!(grid[y][x].hovering))
    //                grid[y][x].drawSquare();
    //        }
    //    }
    //}, 100);
});