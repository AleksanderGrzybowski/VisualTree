var COMMON = {
    /**
     * @param {number[]} elements
     */
    addAll: function (elements) {
        for (var i = 0; i < elements.length; ++i) {
            this.add(elements[i]);
        }
    },
    
    /**
     * @returns {boolean}
     */
    isLeaf: function () {
        return this.left === null && this.right === null;
    },
    
    /**
     * @returns {number}
     */
    nodeHeight: function () {
        if (this.left === null && this.right === null) {
            return 1;
        } else {
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
    },

    /**
     * @returns {number}
     */
    treeHeight: function () {
        if (this.root === null) {
            return 0;
        } else {
            return this.root.height();
        }
    },

    // this image https://en.wikipedia.org/wiki/Tree_rotation is misleading!
    // while rotating right, B changes parent,
    // but B can be null!
    // same thing for rotating left 

    rotateLeftRoot: function () {
        var b = this.root.right.left;
        this.root.right.left = this.root;
        this.root.right.left.parent = this.root.right;

        this.root = this.root.right;
        this.root.parent = null;
        this.root.left.right = b;

        if (this.root.left.right !== null) {
            this.root.left.right.parent = this.root.left;
        }
    },
    rotateRightRoot: function () {
        var b = this.root.left.right;
        this.root.left.right = this.root;
        this.root.left.right.parent = this.root.left;

        this.root = this.root.left;
        this.root.parent = null;
        this.root.right.left = b;

        if (this.root.right.left !== null) {
            this.root.right.left.parent = this.root.right;
        }
    },
    
    rotateLeft: function () {
        if (this.parent === null) { // rotating root
            this.tree.rotateLeftRoot();
            return;
        }

        var g = this.parent;
        var p = this;
        var n = this.right;
        var savedLeftN = n.left;

        if (p === g.left) {
            g.left = n;
        } else {
            g.right = n;
        }
        n.parent = g;
        n.left = p;
        p.parent = n;
        p.right = savedLeftN;
        if (savedLeftN !== null) {
            savedLeftN.parent = p; // TODO not sure if we need the same check as in root rotations
        }
    },
    
    rotateRight: function () {
        if (this.parent === null) { // rotating root
            this.tree.rotateRightRoot();
            return;
        }

        var g = this.parent;
        var p = this;
        var n = this.left;
        var savedRightN = n.right;

        if (p === g.left) {
            g.left = n;
        } else {
            g.right = n;
        }

        n.parent = g;
        n.right = p;
        p.parent = n;
        p.left = savedRightN;
        if (savedRightN !== null) {
            savedRightN.parent = p; // TODO not sure if we need the same check as in root rotations
        }
    }
};
