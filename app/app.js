// here be globals
var APP = {
    animatedBTree: new AnimatedBTree([8,4,12,2,6,10,14,1,3,5,7,9,11,13,15, 0, 16])
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