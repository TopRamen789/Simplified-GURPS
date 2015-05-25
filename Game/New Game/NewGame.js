$(document).ready(function () {

    //Continue button
    var tabsMenu = $('.ui.tabular.steps.menu');
    var continueBtn = $('.ui.huge.primary.button');
    var i = 1;

    continueBtn.click(function () {
        tabsMenu.children('.item[data-tab=' + i + ']').removeClass('active');
        $('.ui.bottom.attached.tab.segment[data-tab=' + i + ']').removeClass('active');
        i++;
        tabsMenu.children('.item[data-tab=' + i + ']').addClass('active');
        $('.ui.bottom.attached.tab.segment[data-tab=' + i + ']').addClass('active');
        tabsMenu.children('.item[data-tab=' + (i - 1) + ']').addClass('completed');
        if (i > 4) {
            continueBtn.attr('href', '../Toolbox/Toolbox.html');
        }
    });

    tabsMenu.children('.item').click(function () {
        i = $(this).attr('data-tab');
    });
});