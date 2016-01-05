/// <reference path="SplayTree.ts" />
var SplayNode = (function () {
    function SplayNode(value) {
        this.value = value;
        this.left = null;
        this.right = null;
        this.parent = null;
        this.visual = '';
    }
    SplayNode.prototype.height = function () {
        if (this.left === null && this.right === null) {
            return 1;
        }
        else {
            var heightLeft = 0;
            var heightRight = 0;
            if (this.left !== null) {
                heightLeft = 1 + this.left.height();
            }
            if (this.right !== null) {
                heightRight = 1 + this.right.height();
            }
            return Math.max(heightLeft, heightRight);
        }
    };
    SplayNode.prototype.isLeaf = function () {
        return this.left === null && this.right === null;
    };
    ;
    // warning: this method is only because
    // we want to test just the splay operation
    SplayNode.prototype.addNoSplay = function (value, tree) {
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
            }
            else {
                SNC.add('Item to add is smaller than current, going left');
                this.visual = '';
                this.left.addNoSplay(value, tree);
            }
        }
        else if (value > this.value) {
            if (this.right === null) {
                this.right = new SplayNode(value);
                this.right.tree = tree;
                this.right.parent = this;
                this.right.visual = 'current';
                this.visual = '';
                SNC.add('Creating new on the right');
                this.right.visual = '';
                SNC.add('Done');
            }
            else {
                SNC.add('Item to add is larger than current, going right');
                this.visual = '';
                this.right.addNoSplay(value, tree);
            }
        }
        else {
            this.visual = 'current';
            SNC.add('Found duplicate, nothing to do.');
            this.visual = '';
            SNC.add('Found duplicate, nothing to do.');
        }
        return this;
    };
    ;
    SplayNode.prototype.splay = function () {
        var p, g;
        if (this.parent.parent === null) {
            if (this.parent.left === this) {
                this.parent.rotateRight();
            }
            else {
                this.parent.rotateLeft();
            }
        }
        else if (this.parent.left === this && this.parent.parent.left === this.parent) {
            this.parent.parent.rotateRight();
            this.parent.rotateRight();
        }
        else if (this.parent.right === this && this.parent.parent.right === this.parent) {
            this.parent.parent.rotateLeft();
            this.parent.rotateLeft();
        }
        else if (this.parent.right === this && this.parent.parent.left === this.parent) {
            p = this.parent;
            g = this.parent.parent;
            p.rotateLeft();
            g.rotateRight();
        }
        else if (this.parent.left === this && this.parent.parent.right === this.parent) {
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
    ;
    // TODO tidy up copypasta
    SplayNode.prototype.add = function (value, tree) {
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
            }
            else {
                SNC.add('Item to add is smaller than current, going left');
                this.visual = '';
                this.left.add(value, tree);
            }
        }
        else if (value > this.value) {
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
            }
            else {
                SNC.add('Item to add is larger than current, going right');
                this.visual = '';
                this.right.add(value, tree);
            }
        }
        else {
            this.visual = 'current';
            SNC.add('Found duplicate, nothing to do.');
            this.visual = '';
            SNC.add('Found duplicate, nothing to do.');
        }
        return this;
    };
    ;
    SplayNode.prototype.rotateLeft = function () {
        if (this.parent === null) {
            this.tree.rotateLeftRoot();
            return;
        }
        var g = this.parent;
        var p = this;
        var n = this.right;
        var savedLeftN = n.left;
        if (p === g.left) {
            g.left = n;
        }
        else {
            g.right = n;
        }
        n.parent = g;
        n.left = p;
        p.parent = n;
        p.right = savedLeftN;
        if (savedLeftN !== null) {
            savedLeftN.parent = p; // TODO not sure if we need the same check as in root rotations
        }
    };
    ;
    SplayNode.prototype.rotateRight = function () {
        if (this.parent === null) {
            this.tree.rotateRightRoot();
            return;
        }
        var g = this.parent;
        var p = this;
        var n = this.left;
        var savedRightN = n.right;
        if (p === g.left) {
            g.left = n;
        }
        else {
            g.right = n;
        }
        n.parent = g;
        n.right = p;
        p.parent = n;
        p.left = savedRightN;
        if (savedRightN !== null) {
            savedRightN.parent = p; // TODO not sure if we need the same check as in root rotations
        }
    };
    ;
    SplayNode.prototype.find = function (value) {
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
                }
                else {
                    SNC.add('Node not found on the left');
                    this.visual = '';
                    SNC.add('Going back');
                }
            }
            else if (value > this.value) {
                SNC.add('Going right');
                this.visual = '';
                if (this.right !== null) {
                    this.right.find(value);
                    this.visual = '';
                    SNC.add('Going back');
                }
                else {
                    SNC.add('Node not found on the right');
                    this.visual = '';
                    SNC.add('Going back');
                }
            }
        }
        else {
            SNC.add('Found node ' + this.value + '!');
            this.visual = '';
            this.splay();
        }
    };
    return SplayNode;
})();
//# sourceMappingURL=SplayNode.js.map