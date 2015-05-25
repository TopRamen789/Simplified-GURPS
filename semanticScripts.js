$(document).ready(function () {
    $('.dropdown')
        .dropdown()
    ;

    //$('#toolbar .menu .item')
    //    .tab({
    //       context: $('#toolbarTabs')
    //    })
    //;

    $('#toolbar .menu .item')
        .tab({
            context: $('#toolbarContent')
        })
    ;

    $('.tabular.menu .item')
        .tab();
    ;

    $('.ui.menu')
    .on('click', '.item', function () {
        if (!$(this).hasClass('ui')) {
            $(this)
                .addClass('active')
                .siblings('.item')
                .removeClass('active');
            }
    });

    $('.ui.checkbox')
        .checkbox()
    ;

    $('.ui.accordion')
        .accordion()
    ;

    $('.button')
        .popup()
    ;

    $('.icon')
        .popup()
    ;

    //$('.ui.sticky').sticky({
    //    context: '#main',
    //    pushing: true
    //});

    //$('.ui.sticky')
    //    .sticky()
    //;

    $('.modal')
    .modal({
        detachable: false
    })

    $('.button:has(.modal)')
    .on('click', function () {
        $(this).find('.modal').first()
        .modal('show')
    });

    $('#cancel')
    .click(function () {
        $('#cancelModal').modal('show')
    });

    $('.special.cards .image').dimmer({
        on: 'hover'
    });
});