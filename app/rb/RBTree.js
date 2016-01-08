function RBTree() {
    this.root = null;

    this.height = COMMON.treeHeight;

    this.add = function (value) {
        // TODO
        // I am not sure why it doesn't fail
        // we add .tree property only to the root
        // at the moment of creation
        // what happens if root is rotated?
        if (this.root === null) {
            SNC.add('Adding root, coloring it black');
            this.root = new RBNode(value);
            this.root.color = 'black';
            this.root.tree = this; // !!!
            SNC.add('Added');
        } else {
            this.root.add(value);
        }
    };

    this.addAll = COMMON.addAll;

    this.rotateLeftRoot = COMMON.rotateLeftRoot;
    this.rotateRightRoot = COMMON.rotateRightRoot;
}
