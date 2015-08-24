function RBTree() {
    this.root = null;
}

RBTree.prototype.add = function (value) {
    if (this.root === null) {
        this.root = new RBNode(value);
        this.root.tree = this; // !!!
    } else {
       this.root.add(value);
    }
};

RBTree.prototype.rotateLeftRoot = function () {
    // https://upload.wikimedia.org/wikipedia/commons/2/23/Tree_rotation.png

    var b = this.root.right.left;
    this.root.right.left  = this.root;
    this.root.right.left.parent = this.root.right;

    this.root = this.root.right;
    this.root.parent = null;
    this.root.left.right = b;
    this.root.left.right.parent = this.root.left;
};

RBTree.prototype.rotateRightRoot = function () {
    var b = this.root.left.right;
    this.root.left.right = this.root;
    this.root.left.right.parent = this.root.left;

    this.root = this.root.left;
    this.root.parent = null;
    this.root.right.left = b;
    this.root.right.left.parent = this.root.right;
};