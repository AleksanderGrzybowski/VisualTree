// here be globals
var APP = {
    animatedBTree: new AnimatedBTree([80, 40, 120, 20, 60, 100, 140, 10, 30, 50, 70, 90, 110, 130, 150, 0, 160])
};

$(function () {
    var $svg = $('svg');
    var $body = $('body');

    $svg.height($body.height() * 0.7);
    $svg.width($body.width() * 0.8);

    APP.animatedBTree.update();

    $('#add').click(function () {
        var t = +($('#number').val());
        APP.animatedBTree.add(t);
    });


    $('#delete').click(function () {
        var t = +($('#number').val());
        APP.animatedBTree.delete(t);
    });
    $('#inorder').click(function () {
        APP.animatedBTree.inorder();
    });
});