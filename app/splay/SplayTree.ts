/// <reference path="SplayNode.ts" />

class SplayTree {
    
    constructor() {

        this.root = null;
    }

    root: SplayNode;
    

    treeHeight() {
        if (this.root === null) {
            return 0;
        } else {
            return this.root.height();
        }
    }
    
    // warning: this method is only because
    // we want to test just the splay operation    
    addNoSplay (value: number) {
    var self = this;
        if (this.root === null) {
            this.root = new SplayNode(value);
            this.root.tree = self; // !!!
        } else {
            this.root.addNoSplay(value, self);
        }
    };
    
    add (value:number) {
    var self = this;
        if (this.root === null) {
            this.root = new SplayNode(value);
            this.root.tree = self; // !!!
            SNC.add('Adding root');
        } else {
            this.root.add(value, self);
        }
    };

    // this image https://en.wikipedia.org/wiki/Tree_rotation is misleading!
    // while rotating right, B changes parent,
    // but B can be null!
    // same thing for rotating left 
    
    rotateLeftRoot() {
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

    rotateRightRoot () {
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

    find (value: number) {
        if (this.root === null) {
            return;
        }
        
        if (this.root.value === value) {
            SNC.add('Found at root');
        } else {
            this.root.find(value);
        }
    }
}