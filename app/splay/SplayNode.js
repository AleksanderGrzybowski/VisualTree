function SplayNode(value) {

    this.left = null;
    this.right = null;
    this.parent = null;
    this.value = value;

    this.visual = '';

    this.tree = undefined; // set in add

    this.height = COMMON.nodeHeight;

    this.isLeaf = COMMON.isLeaf;

    // warning: this method is only because
    // we want to test just the splay operation
    this.addNoSplay = function (value, tree) {
        this.visual = 'current';
        SNC.add('Visiting node ' + this.value);

        if (value < this.value) {
            if (this.left === null) {
                this.left = new SplayNode(value);
                this.left.tree = tree;
                this.left.parent = this;

                this.left.visual = 'current';
                this.visual = '';
                SNC.add('Creating new on the left');
                this.left.visual = '';
                SNC.add('Done');
            } else {
                SNC.add('Item to add is smaller than current, going left');
                this.visual = '';

                this.left.addNoSplay(value, tree);
            }
        } else if (value > this.value) {
            if (this.right === null) {
                this.right = new SplayNode(value);
                this.right.tree = tree;
                this.right.parent = this;

                this.right.visual = 'current';
                this.visual = '';
                SNC.add('Creating new on the right');
                this.right.visual = '';
                SNC.add('Done');
            } else {
                SNC.add('Item to add is larger than current, going right');
                this.visual = '';

                this.right.addNoSplay(value, tree);
            }
        } else {
            this.visual = 'current';
            SNC.add('Found duplicate, nothing to do.');
            this.visual = '';
            SNC.add('Found duplicate, nothing to do.');
        }

        return this;
    };

    this.splay = function () {
        var p, g;
        if (this.parent.parent === null) { // 'zig'
            if (this.parent.left === this) { // left child
                this.parent.rotateRight();
            } else { // right child
                this.parent.rotateLeft();
            }
        } else if (this.parent.left === this && this.parent.parent.left === this.parent) { // all-left to all-right zig-zig
            this.parent.parent.rotateRight();
            this.parent.rotateRight();
        } else if (this.parent.right === this && this.parent.parent.right === this.parent) { // all-right to all-left zig-zig
            this.parent.parent.rotateLeft();
            this.parent.rotateLeft();
        } else if (this.parent.right === this && this.parent.parent.left === this.parent) { // all-left zig-zag
            p = this.parent;
            g = this.parent.parent;
            p.rotateLeft();
            g.rotateRight();
        } else if (this.parent.left === this && this.parent.parent.right === this.parent) { // all-right zig-zag
            p = this.parent;
            g = this.parent.parent;
            p.rotateRight();
            g.rotateLeft();
        }

        // yeah! beauty!
        if (this.parent !== null) {
            this.splay();
        }
    };

    // TODO tidy up copypasta
    this.add = function (value, tree) {
        this.visual = 'current';
        SNC.add('Visiting node ' + this.value);

        if (value < this.value) {
            if (this.left === null) {
                this.left = new SplayNode(value);
                this.left.tree = tree;
                this.left.parent = this;

                this.left.visual = 'current';
                this.visual = '';
                SNC.add('Creating new on the left');
                this.left.visual = '';
                this.left.splay();
                SNC.add('Splaying');
                SNC.add('Done');
            } else {
                SNC.add('Item to add is smaller than current, going left');
                this.visual = '';

                this.left.add(value, tree);
            }
        } else if (value > this.value) {
            if (this.right === null) {
                this.right = new SplayNode(value);
                this.right.tree = tree;
                this.right.parent = this;

                this.right.visual = 'current';
                this.visual = '';
                SNC.add('Creating new on the right');
                this.right.visual = '';
                this.right.splay();
                SNC.add('Splaying');
                SNC.add('Done');
            } else {
                SNC.add('Item to add is larger than current, going right');
                this.visual = '';

                this.right.add(value, tree);
            }
        } else {
            this.visual = 'current';
            SNC.add('Found duplicate, nothing to do.');
            this.visual = '';
            SNC.add('Found duplicate, nothing to do.');
        }

        return this;
    };

    this.rotateLeft = COMMON.rotateLeft;
    this.rotateRight = COMMON.rotateRight;

    this.find = function (value) {
        this.visual = 'intermediate';
        SNC.add('Visiting node ' + this.value);

        if (this.value !== value) {
            if (value < this.value) {
                SNC.add('Going left');
                this.visual = '';

                if (this.left !== null) {
                    this.left.find(value);
                    this.visual = '';
                    SNC.add('Going back');
                } else {
                    SNC.add('Node not found on the left');
                    this.visual = '';
                    SNC.add('Going back');
                }
            } else if (value > this.value) {
                SNC.add('Going right');
                this.visual = '';

                if (this.right !== null) {
                    this.right.find(value);
                    this.visual = '';
                    SNC.add('Going back');
                } else {
                    SNC.add('Node not found on the right');
                    this.visual = '';
                    SNC.add('Going back');
                }
            }
        } else {
            SNC.add('Found node ' + this.value + '!');
            this.visual = '';
            this.splay();
        }

    };
}