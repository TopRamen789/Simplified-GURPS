var document = {
    onReadyInput: $(document).ready(function () {
        var generate = $('#generate');
        var add = $('#add');
        var nameInput = $('#name');
        var widthInput = $('#width');
        var heightInput = $('#height');

        var toolbarContent = $('#toolbarContent .tab[data-tab=0] .menu');
        var toolbarContent1 = $('#toolbarContent .tab[data-tab=1]');
        var toolbarContent2 = $('#toolbarContent .tab[data-tab=2]');

        var patternNumber = 0;

        generate.click(function () {
            canvas.width = widthInput.val();
            canvas.height = heightInput.val();

            pattern.drawPattern(canvas);
        });

        add.click(function () {
            toolbarContent.append(
                '<a class="item">' +
                    '<i class="cloud icon"></i>' +
                    '<canvas id="' + patternNumber + '" width="' + (canvas.width-2) + '" height="' + (canvas.height-2) + '"></canvas>' +
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
                if(widthInput.val() == "")
                {
                    canvas.width = 50;
                }
                canvas.height = heightInput.val();
                if(heightInput.val() == "")
                {
                    canvas.height = 50;
                }
                pattern.drawPattern(canvas);
            }
        });

        heightInput.keypress(function (event) {
            if (event.keyCode == 13) 
            {
                canvas.width = widthInput.val();
                if(widthInput.val() == "")
                {
                    canvas.width = 50;
                }
                canvas.height = heightInput.val();
                if(heightInput.val() == "")
                {
                    canvas.height = 50;
                }
                pattern.drawPattern(canvas);
            }
        });
    }),

    onReadyColors: $(document).ready(function() {
        var canvas;
        var cst = $('input[name="custom"]');
        var cst2 = $('input[name="custom2"]');
        var cst3 = $('input[name="custom3"]');

        $('input[name="brushSize"]').keypress(function (event) {
            if (event.keyCode == 13) {
                brushSize = $('input[name="brushSize"]').val();
            }
        });

        brushSize = 10;
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
    }),

    onReadyStyles: $(document).ready(function () {
        var patternBtn = $('#addPattern');
        var patternModal = $('#addPatternModal');
        var color = $('#color');

        patternBtn.click(function () {
            patternModal.modal('show');
        });
    }),

    onReadyMouse: $(document).ready(function () {
        var draw = $('div[data-tooltype="draw"]');
        var erase = $('div[data-tooltype="erase"]');

        canvas = $('#PatternCanvas')[0];
        pattern.drawPattern(canvas);

        var mousedown;
        $(canvas).mousedown(function (event) {
            var offset = cvs.getRelativePosition();
            var x = event.pageX - offset.x - (brushSize / 2);
            var y = event.pageY - offset.y - (brushSize / 2);
            var context = cvs.getContext(canvas);

            mousedown = true;

            context.beginPath();

            if (draw.hasClass('active')) {
                    context.fillStyle = brushColor;
                    context.fillRect(x, y, brushSize, brushSize);
            }
            else if (erase.hasClass('active')) {
                context.fillStyle = "rgba(255,255,255,1)";
                context.fillRect(x, y, brushSize, brushSize);
            }
        });

        $('#PatternCanvas').mousemove(function (event) {
            var offset = cvs.getRelativePosition();
            var x = event.pageX - offset.x - (brushSize / 2);
            var y = event.pageY - offset.y - (brushSize / 2);
            var context = cvs.getContext(canvas);

            if (mousedown) {
                context.fillRect(x, y, brushSize, brushSize);
            }
        });

        $(canvas).mouseup(function (event) {
            var context = cvs.getContext(canvas);
            context.closePath();
            context.restore();
            mousedown = false;
            
            pattern.drawPattern(canvas);
        });

        $(canvas).mouseout(function (event) {
            var context = cvs.getContext(canvas);
            context.closePath();
            context.restore();
            mousedown = false;

            pattern.drawPattern(canvas);
        });
    }),
};

var cvs = {
    getContext: function (canvas) {
        var context = canvas.getContext("2d");

        return context;
    },

    getSize: function (canvas) {
        var canvasXSize = canvas.width;
        var canvasYSize = canvas.height;

        return [canvasXSize, canvasYSize];
    },

    getRelativePosition: function () {
        var x = 0, y = 0;
        var layoutElement = $('#PatternCanvas')[0];
        if (layoutElement.offsetParent) {
            do {
                x += layoutElement.offsetLeft;
                y += layoutElement.offsetTop;
            } while (layoutElement = layoutElement.offsetParent);

            return { x: x, y: y };
        }
    },

    fill: function(canvas, color) {
        var context = cvs.getContext(canvas);
        var size = cvs.getSize(canvas);

        context.beginPath();
        context.save();

        context.moveTo(0, 0);

        context.lineTo(0, size[1]);
        context.lineTo(size[0], size[1]);
        context.lineTo(size[0], 0);
        context.lineTo(0, 0);

        context.fillStyle = color;
        context.fill();

        context.closePath();
        context.restore();
    },
};

var pattern = {
    drawPattern: function (canvas) {
        var context = cvs.getContext(canvas);
        var size = cvs.getSize(canvas);

        context.beginPath();
        context.save();

        context.moveTo(0, 0);

        context.lineTo(0, size[1]);
        context.lineTo(size[0], size[1]);
        context.lineTo(size[0], 0);
        context.lineTo(0, 0);

        context.strokeStyle = "rgba(0, 0, 0, 1)";
        context.stroke();

        context.closePath();
        context.restore();
    },
};