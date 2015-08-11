/**
 * @param {BTreeNode} root
 * @constructor
 */
function SnapshotCollector(root) {
    this.root = root;
    this.snapshots = [];
}

/**
 * @param {string} text
 */
SnapshotCollector.prototype.add = function (text) {
    var cloned = _.clone(this.root, true);
    cloned.text = text;
    this.snapshots.push(cloned);
};