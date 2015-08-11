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
 * @returns {boolean}
 */
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
 * @param {SnapshotCollector} snc
 * @returns {BTreeNode}
 */
BTreeNode.prototype.add = function (value, snc) {
    this.visual = 'current';
    snc.add('Visiting node ' + this.value);

    if (value < this.value) {
        if (this.left === null) {
            this.left = new BTreeNode(value);
            this.left.parent = this;

            this.left.visual = 'current';
            this.visual = '';
            snc.add('Creating new on the left');
            this.left.visual = '';
            snc.add('Done');
        } else {
            snc.add('Item to add is smaller than current, going left');
            this.visual = '';
            this.left.add(value, snc);
        }
    } else if (value > this.value) {
        if (this.right === null) {
            this.right = new BTreeNode(value);
            this.right.parent = this;

            this.right.visual = 'current';
            this.visual = '';
            snc.add('Creating new on the right');
            this.right.visual = '';
            snc.add('Done');
        } else {
            snc.add('Item to add is larger than current, going right');
            this.visual = '';
            this.right.add(value, snc);
        }
    } else {
        this.visual = 'current';
        snc.add('Found duplicate, nothing to do.');
        this.visual = '';
        snc.add('Found duplicate, nothing to do.');
    }

    return this;
};

/**
 * @param {SnapshotCollector} snc
 */
BTreeNode.prototype.inorder = function (snc) {
    if (this.left !== null) {
        this.visual = 'inorder-immediate';
        snc.add('Going left');

        this.left.inorder(snc);
    }

    this.visual = 'current';
    snc.add("Visiting " + this.value);

    if (this.right !== null) {
        this.visual = 'inorder-immediate';
        snc.add('Going right');

        this.right.inorder(snc);
    }

    this.visual = '';
    snc.add("Going back");
};

/**
 * @returns {number}
 */
BTreeNode.prototype.minValue = function () {
    if (this.left === null) {
        return this.value;
    } else {
        return this.left.minValue();
    }
};

/**
 * @param {number} value
 * @param {SnapshotCollector} snc
 */
BTreeNode.prototype.delete = function (value, snc) {
    this.visual = 'inorder-immediate';
    snc.add("Is this the one to delete? " + this.value);

    if (this.value !== value) {
        snc.add("This is not the one to delete, going left or right?");

        if (value < this.value) {
            snc.add("Going left");

            if (this.left !== null) {
                this.left.delete(value, snc);
                this.visual = '';
                snc.add("Going back");
            } else {
                snc.add("Node not found on the left");
                this.visual = '';
                snc.add("Going back");
            }
        } else if (value > this.value) {
            snc.add("Going right");

            if (this.right !== null) {
                this.right.delete(value, snc);
                this.visual = '';
                snc.add("Going back");
            } else {
                snc.add("Node not found on the right");
                this.visual = '';
                snc.add("Going back");
            }
        }
    } else {
        // TODO which equals?
        // remember where ref and where val

        this.visual = 'current';
        snc.add("This is the one to delete");

        if (this.left === null && this.right === null) {
            snc.add("No children - removing!");

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

            snc.add("Done");
        } else if (this.left === null && this.right !== null) {
            snc.add("Child on the right - removing!");

            if (this === this.parent.left) {
                this.right.parent = this.parent;
                this.parent.left = this.right;
            } else if (this === this.parent.right) {
                this.right.parent = this.parent;
                this.parent.right = this.right;
            } else {
                throw new Error();
            }

            snc.add("Done");
        } else if (this.left !== null && this.right === null) {
            snc.add("Child on the left - removing!");

            if (this === this.parent.left) {
                this.left.parent = this.parent;
                this.parent.left = this.left;
            } else if (this === this.parent.right) {
                this.left.parent = this.parent;
                this.parent.right = this.left;
            } else {
                throw new Error();
            }

            snc.add("Done");
        } else {
            //http://www.algolist.net/Data_structures/Binary_search_tree/Removal

            snc.add("Searching for minimum value in the right subtree...");
            var min = this.right.minValue();

            snc.add("We have minimum " + min);

            // replace value of the node to be removed with found min
            this.value = min;
            snc.add("Replace current node value with found minimum");
            // apply remove to the right subtree to remove a duplicate

            this.visual = 'inorder-immediate';
            snc.add("Running remove recursively on the right subtree");
            this.right.delete(min, snc);
            this.visual = '';
            snc.add("Going back");
        }
    }
};