function SplayTree() {
    this.root = null;

    var self = this;

    this.height = COMMON.treeHeight;

    this.addNoSplay = function (value) {
        if (this.root === null) {
            this.root = new SplayNode(value);
            this.root.tree = self; // !!!
        } else {
            this.root.addNoSplay(value, self);
        }
    };
    
    this.add = function (value) {
        if (this.root === null) {
            this.root = new SplayNode(value);
            this.root.tree = self; // !!!
            SNC.add('Adding root');
        } else {
            this.root.add(value, self);
        }
    };
    
    this.rotateLeftRoot = function () {
        var b = this.root.right.left;
        this.root.right.left = this.root;
        this.root.right.left.parent = this.root.right;

        this.root = this.root.right;
        this.root.parent = null;
        this.root.left.right = b;
        this.root.left.right.parent = this.root.left;
    };

    this.rotateRightRoot = function () {
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