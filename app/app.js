// here be globals
var APP = {
    animatedBTree: new AnimatedBTree([80, 40, 120, 20, 60, 100, 140, 10, 30, 50, 70, 90, 110, 130, 150, 0, 160])
};

/**
 * @param {BTreeNode[]} snapshots
 * @param {BTreeNode} root
 * @param {string} text
 */
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


    $('#delete').click(function () {
        var t = +($('#todel').val());
        APP.animatedBTree.delete(t);
    });
    $('#inorder').click(function () {
        APP.animatedBTree.inorder();
    });
});