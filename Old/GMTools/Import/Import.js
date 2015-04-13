$(document).keydown(onKeyDown);

function onKeyDown(event)
{
    if(event.keyCode == 13) {
        var img = $('img');
        var value = $('input').val();
        var src = img.attr("src");
        var replace = img.attr("src").replace(src, value);
        img.attr("src", replace);
    }
}

$(document).ready(function(){
    $('.button').click(function () {
        var img = $('img');
        var value = $('input').val();
        var src = img.attr("src");
        var replace = img.attr("src").replace(src, value);
        img.attr("src", replace);
    });
});



//C:\Users\Jason\Documents\GitHub\SLURPS\SLURPS\GMTools\Import\SessionPage.jpg