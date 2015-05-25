function getRelativePosition() {
    var x = 0, y = 0;
    var layoutElement = $('#WorldCanvas')[0];
    if (layoutElement.offsetParent) {
        do {
            x += layoutElement.offsetLeft;
            y += layoutElement.offsetTop;
        } while (layoutElement = layoutElement.offsetParent);

        return { x: x, y: y };
    }
}

var document = {
    //onReadyInput: $(document).ready(function() {
    //    $('#toolbarContent .menu .item').click(function () {
    //        var brush = $(this).contents().find('canvas')[0];
    //    });
    //}),

    onReadyMouse: $(document).ready(function () {
        var draw = $('div[data-tooltype="draw"]');
        var erase = $('div[data-tooltype="erase"]');

        var canvas = $('#WorldCanvas')[0];
        var context = canvas.getContext("2d");
        var canvasXSize = canvas.width;
        var canvasYSize = canvas.height;

        context.beginPath();
        context.save();

        context.moveTo(0,0);

        context.lineTo(0, canvasYSize);
        context.lineTo(canvasXSize, canvasYSize);
        context.lineTo(canvasXSize, 0);
        context.lineTo(0, 0);

        //context.fillStyle = "rgba(200, 200, 200, 1)";
        context.fillStyle = "rgba(255, 255, 255, 1)";
        context.fill();

        context.strokeStyle = "rgba(0, 0, 0, 1)";
        context.stroke();

        context.closePath();
        context.restore();

        $('input[name="brushSize"]').keypress(function (event) {
            if (event.keyCode == 13) {
                brushSize = $('input[name="brushSize"]').val();
            }
        });

        var mousedown;
        $(canvas).mousedown(function (event) {
            var offset = getRelativePosition(canvas);
            var x = event.pageX - offset.x - (brushSize / 2);
            var y = event.pageY - offset.y - (brushSize / 2);
            var context = canvas.getContext('2d');

            mousedown = true;

            //omg SLURPS sucks..............

            context.beginPath();
            if($('#toolbar .vertical.fluid.menu .item[data-tab=0]').hasClass('active'))
            {
                if ($('#toolbarContent #patterns.menu .item').hasClass('active')) {
                    var brush = $('#toolbarContent #patterns.menu .item.active canvas')[0];
                    context.drawImage(brush, x, y);
                }
            }
            else if($('#toolbar .vertical.fluid.menu[data-tab=1]').hasClass('active'))
            {
                if (erase.hasClass('active')) {
                    context.fillStyle = "rgba(255,255,255,1)";
                    context.fillRect(x, y, brushSize, brushSize);
                }
                else if (draw.hasClass('active')) {
                    context.fillStyle = "rgba(0,0,0,1)";
                    context.fillRect(x, y, brushSize, brushSize);
                }
            }
        });

        $('#WorldCanvas').mousemove(function (event) {
            var offset = getRelativePosition();
            var x = event.pageX - offset.x - (brushSize / 2);
            var y = event.pageY - offset.y - (brushSize / 2);
            var context = canvas.getContext('2d');

            if (mousedown) {
                if ($('#toolbarContent #patterns.menu .item').hasClass('active')) {
                    var brush = $('#toolbarContent #patterns.menu .item.active canvas')[0];
                    context.drawImage(brush, x, y);
                }
                else if (erase.hasClass('active')) {
                    context.fillRect(x, y, brushSize, brushSize);
                }
                else if (draw.hasClass('active')) {
                    context.fillRect(x, y, brushSize, brushSize);
                }
            }
        });

        $(canvas).mouseup(function (event) {
            context.closePath();
            context.restore();
            mousedown = false;
        });

        $(canvas).mouseout(function (event) {
            context.closePath();
            context.restore();
            mousedown = false;
        });
    }),
}