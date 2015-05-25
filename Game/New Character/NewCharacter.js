$(document).ready(function () {

    var value;
    var pointsElement = $('#points');
    var points = $('#points').html();
    var money = $('#money').html();
    var buttonPlus = $('.statistic .button:has(i.plus)');
    var buttonMinus = $('.statistic .button:has(i.minus)');
    var save = $('#Save');

    $(buttonPlus).click(function () {
        var siblings = $(this).siblings('.value');
        var pointValue = parseInt(siblings.attr("data-points"), 10);
        points -= pointValue;
        pointsElement.html(points);
        value = parseFloat(siblings.html());
        if (siblings.hasClass('speed')) {
            value += .25;
        }
        else {
            value++;
        }
        siblings.html(value);
    });

    $(buttonMinus).click(function () {
        var siblings = $(this).siblings('.value');
        var pointValue = parseInt(siblings.attr("data-points"), 10);
        points += pointValue;
        pointsElement.html(points);
        value = parseFloat(siblings.html());
        if (siblings.hasClass('speed')) {
            value -= .25;
        }
        else {
            value--;
        }
        siblings.html(value);
    });

    //May need to tinker with this more...
    $(save).click(function () {
        var strength = parseInt($('.statistic:nth-child(1) div:nth-child(2)').html(), 10);
        var dexterity = parseInt($('.statistic:nth-child(2) div:nth-child(2)').html(), 10);
        var intelligence = parseInt($('.statistic:nth-child(3) div:nth-child(2)').html(), 10);
        var health = parseInt($('.statistic:nth-child(4) div:nth-child(2)').html(), 10);
        var dSwing = parseInt($('.statistic:nth-child(5) div:nth-child(2)').html(), 10);
        var dThrust = parseInt($('.statistic:nth-child(6) div:nth-child(2)').html(), 10);
        var basicLift = parseInt($('.statistic:nth-child(7) div:nth-child(2)').html(), 10);
        var will = parseInt($('.statistic:nth-child(8) div:nth-child(2)').html(), 10);
        var fatiguePoints = parseInt($('.statistic:nth-child(9) div:nth-child(2)').html(), 10);
        var basicSpeed = parseFloat($('.statistic:nth-child(10) div:nth-child(2)').html(), 10);
        var basicMove = parseInt($('.statistic:nth-child(11) div:nth-child(2)').html(), 10);
        var hitPoints = parseInt($('.statistic:nth-child(12) div:nth-child(2)').html(), 10);
        var perception = parseInt($('.statistic:nth-child(13) div:nth-child(2)').html(), 10);
        var points = parseInt($('#points').html(), 10);
        var money = parseInt($('#money').html(), 10);

        var Character = {};
        Character.PrimaryAttributes = {};
        Character.SecondaryAttributes = {};
        Character.SecondaryAttributes.Damage = {};
        Character.PrimaryAttributes.strength = strength;
        Character.PrimaryAttributes.dexterity = dexterity;
        Character.PrimaryAttributes.intelligence = intelligence;
        Character.PrimaryAttributes.health = health;
        Character.SecondaryAttributes.Damage.Swing = dSwing;
        Character.SecondaryAttributes.Damage.Thrust = dThrust;
        Character.SecondaryAttributes.basicLift = basicLift;
        Character.SecondaryAttributes.will = will;
        Character.SecondaryAttributes.fatiguePoints = fatiguePoints;
        Character.SecondaryAttributes.basicSpeed = basicSpeed;
        Character.SecondaryAttributes.basicMove = basicMove;
        Character.SecondaryAttributes.hitPoints = hitPoints;
        Character.SecondaryAttributes.perception = perception;
        Character.SecondaryAttributes.points = points;
        Character.SecondaryAttributes.money = money;

        var data = JSON.stringify(Character);
    });
});