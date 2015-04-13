$(document).ready(function () {
    $('.dropdown')
        .dropdown()
    ;

    $('#toolbar .menu .item')
        .tab({
           context: $('#toolbarTabs')
        })
    //.tab()
    ;

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

    $('.ui.sticky').sticky({
        context: '#main',
        pushing: true
    });

    $('.modal')
    .modal({
        detachable: false
    })

    $('.button:has(.modal)').on('click', function () {
        $(this).find('.modal').first()
        .modal('show')
    });

    $('.special.cards .image').dimmer({
        on: 'hover'
    });
});