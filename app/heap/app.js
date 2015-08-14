var APP = {
    animatedHeap: new AnimatedHeap([10, 20, 30, 40])
};

$(function () {
    var $svg = $('svg');
    var $body = $('body');

    $svg.height($body.height() * 0.7);
    $svg.width($body.width() * 0.8);

    APP.animatedHeap.update();

    setupEventHandlers();
});

/////////////////////////////////////////////

function setupEventHandlers() {
    $('#add').click(function () {
        var t = +($('#number').val());
        APP.animatedHeap.add(t);
    });
}
