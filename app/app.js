// here be globals
var APP = {
    animatedBTree: new AnimatedBTree([100, 150, 80, 90, 180, 70])
};

function appendSnapshot(snapshots, root, text) {
    if (snapshots === undefined) {
        return;
    }
    var cloned = _.clone(root, true);
    cloned.text = text;
    snapshots.push(cloned);
}


$(function () {
    $('svg').empty();
    APP.animatedBTree.update();

    $('#add').click(function () {
        var t = +($('#toadd').val());
        APP.animatedBTree.add(t);
    });

    $('#inorder').click(function () {
        APP.animatedBTree.inorder();
    });
});