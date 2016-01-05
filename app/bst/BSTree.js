/// <reference path="BSTNode.ts" />
var BSTree = (function () {
    function BSTree() {
        this.root = null;
    }
    BSTree.prototype.add = function (value) {
        if (this.root === null) {
            this.root = new BSTNode(value);
            SNC.add('Adding root');
        }
        else {
            this.root.add(value);
        }
    };
    ;
    BSTree.prototype.addAll = function (elements) {
        for (var i = 0; i < elements.length; ++i) {
            this.add(elements[i]);
        }
    };
    ;
    BSTree.prototype.height = function () {
        return (this.root === null) ? 0 : this.root.height();
    };
    ;
    BSTree.prototype.postorder = function () {
        if (this.root !== null) {
            this.root.postorder();
        }
    };
    ;
    BSTree.prototype.preorder = function () {
        if (this.root !== null) {
            this.root.preorder();
        }
    };
    ;
    BSTree.prototype.inorder = function () {
        if (this.root !== null) {
            this.root.inorder();
        }
    };
    ;
    BSTree.prototype.delete = function (value) {
        if (this.root === null) {
            return;
        }
        if (this.root.value === value) {
            this.root.visual = 'current'; // no need to revert it - will be deleted
            SNC.add('Deleting root');
            if (this.root.left === null && this.root.right === null) {
                // TODO here root is not preserved, so SNC can't track it...
                this.root = null;
                SNC.add('');
            }
            else if (this.root.left === null && this.root.right !== null) {
                SNC.add('Child on the right - removing!');
                this.root = this.root.right;
                this.root.parent = null;
                SNC.add('Done');
            }
            else if (this.root.left !== null && this.root.right === null) {
                SNC.add('Child on the left - removing!');
                this.root = this.root.left;
                this.root.parent = null;
                SNC.add('Done');
            }
            else {
                // we can delegate to BSTNode.delete, cause
                // deletion of 2-children-element
                // modifies value of root, links to root
                // are preserved
                this.root.delete(value);
            }
        }
        else {
            this.root.delete(value); // will surely go left or right
        }
    };
    ;
    return BSTree;
})();
//# sourceMappingURL=BSTree.js.map