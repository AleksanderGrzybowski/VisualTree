// here be globals
var APP = {
    animatedBTree: new AnimatedBTree([100, 150, 80, 90, 180, 70])
};


$(function () {
    $('svg').empty();
    APP.animatedBTree.update();

    $('#add').click(function () {
        var t = +($('#toadd').val());
        APP.animatedBTree.add(t);
    });
});