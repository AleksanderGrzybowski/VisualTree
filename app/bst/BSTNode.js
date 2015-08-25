/**
 * @param {number} value
 * @constructor
 */
function BSTNode(value) {
    this.left = null;
    this.right = null;
    this.parent = null;
    this.value = value;

    this.visual = '';
}

/**
 * @returns {boolean}
 */
BSTNode.prototype.isLeaf = function () {
    return this.left === null && this.right === null;
};

/**
 * @returns {BSTNode}
 */
BSTNode.prototype.findRoot = function () {
    var node = this;

    while (node.parent !== null) {
        node = node.parent;
    }

    return node;
};

/**
 * @param {number} value
 * @returns {BSTNode}
 */
BSTNode.prototype.add = function (value) {
    this.visual = 'current';
    SNC.add('Visiting node ' + this.value);

    if (value < this.value) {
        if (this.left === null) {
            this.left = new BSTNode(value);
            this.left.parent = this;

            this.left.visual = 'current';
            this.visual = '';
            SNC.add('Creating new on the left');
            this.left.visual = '';
            SNC.add('Done');
        } else {
            SNC.add('Item to add is smaller than current, going left');
            this.visual = '';
            this.left.add(value);
        }
    } else if (value > this.value) {
        if (this.right === null) {
            this.right = new BSTNode(value);
            this.right.parent = this;

            this.right.visual = 'current';
            this.visual = '';
            SNC.add('Creating new on the right');
            this.right.visual = '';
            SNC.add('Done');
        } else {
            SNC.add('Item to add is larger than current, going right');
            this.visual = '';
            this.right.add(value);
        }
    } else {
        this.visual = 'current';
        SNC.add('Found duplicate, nothing to do.');
        this.visual = '';
        SNC.add('Found duplicate, nothing to do.');
    }

    return this;
};

BSTNode.prototype.inorder = function () {
    if (this.left !== null) {
        this.visual = 'intermediate';
        SNC.add('Going left');

        this.left.inorder();
    }

    this.visual = 'current';
    SNC.add('Visiting ' + this.value);

    if (this.right !== null) {
        this.visual = 'intermediate';
        SNC.add('Going right');

        this.right.inorder();
    }

    this.visual = '';
    SNC.add('Going back');
};

/**
 * @returns {number}
 */
BSTNode.prototype.minValue = function () {
    if (this.left === null) {
        return this.value;
    } else {
        return this.left.minValue();
    }
};

/**
 * @param {number} value
 */
BSTNode.prototype.delete = function (value) {
    this.visual = 'intermediate';
    SNC.add('Is this the one to delete? ' + this.value);

    if (this.value !== value) {
        SNC.add('This is not the one to delete, going left or right?');

        if (value < this.value) {
            SNC.add('Going left');

            if (this.left !== null) {
                this.left.delete(value);
                this.visual = '';
                SNC.add('Going back');
            } else {
                SNC.add('Node not found on the left');
                this.visual = '';
                SNC.add('Going back');
            }
        } else if (value > this.value) {
            SNC.add('Going right');

            if (this.right !== null) {
                this.right.delete(value);
                this.visual = '';
                SNC.add('Going back');
            } else {
                SNC.add('Node not found on the right');
                this.visual = '';
                SNC.add('Going back');
            }
        }
    } else {
        // TODO which equals?
        // remember where ref and where val

        this.visual = 'current';
        SNC.add('This is the one to delete');

        if (this.left === null && this.right === null) {
            SNC.add('No children - removing!');

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

            SNC.add('Done');
        } else if (this.left === null && this.right !== null) {
            SNC.add('Child on the right - removing!');

            if (this === this.parent.left) {
                this.right.parent = this.parent;
                this.parent.left = this.right;
            } else if (this === this.parent.right) {
                this.right.parent = this.parent;
                this.parent.right = this.right;
            } else {
                throw new Error();
            }

            SNC.add('Done');
        } else if (this.left !== null && this.right === null) {
            SNC.add('Child on the left - removing!');

            if (this === this.parent.left) {
                this.left.parent = this.parent;
                this.parent.left = this.left;
            } else if (this === this.parent.right) {
                this.left.parent = this.parent;
                this.parent.right = this.left;
            } else {
                throw new Error();
            }

            SNC.add('Done');
        } else {
            //http://www.algolist.net/Data_structures/Binary_search_tree/Removal

            SNC.add('Searching for minimum value in the right subtree...');
            var min = this.right.minValue();

            SNC.add('We have minimum ' + min);

            // replace value of the node to be removed with found min
            this.value = min;
            SNC.add('Replace current node value with found minimum');
            // apply remove to the right subtree to remove a duplicate

            this.visual = 'intermediate';
            SNC.add('Running remove recursively on the right subtree');
            this.right.delete(min);
            this.visual = '';
            SNC.add('Going back');
        }
    }
};