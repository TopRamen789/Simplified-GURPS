//Inputs
$(document).ready(function () {
    //Tools
    var draw = $('div[data-tooltype="draw"]');
    var erase = $('div[data-tooltype="erase"]');

    //Buttons/Modal
    var patternBtn = $('#addPattern');
    var patternModal = $('#addPatternModal');

    //Pattern Modal Inputs
    var generate = $('#generate');
    var add = $('#add');
    var nameInput = $('#name');
    var widthInput = $('#width');
    var heightInput = $('#height');
    var patternNumber = 0;
    var pCanvas = $('#PatternCanvas')[0];

    //Pattern destination
    var toolbarContent = $('#toolbarContent #patterns');

    patternBtn.click(function () {
        patternModal.modal('show');
    });

    generate.click(function () {
        canvas.width = widthInput.val();
        canvas.height = heightInput.val();
    });

    add.click(function () {
        toolbarContent.append(
            '<a class="item">' +
                '<i class="cloud icon"></i>' +
                '<canvas id="' + patternNumber + '" width="' + (canvas.width - 2) + '" height="' + (canvas.height - 2) + '"></canvas>' +
            '</a>'
            );

        var destCanvas = $('#' + patternNumber)[0];
        var destContext = destCanvas.getContext('2d');
        destContext.drawImage(canvas, -1, -1);

        patternNumber++;
    });

    widthInput.keypress(function (event) {
        if (event.keyCode == 13) {
            canvas.width = widthInput.val();
            if (widthInput.val() == "") {
                canvas.width = 50;
            }
            canvas.height = heightInput.val();
            if (heightInput.val() == "") {
                canvas.height = 50;
            }
            pattern.drawPattern(canvas);
        }
    });

    heightInput.keypress(function (event) {
        if (event.keyCode == 13) {
            canvas.width = widthInput.val();
            if (widthInput.val() == "") {
                canvas.width = 50;
            }
            canvas.height = heightInput.val();
            if (heightInput.val() == "") {
                canvas.height = 50;
            }
            pattern.drawPattern(canvas);
        }
    });
});

//SpectrumJS
$(document).ready(function () {
    var cst = $('input[name="custom"]');
    var cst2 = $('input[name="custom2"]');
    var cst3 = $('input[name="custom3"]');

    brushColor = cst.spectrum("get");

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
        brushColor = color.toRgbString();
    });

    cst.on("show.spectrum", function (e, color) {
        brushColor = color.toRgbString();
    });

    cst2.on("dragstop.spectrum", function (e, color) {
        brushColor = color.toRgbString();
    });

    cst2.on("show.spectrum", function (e, color) {
        brushColor = color.toRgbString();
    });

    cst3.on("dragstop.spectrum", function (e, color) {
        brushColor = color.toRgbString();
    });

    cst3.on("show.spectrum", function (e, color) {
        brushColor = color.toRgbString();
    });
})

//Hooray!!!! Successful revealing module pattern!
var simpleCanvas = (function () {

    var cvs, context; //elem,
    function setCanvas(canvas) { //, element
        //elem = element;
        cvs = canvas;
        context = cvs.getContext('2d');
    }

    function getContext() {
        return context;
    }

    function getRelativePosition() {
        var x = 0, y = 0;
        var layoutElement = cvs;
        if (layoutElement.offsetParent) {
            do {
                x += layoutElement.offsetLeft;
                y += layoutElement.offsetTop;
            } while (layoutElement = layoutElement.offsetParent);

            return { x: x, y: y };
        }
    };

    function getSize() {
        width = cvs.width;
        height = cvs.height;
        return [width, height];
    };

    function fill(color) {
        context.beginPath();
        context.save();

        getWholeCanvas();

        context.fillStyle = color;
        context.fill();

        context.closePath();
        context.restore();
    };

    function outline() {
        context.beginPath();
        context.save();

        getWholeCanvas();

        context.strokeStyle = "rgba(0, 0, 0, 1)";
        context.stroke();

        context.closePath();
        context.restore();
    };

    function getWholeCanvas() {
        var size = getSize();

        context.moveTo(0, 0);

        context.lineTo(0, size[1]);
        context.lineTo(size[0], size[1]);
        context.lineTo(size[0], 0);
        context.lineTo(0, 0);
    }

    return {
        getContext: getContext,
        getRelativePosition: getRelativePosition,
        setCanvas: setCanvas,
        fill: fill,
        outline: outline
    }

})();

$(document).ready(function () {
    //Brush
    var brushSize = 5;
    $('input[name="brushSize"]').keypress(function (event) {
        if (event.keyCode == 13) {
            brushSize = $('input[name="brushSize"]').val();
        }
    });

    var worldCanvas = $('#WorldCanvas')[0];
    var patternCanvas = $('#PatternCanvas')[0];

    simpleCanvas.setCanvas(worldCanvas);
    simpleCanvas.outline();

    var mousedown = false;
    $(worldCanvas).mousedown(function (event) {
        var offset = simpleCanvas.getRelativePosition();
        var x = event.pageX - offset.x - 2 - (brushSize / 2);
        var y = event.pageY - offset.y - 15 - (brushSize / 2);
        var context = simpleCanvas.getContext();
        mousedown = true;

        context.fillStyle = "rgba(0,0,0,1)";
        context.fillRect(x, y, brushSize, brushSize);
    });

    $('#WorldCanvas').mousemove(function (event) {
        var offset = simpleCanvas.getRelativePosition();
        var x = event.pageX - offset.x - (brushSize / 2);
        var y = event.pageY - offset.y - (brushSize / 2);
        var context = simpleCanvas.getContext();

        if (mousedown) {
            context.fillRect(x, y, 5, 5);
        }
    });

    $(worldCanvas).mouseup(function (event) {
        var context = simpleCanvas.getContext();
        context.closePath();
        context.restore();
        mousedown = false;
    });

    $(worldCanvas).mouseout(function (event) {
        var context = simpleCanvas.getContext();
        context.closePath();
        context.restore();
        mousedown = false;
    });
});