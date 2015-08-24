function BSTree() {
    this.root = null;
}

BSTree.prototype.add = function (value, snc) {
    if (this.root === null) {
        this.root = new BSTNode(value);
        snc.add('Adding root');
    } else {
        this.root.add(value, snc);
    }
};

BSTree.prototype.inorder = function (snc) {
    if (this.root !== null) {
        this.root.inorder(snc);
    }
};

BSTree.prototype.delete = function (value, snc) {
    if (this.root.value === value) { // removing root
        this.root.visual = 'current'; // no need to revert it - will be deleted
        snc.add('Deleting root');
        if (this.root.left === null && this.root.right === null) {
            // TODO here root is not preserved, so SNC can't track it...
            this.root = null;
            snc.add('');
        } else if (this.root.left === null && this.root.right !== null) {
            snc.add('Child on the right - removing!');

            this.root = this.root.right;
            this.root.parent = null;

            snc.add('Done');
        } else if (this.root.left !== null && this.root.right === null) {
            snc.add('Child on the left - removing!');

            this.root = this.root.left;
            this.root.parent = null;

            snc.add('Done');
        } else {
            // we can delegate to BSTNode.delete, cause
            // deletion of 2-children-element
            // modifies value of root, links to root
            // are preserved

            this.root.delete(value, snc);
        }
    } else {
        this.root.delete(value, snc); // will surely go left or right
    }
};