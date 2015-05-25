$(document).ready(function () {
    /**SpectrumJS**/
    var cst = $('input[name="custom"]');
    var cst2 = $('input[name="custom2"]');
    var cst3 = $('input[name="custom3"]');
    var brushColor = "rgba(0, 0, 0, 1)";

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
    /**************/

    //var brushSize = 10;

    //$('input[name="brushSize"]').keypress(function (event) {
    //    if (event.keyCode == 13) {
    //        brushSize = $('input[name="brushSize"]').val();
    //    }
    //});

    var draw = $('.modal div[data-tooltype="draw"]');
    var erase = $('.modal div[data-tooltype="erase"]');
    var fill = $('.modal div[data-tooltype="fill"]');

    //var canvas = $('#PatternCanvas')[0];
    //var context = canvas.getContext('2d');

    //function drawOutline() {
    //    context.beginPath();
    //    context.save();

    //    context.moveTo(0, 0);

    //    context.lineTo(0, canvas.height);
    //    context.lineTo(canvas.width, canvas.height);
    //    context.lineTo(canvas.width, 0);
    //    context.lineTo(0, 0);

    //    context.strokeStyle = "rgba(0, 0, 0, 1)";
    //    context.stroke();

    //    context.closePath();
    //    context.restore();
    //}

    //drawOutline();

    //var mousedown;
    //$(canvas).mousedown(function (event) {
    //    var offset = getRelativePosition();
    //    var x = event.pageX - offset.x - (brushSize / 2);
    //    var y = event.pageY - offset.y - (brushSize / 2);

    //    mousedown = true;

    //    context.beginPath();

    //    if (draw.hasClass('active')) {
    //        context.fillStyle = brushColor;
    //        context.fillRect(x, y, brushSize, brushSize);
    //    }
    //    else if (erase.hasClass('active')) {
    //        context.fillStyle = "rgba(255,255,255,1)";
    //        context.fillRect(x, y, brushSize, brushSize);
    //    }
    //    else if (fill.hasClass('active')) {
    //        context.fillStyle = brushColor;
    //        context.fillRect(0, 0, canvas.width, canvas.height);
    //    }
    //});

    //$(canvas).mousemove(function (event) {
    //    var offset = getRelativePosition();
    //    var x = event.pageX - offset.x - (brushSize / 2);
    //    var y = event.pageY - offset.y - (brushSize / 2);

    //    if (mousedown) {
    //        context.fillRect(x, y, brushSize, brushSize);
    //    }
    //});

    //$(canvas).mouseup(function (event) {
    //    context.closePath();
    //    context.restore();
    //    mousedown = false;
    //});

    //$(canvas).mouseout(function (event) {
    //    context.closePath();
    //    context.restore();
    //    mousedown = false;
    //});


    /*************Semantic Events*************/
    var generate = $('#generate');
    var add = $('#add');
    var nameInput = $('#name');
    var widthInput = $('#width');
    var heightInput = $('#height');
    var gridSizeInput = $('squareSize');
    var squareSize = gridSizeInput.val();
    if (squareSize = "");
    {
        squareSize = 25;
    }

    var patternBtn = $('#addPattern');
    var patternModal = $('#addPatternModal');
    var color = $('#color');

    var toolbar = $('#patterns');

    patternBtn.click(function () {
        patternModal.modal('show');
    });

    var patternNumber = 0;

    generate.click(function () {
        canvas.width = widthInput.val();
        canvas.height = heightInput.val();
        //canvas.width = squareSize;
        //canvas.height = squareSize;

        //drawOutline();
    });

    add.click(function () {
        toolbar.append(
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

    //widthInput.keypress(function (event) {
    //    if (event.keyCode == 13) {
    //        canvas.width = widthInput.val();
    //        if (widthInput.val() == "") {
    //            canvas.width = 50;
    //        }
    //        canvas.height = heightInput.val();
    //        if (heightInput.val() == "") {
    //            canvas.height = 50;
    //        }
    //        drawOutline();
    //    }
    //});

    //heightInput.keypress(function (event) {
    //    if (event.keyCode == 13) {
    //        canvas.width = widthInput.val();
    //        if (widthInput.val() == "") {
    //            canvas.width = 50;
    //        }
    //        canvas.height = heightInput.val();
    //        if (heightInput.val() == "") {
    //            canvas.height = 50;
    //        }
    //        drawOutline();
    //    }
    //});
    /*****************************************/
});