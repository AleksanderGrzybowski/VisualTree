function SplayTree() {
    this.root = null;

    var self = this;

    this.height = COMMON.treeHeight;
    
    // warning: this method is only because
    // we want to test just the splay operation    
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
    
    this.addAll = COMMON.addAll;


    this.rotateLeftRoot = COMMON.rotateLeftRoot;
    this.rotateRightRoot = COMMON.rotateRightRoot;

    this.find = function (value) {
        if (this.root === null) {
            return;
        }
        
        if (this.root.value === value) {
            SNC.add('Found at root');
        } else {
            this.root.find(value);
        }
    };
}