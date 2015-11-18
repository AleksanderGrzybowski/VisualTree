function SplayNode(value) {

    this.left = null;
    this.right = null;
    this.parent = null;
    this.value = value;

    this.visual = '';

    this.tree = undefined; // set in add

    this.isLeaf = function () {
        return this.left === null && this.right === null;
    };
   
    this.splay = function () {
        if (this.parent.parent === null) { // 'zig'
            if (this.parent.left === this) { // left child
                this.parent.rotateRight();
            } else {
                this.parent.rotateLeft();
            }
        } else if (this.parent.left === this && this.parent.parent.left === this.parent) { // all-left to all-right z-z
            this.parent.parent.rotateRight();
            this.parent.rotateRight();
        } else if (this.parent.right === this && this.parent.parent.right === this.parent) { // all-right to all-left z-z
            this.parent.parent.rotateLeft();
            this.parent.rotateLeft();
        }
    };

    // TODO tidy up copypasta
    this.add = function (value, tree) {
        if (value < this.value) {
            if (this.left === null) {
                this.left = new SplayNode(value);
                this.tree = tree;
                this.left.parent = this;
            } else {
                this.left.add(value, tree);
            }
        } else if (value > this.value) {
            if (this.right === null) {
                this.right = new SplayNode(value);
                this.tree = tree;
                this.right.parent = this;
            } else {
                this.right.add(value, tree);
            }
        } 

        return this;
    };

    this.rotateLeft = function () {
        if (this.parent === null) { // rotating root
            this.tree.rotateLeftRoot();
            return;
        }

        var g = this.parent;
        var p = this;
        var n = this.right;
        var savedLeftN = n.left;

        if (p === g.left) {
            g.left = n;
        } else {
            g.right = n;
        }
        n.parent = g;
        n.left = p;
        p.parent = n;
        p.right = savedLeftN;
        savedLeftN.parent = p;
    };

    this.rotateRight = function () {
        SNC.add('Rotating right');
        if (this.parent === null) { // rotating root
            this.tree.rotateRightRoot();
            return;
        }

        var g = this.parent;
        var p = this;
        var n = this.left;
        var savedRightN = n.right;

        if (p === g.left) {
            g.left = n;
        } else {
            g.right = n;
        }

        n.parent = g;
        n.right = p;
        p.parent = n;
        p.left = savedRightN;
        savedRightN.parent = p;
    };
}