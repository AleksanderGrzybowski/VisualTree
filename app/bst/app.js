var APP = {
    animatedBST: new AnimatedBST([80, 40, 120, 20, 60, 100, 140, 10, 30, 50, 70, 90, 110, 130, 150, 0, 160])
};

$(function () {
    var $svg = $('svg');
    var $body = $('body');

    $svg.height($body.height() * 0.7);
    $svg.width($body.width() * 0.8);

    APP.animatedBST.update();

    setupEventHandlers();
});

/////////////////////////////////////////////

function setupEventHandlers() {
    $('#add').click(function () {
        var t = +($('#number').val());
        APP.animatedBST.add(t);
    });

    $('#delete').click(function () {
        var t = +($('#number').val());
        APP.animatedBST.delete(t);
    });
    $('#inorder').click(function () {
        APP.animatedBST.inorder();
    });
}
