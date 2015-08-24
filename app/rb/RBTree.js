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