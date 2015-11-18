function SplayNode(value) {

    this.left = null;
    this.right = null;
    this.parent = null;
    this.value = value;

    this.visual = '';

    this.tree = undefined; // set in add

    this.height = COMMON.nodeHeight;
    
    this.isLeaf = function () {
        return this.left === null && this.right === null;
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