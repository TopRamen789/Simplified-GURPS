$(document).ready(function () {
    var addLayer = $('#newLayer');
    var canvas = $('#WorldGrid')[0];
    var squareSize = $('#squareSize').val();
    var worksheet = $('#worksheet');
    var layers = $('#layers .list');
    var infoModals = $('#infoModals');
    var layerCount = 1;
    var brushColor = $('#brushColor');

    var draw = $('.modal div[data-tooltype="draw"]');
    var erase = $('.modal div[data-tooltype="erase"]');
    var fill = $('.modal div[data-tooltype="fill"]');

    var editLayerButton = $('#editLayerButton');
    var editLayerModal = $('#editLayerModal');
    var deleteLayers = $('#deleteLayers');
    editLayerButton.click(function () {
        editLayerModal.modal('show');
    });

    addLayer.click(function () {
        if (layerCount <= 10) {
            worksheet.append(
                '<canvas id="layer' + layerCount + '" width="' + canvas.width + '" height = "' + canvas.height + '"></canvas>'
            );

            layers.append(
                '<div class="item">' +
                    '<div class="ui toggle checkbox" id="layerCheckbox' + layerCount + '">' +
                        '<input type="checkbox" name="public"/>' +
                        '<label>Layer' + layerCount + '</label>' +
                    '</div>' +
                '</div>'
            );

            $('#renameLayerArea').append(
                '<div class="ui labeled input" id="layerName' + layerCount + '" data-count="' + layerCount + '">' +
                    '<div class="ui label">layer ' + layerCount + '</div>' +
                        '<input type="text" name="layer' + layerCount + '"/>' +
                    '</div>' +
                '</div>'
            );

            $('#layerName' + layerCount).keypress(function () {
                var count = $(this).attr('data-count');
                var input = $(this).children('input').val();
                if (event.keyCode == 13) {
                    $('#layerCheckbox' + count + ' label').html(input);
                    $('#delLayer' + count).html('<i class=\"remove icon\"></i>Delete ' + input + ' layer');
                    $('div[data-layer="layer' + count + '"] div.header').html(input);
                    $(this).children('.label').html(input);
                }
            });

            $('#deleteLayerArea .buttons').append(
                '<div class="ui red labeled icon button" id="delLayer' + layerCount + '" data-count="' + layerCount + '">' +
                    '<i class="remove icon"></i>' +
                    'Delete layer ' + layerCount +
                '</div>'
            );

            //Initialize delete button
            $('#delLayer' + layerCount).click(function () {
                var count = $(this).attr('data-count');
                $('#layer' + count).remove();
                $('#layerName' + count).remove();
                $('#layerCheckbox' + count).remove();
                layerCount--;
                $(this).remove();
            });

            var layerCanvas = $('#layer' + layerCount)[0];
            var WorksheetPos = $(worksheet).position();
            var WorldGridPos = $(canvas).position();
            $(layerCanvas).css('position', 'absolute');
            $(layerCanvas).css('top', WorldGridPos.top);
            $(layerCanvas).css('left', WorldGridPos.left);

            $(layerCanvas).on("mousedown", function (event) {
                var layerContext = layerCanvas.getContext('2d');
                var offset = getRelativePosition(layerCanvas);
                var x = event.pageX - offset.x;
                var y = event.pageY - offset.y;

                if ($('#negativeSpace').hasClass('active')) {
                    var square = layer.getSquare(x, y);
                    square.fillSquare();
                }
                else if ($('#gridErase').hasClass('active')) {
                    var square = layer.getSquare(x, y);
                    square.drawSquare(true);
                }
                else if ($('#gridFill').hasClass('active')) {
                    layerContext.fillStyle = "rgba(180, 180, 180, 1)";
                    layerContext.fillRect(0, 0, layer.width, layer.height);
                }
                else if ($('#gridmodal').hasClass('active')) {
                    worksheet.append(
                        '<img data-layer="layer' + (layerCount - 1) + '" id="img_Layer' + layerCount + 'x' + x + 'y' + y + '" src="Images/BlipMOD.svg" style="position: absolute; left: ' + (x - 5) + 'px; top: ' + (y - 30) + 'px; height: 20px; width: 20px"/>'
                    );

                    infoModals.append(
                        '<div data-layer="layer' + (layerCount - 1) + '" id="modal_Layer' + layerCount + 'x' + x + 'y' + y + '" class="ui modal">' +
                            '<i class="close icon"></i>' +
                            '<div class="header">' +
                                'Layer ' + (layerCount - 1) +
                            '</div>' +
                            '<div class="content">' +
                                '<h3 class="ui dividing header">' +
                                    'Info Modal' +
                                '</h3>' +
                                '<div class="ui form">' +
                                    '<textarea width="100%"></textarea>' +
                                '</div>' +
                                '<div class="ui divider"></div>' +
                            '</div>' +
                        '</div>'
                    );

                    $('#img_Layer' + layerCount + 'x' + x + 'y' + y).click(function () {
                        $('#modal_Layer' + layerCount + 'x' + x + 'y' + y).modal('show');
                    });

                    var inputUp = false;
                    $('#modal_Layer' + layerCount + 'x' + x + 'y' + y + ' h3').click(function () {
                        if (!inputUp) {
                            inputUp = true;
                            $(this).append('<input type="text" />').bind('keypress', function (event) {
                                var input = $(this).children('input').val();
                                if (event.keyCode == 13) {
                                    $(this).html(input);
                                    inputUp = false;
                                }
                            });
                        }
                    });
                }
                else if ($('#patterns').children().hasClass('active')) {
                    var brush = $('#patterns .item.active canvas')[0];

                    var square = layer.getSquare(x, y);
                    square.fillSquare(null, brush);
                }
            });

            //Have to reinitialize checkbox for Semantic-UI
            $('.ui.checkbox')
                .checkbox()
            ;

            var layerChk = $('#layerCheckbox' + layerCount);
            layerChk.checkbox('check');

            $(layerChk).click(function () {
                $(layerCanvas).toggle();
                $('img[data-layer="layer' + layerCount + '"]').toggle();
            });

            if (squareSize != "") {
                var layer = new grid(layerCanvas, squareSize);
                layer.drawBlankGrid();
            }
            else {
                var layer = new grid(layerCanvas, 25);
                layer.drawBlankGrid();
            }

            layerCount++;
        }
    });
});