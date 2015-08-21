/**
 * @param {BSTree} tree
 * @constructor
 */
function BSTSnapshotCollector(tree) {
    this.tree = tree;
    this.snapshots = [];
}

/**
 * @param {string} text
 */
BSTSnapshotCollector.prototype.add = function (text) {
    var cloned = _.clone(this.tree.root, true);
    cloned.text = text;
    this.snapshots.push(cloned);
};