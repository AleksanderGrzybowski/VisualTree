/// <reference path="SplayNode.ts" />
var SplayTree = (function () {
    function SplayTree() {
        this.root = null;
    }
    SplayTree.prototype.treeHeight = function () {
        if (this.root === null) {
            return 0;
        }
        else {
            return this.root.height();
        }
    };
    // warning: this method is only because
    // we want to test just the splay operation    
    SplayTree.prototype.addNoSplay = function (value) {
        if (this.root === null) {
            this.root = new SplayNode(value);
            this.root.tree = this; // !!!
        }
        else {
            this.root.addNoSplay(value, this);
        }
    };
    ;
    SplayTree.prototype.add = function (value) {
        if (this.root === null) {
            this.root = new SplayNode(value);
            this.root.tree = this; // !!!
            SNC.add('Adding root');
        }
        else {
            this.root.add(value, this);
        }
    };
    ;
    // this image https://en.wikipedia.org/wiki/Tree_rotation is misleading!
    // while rotating right, B changes parent,
    // but B can be null!
    // same thing for rotating left 
    SplayTree.prototype.rotateLeftRoot = function () {
        var b = this.root.right.left;
        this.root.right.left = this.root;
        this.root.right.left.parent = this.root.right;
        this.root = this.root.right;
        this.root.parent = null;
        this.root.left.right = b;
        if (this.root.left.right !== null) {
            this.root.left.right.parent = this.root.left;
        }
    };
    ;
    SplayTree.prototype.rotateRightRoot = function () {
        var b = this.root.left.right;
        this.root.left.right = this.root;
        this.root.left.right.parent = this.root.left;
        this.root = this.root.left;
        this.root.parent = null;
        this.root.right.left = b;
        if (this.root.right.left !== null) {
            this.root.right.left.parent = this.root.right;
        }
    };
    ;
    SplayTree.prototype.find = function (value) {
        if (this.root === null) {
            return;
        }
        if (this.root.value === value) {
            SNC.add('Found at root');
        }
        else {
            this.root.find(value);
        }
    };
    return SplayTree;
})();
//# sourceMappingURL=SplayTree.js.map