var COMMON = {
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
    treeHeight: function () {
        if (this.root === null) {
            return 0;
        } else {
            return this.root.height();
        }
    }
};