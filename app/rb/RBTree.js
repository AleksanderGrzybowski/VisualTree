function RBTree() {
    this.root = null;

    this.height = COMMON.treeHeight;

    this.add = function (value) {
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

    this.addAll = function (arr) {
        for (var i = 0; i < arr.length; ++i) {
            this.add(arr[i]);
        }
    };

    this.rotateLeftRoot = function () {
        // https://upload.wikimedia.org/wikipedia/commons/2/23/Tree_rotation.png

        SNC.add('Rotating root left');
        var b = this.root.right.left;
        this.root.right.left = this.root;
        this.root.right.left.parent = this.root.right;

        this.root = this.root.right;
        this.root.parent = null;
        this.root.left.right = b;
        this.root.left.right.parent = this.root.left;

        SNC.add('Finished rotating root left');
    };

    this.rotateRightRoot = function () {
        SNC.add('Rotating root right');

        var b = this.root.left.right;
        this.root.left.right = this.root;
        this.root.left.right.parent = this.root.left;

        this.root = this.root.left;
        this.root.parent = null;
        this.root.right.left = b;
        this.root.right.left.parent = this.root.right;

        SNC.add('Finished rotating root right');
    };
}
