$(document).ready(function () {
    var value;
    //var value = $('.statistic .button');
    var pointsElement = $('#points');
    var points = $('#points').html();
    var money = $('#money').html();
    var buttonPlus = $('.statistic .button:has(i.plus)');
    var buttonMinus = $('.statistic .button:has(i.minus)');

    //$('<div class=ui>').addClass('right').addClass('aligned').addClass('grid').insertBefore('.statistic .button');
    //$('<div class=column>').insertAfter('.statistic div.grid');
    //$('</div>').insertAfter('.statistic .button:last');
    //$('</div></div>').insertAfter('.statistic .button:last');

    //$('.dropdown')
    //.dropdown({
    //    transition: 'drop',
    //    allowCategorySelection: true
    //});

    $('.dropdown')
        .dropdown()
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

    $(buttonPlus).click(function () {
        var siblings = $(this).siblings('.value');

        if(siblings.hasClass('20pt'))
        {
            points -= 20;
            pointsElement.html(points);
        }
        else if(siblings.hasClass('10pt'))
        {
            points -= 10;
            pointsElement.html(points);
        }
        else if(siblings.hasClass('5pt'))
        {
            points -= 5;
            pointsElement.html(points);
        }
        else if(siblings.hasClass('3pt'))
        {
            points -= 3;
            pointsElement.html(points);
        }
        else if (siblings.hasClass('2pt'))
        {
            points -= 2;
            pointsElement.html(points);
        }

        value = parseFloat($(this).siblings('.value').html());

        if (siblings.hasClass('speed'))
        {
            value += .25;
        }
        else
        {
            value++;
        }

        $(this).siblings('.value').html(value);
    });

    $(buttonMinus).click(function () {
        var siblings = $(this).siblings('.value');

        if (siblings.hasClass('20pt'))
        {
            points += 20;
            pointsElement.html(points);
        }
        else if (siblings.hasClass('10pt'))
        {
            points += 10;
            pointsElement.html(points);
        }
        else if (siblings.hasClass('5pt'))
        {
            points += 5;
            pointsElement.html(points);
        }
        else if (siblings.hasClass('3pt'))
        {
            points += 3;
            pointsElement.html(points);
        }
        else if (siblings.hasClass('2pt'))
        {
            points += 2;
            pointsElement.html(points);
        }

        value = parseFloat($(this).siblings('.value').html());

        if (siblings.hasClass('speed'))
        {
            value -= .25;
        }
        else
        {
            value--;
        }
        
        $(this).siblings('.value').html(value);
    });

    //$('.medium.button:has(.modal)')
    //    .modal({
    //        detachable: false
    //    })
    //;

    //$('.modal')
    //    .modal({
    //        detachable: false
    //    })
    //;

    //$('.dropdown.button:has(.modal)')
    //    .modal({
    //        detachable: false
    //    })
    //;

    //$('.dropdown .menu .item')
    //    .modal('attach events', '.item .modal', 'show')
    //;

    //$('.item:has(.modal)').on('click', function () {
    //    $(this).find('.modal').first()
    //    .modal('toggle')
    //    //$('.dropdown.button .item:has(.modal)').first().modal('show')
    //    //$('.item .modal').first().modal('toggle')
    //});

    //$('.dropdown.button .item:has(.modal)')//:has(.modal)
    //    //.modal('attach events', '.modal') //, 'show'
    //;

    //$('.dropdown.button .item:has(.modal)').on('click', function () {
    //    $(this).find('.modal')
    //    .modal('toggle')
    //});

    //$('.button:has(.modal)').on('click', function () {
    //    //$(this).find('.modal').first()
    //    //$('.button .modal')
    //    //$('.button .modal')
    //    //$('.modal:first')
    //    //$(this).find('.modal').first()
    //    //.modal('toggle')
    //});

    $('.modal')
    .modal({
        detachable: false
    })

    $('.button:has(.modal)').on('click', function () {
        $(this).find('.modal').first()
        .modal('show')

        //$('.modal')
        //.modal({
        //    detachable: false
        //})
    });

    //$('.button .modal').modal('attach events', '.button', 'show')
});