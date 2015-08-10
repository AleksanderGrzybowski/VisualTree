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

BTreeNode.prototype.isLeaf = function () {
    return this.left === null && this.right === null;
};

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
    } else {
        this.visual = 'current';
        appendSnapshot(snapshots, root, 'Found duplicate!');
        this.visual = '';
        appendSnapshot(snapshots, root, 'Found duplicate!');
    }

    return this;
};

BTreeNode.prototype.inorder = function (snapshots) {
    var root = this.findRoot();

    if (this.left != null) {
        this.visual = 'inorder-immediate';
        appendSnapshot(snapshots, root, 'Going left');

        this.left.inorder(snapshots);

        this.visual = '';
        appendSnapshot(snapshots, root, '');
    }

    this.visual = 'current';
    appendSnapshot(snapshots, root, "Visiting " + this.value);
    this.visual = '';
    appendSnapshot(snapshots, root, "Visiting " + this.value);

    if (this.right != null) {
        this.visual = 'inorder-immediate';
        appendSnapshot(snapshots, root, 'Going right');

        this.right.inorder(snapshots);

        this.visual = '';
        appendSnapshot(snapshots, root, 'Going right');
    }
};


BTreeNode.prototype.minValue = function () { // TODO animation of that
    if (this.left == null) {
        return this.value;
    } else {
        return this.left.minValue();
    }
};

BTreeNode.prototype.delete = function (value, snapshots) {
    var root = this.findRoot();

    this.visual = 'inorder-immediate';
    appendSnapshot(snapshots, root, "Is this the one to delete? " + this.value);

    if (this.value != value) {
        appendSnapshot(snapshots, root, "This is not the one to delete, searching");

        if (value < this.value) {
            if (this.left != null) {
                appendSnapshot(snapshots, root, "Going left");
                this.left.delete(value, snapshots);
                this.visual = '';
                appendSnapshot(snapshots, root, "Going back");
            } else {
                appendSnapshot(snapshots, root, "Node not found");
                this.visual = '';
            }
        } else if (value > this.value) {
            if (this.right != null) {
                appendSnapshot(snapshots, root, "Going right");
                this.right.delete(value, snapshots);
                this.visual = '';
                appendSnapshot(snapshots, root, "Going back");
            } else {
                appendSnapshot(snapshots, root, "Node not found");
                this.visual = '';
            }
        }
    } else {
        // TODO which equals?
        // remember where ref and where val

        this.visual = 'current';
        appendSnapshot(snapshots, root, "This is the one to delete");

        if (this.left == null && this.right == null) {
            appendSnapshot(snapshots, root, "No children - removing!");

            // remove itself using parent link, but
            // must know if is is left or right
            // every time

            if (this === this.parent.left) {
                this.parent.left = null;
            } else if (this === this.parent.right) {
                this.parent.right = null;
            } else {
                throw new Error();
            }

            appendSnapshot(snapshots, root, "Done");
        } else if (this.left == null && this.right != null) {
            appendSnapshot(snapshots, root, "Child on the right - removing!");

            if (this === this.parent.left) {
                this.right.parent = this.parent;
                this.parent.left = this.right;
            } else if (this === this.parent.right) {
                this.right.parent = this.parent;
                this.parent.right = this.right;
            } else {
                throw new Error();
            }

            appendSnapshot(snapshots, root, "Done");
        } else if (this.left != null && this.right == null) {
            appendSnapshot(snapshots, root, "Child on the left - removing!");

            if (this === this.parent.left) {
                this.left.parent = this.parent;
                this.parent.left = this.left;
            } else if (this === this.parent.right) {
                this.left.parent = this.parent;
                this.parent.right = this.left;
            } else {
                throw new Error();
            }

            appendSnapshot(snapshots, root, "Done");
        } else {
            //http://www.algolist.net/Data_structures/Binary_search_tree/Removal

            appendSnapshot(snapshots, root, "Searching for minimum value in the right subtree...");
            // find a minimum value in the right subtree
            var min = this.right.minValue();

            appendSnapshot(snapshots, root, "We have minimum " + min);
            // replace value of the node to be removed with found min
            this.value = min;
            appendSnapshot(snapshots, root, "Replaced");
            // apply remove to the right subtree to remove a duplicate
            this.visual = 'inorder-immediate';
            appendSnapshot(snapshots, root, "Running remove() on the right subtree");
            this.right.delete(min, snapshots);
            this.visual = '';
            appendSnapshot(snapshots, root, "Going back");
        }
    }
};