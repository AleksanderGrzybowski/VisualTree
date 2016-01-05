/// <reference path="BSTNode.ts" />
declare var SNC:any;

class BSTree {

    root:BSTNode;
    
    constructor() {
        this.root = null;
    }

    
    add(value:number) {
        if (this.root === null) {
            this.root = new BSTNode(value);
            SNC.add('Adding root');
        } else {
            this.root.add(value);
        }
    };

    addAll(elements:number[]) {
        for (var i = 0; i < elements.length; ++i) {
            this.add(elements[i]);
        }
    };

    height() {
        return (this.root === null) ? 0 : this.root.height();
    };

    postorder() {
        if (this.root !== null) {
            this.root.postorder();
        }
    };

    preorder() {
        if (this.root !== null) {
            this.root.preorder();
        }
    };

    inorder() {
        if (this.root !== null) {
            this.root.inorder();
        }
    };

    delete(value:number) { // TODO rename this
        if (this.root === null) {
            return;
        }
        
        if (this.root.value === value) { // removing root
            this.root.visual = 'current'; // no need to revert it - will be deleted
            SNC.add('Deleting root');
            
            if (this.root.left === null && this.root.right === null) {
                // TODO here root is not preserved, so SNC can't track it...
                this.root = null;
                SNC.add('');
            } else if (this.root.left === null && this.root.right !== null) {
                SNC.add('Child on the right - removing!');

                this.root = this.root.right;
                this.root.parent = null;

                SNC.add('Done');
            } else if (this.root.left !== null && this.root.right === null) {
                SNC.add('Child on the left - removing!');

                this.root = this.root.left;
                this.root.parent = null;

                SNC.add('Done');
            } else {
                // we can delegate to BSTNode.delete, cause
                // deletion of 2-children-element
                // modifies value of root, links to root
                // are preserved

                this.root.delete(value);
            }
        } else {
            this.root.delete(value); // will surely go left or right
        }
    };
}
