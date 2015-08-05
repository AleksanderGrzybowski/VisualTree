// here be globals
var APP = {
    animatedBTree: new AnimatedBTree([10, 15, 8, 9, 18, 7, 5, 6, 4, 13, 14, 19, 20])
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

    $('#inorder').click(function () {
        APP.animatedBTree.inorder();
    });
});