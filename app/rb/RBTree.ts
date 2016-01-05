/// <reference path="RBNode.ts" />

declare var SNC:any;

class RBTree {
    constructor() {
        this.root = null;
    }
    
    root: RBNode;

    treeHeight() {
        if (this.root === null) {
            return 0;
        } else {
            return this.root.height();
        }
    }

    add (value:number) {
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

    addAll (arr: number[]) {
        for (var i = 0; i < arr.length; ++i) {
            this.add(arr[i]);
        }
    };

   rotateLeftRoot () {
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

    rotateRightRoot () {
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
