/**
 * @param {number} value
 * @constructor
 */
function BTreeNode(value) {
    this.left = null;
    this.right = null;
    this.parent = null;
    this.value = value;
}

/**
 * @returns {BTreeNode}
 */
BTreeNode.prototype.findRoot = function () {
    var node = this;

    while (node.parent !== null) {
        node = node.parent;
    }

    return node;
};

/**
 * @param {number} value
 * @param {BTreeNode[]} [snapshots=[]]
 * @returns {BTreeNode}
 */
BTreeNode.prototype.add = function (value, snapshots) {
    var root = this.findRoot();

    this.isred = true;
    (snapshots || []).push(_.clone(root, true));
    this.isred = false;

    if (value < this.value) {
        if (this.left == null) {
            this.left = new BTreeNode(value);
            this.left.parent = this;
            this.left.isred = true;
            (snapshots || []).push(_.clone(root, true));
            this.left.isred = false;
            (snapshots || []).push(_.clone(root, true));
        } else {
            this.left.add(value, snapshots);
        }
    } else if (value > this.value) {
        if (this.right == null) {
            this.right = new BTreeNode(value);
            this.right.parent = this; // TODO refactor to ctor
            this.right.isred = true;
            (snapshots || []).push(_.clone(root, true));
            this.right.isred = false;
            (snapshots || []).push(_.clone(root, true));
        } else {
            this.right.add(value, snapshots);
        }
    }
    // else: duplicate, do nothing

    return this;
};
