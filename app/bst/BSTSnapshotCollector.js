/**
 * @param {BSTNode} root
 * @constructor
 */
function BSTSnapshotCollector(root) {
    this.root = root;
    this.snapshots = [];
}

/**
 * @param {string} text
 */
BSTSnapshotCollector.prototype.add = function (text) {
    var cloned = _.clone(this.root, true);
    cloned.text = text;
    this.snapshots.push(cloned);
};