/**
 * @param {number} value
 * @constructor
 */
function BTreeNode(value) {
    this.left = null;
    this.right = null;
    this.parent = null;
    this.value = value;
    
    this.visual = '';
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

    this.visual = 'current';
    appendSnapshot(snapshots, root, 'Visiting node ' + this.value);
    this.visual = '';

    if (value < this.value) {
        if (this.left == null) {
            this.left = new BTreeNode(value);
            this.left.parent = this;
            this.left.visual = 'current';
            appendSnapshot(snapshots, root, 'Creating new on the left');
            this.left.visual = '';
            appendSnapshot(snapshots, root, 'Done');
        } else {
            appendSnapshot(snapshots, root, 'Going left');
            this.left.add(value, snapshots);
        }
    } else if (value > this.value) {
        if (this.right == null) {
            this.right = new BTreeNode(value);
            this.right.parent = this; // TODO refactor to ctor
            this.right.visual = 'current';
            appendSnapshot(snapshots, root, 'Creating new on the right');
            this.right.visual = '';
            appendSnapshot(snapshots, root, 'Done');
        } else {
            appendSnapshot(snapshots, root, 'Going right');
            this.right.add(value, snapshots);
        }
    }
    // else: duplicate, do nothing

    return this;
};

BTreeNode.prototype.inorder = function (snapshots) {
    var root = this.findRoot();

    if (this.left != null) {
        this.left.inorder(snapshots);
    }

    this.visual = 'current';
    appendSnapshot(snapshots, root, "Visiting " + this.value);
    this.visual = '';
    appendSnapshot(snapshots, root, "Visiting " + this.value);

    if (this.right!= null) {
        this.right.inorder(snapshots);
    }
};