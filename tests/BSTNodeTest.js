describe('BSTree()', function () {

    it('should create 0-element tree', function () {
        var tree = new BSTree();

        expect(tree.root).toBe(null);
    });

    it('should create 1-element tree', function () {
        var tree = new BSTree();
        tree.add(7);

        var root = tree.root;
        expect(root.value).toBe(7);
        expect(root.isLeaf()).toBe(true);
    });

    it('should create valid three-element balanced tree', function () {
        var tree = new BSTree();
        tree.addAll([2, 1, 3]);

        var root = tree.root;
        expect(root.value).toBe(2);
        expect(root.isLeaf()).toBe(false);
        expect(root.left.value).toBe(1);
        expect(root.right.value).toBe(3);

        expect(root.left.parent).toBe(root);
        expect(root.right.parent).toBe(root);

        expect(root.left.isLeaf()).toBe(true);
        expect(root.right.isLeaf()).toBe(true);
    });

    it('should create valid only-left tree', function () {
        var tree = new BSTree();
        tree.addAll([4, 3, 2]);

        var root = tree.root;
        expect(root.value).toBe(4);
        expect(root.isLeaf()).toBe(false);

        expect(root.left.value).toBe(3);
        expect(root.left.isLeaf()).toBe(false);
        expect(root.left.parent).toBe(root);

        expect(root.left.left.value).toBe(2);
        expect(root.left.left.parent).toBe(root.left);
        expect(root.left.left.isLeaf()).toBe(true);
    });
});

describe('BSTNode.findRoot', function () {

    it('should find root for 1-element tree', function () {
        var root = new BSTNode(1);

        expect(root.findRoot()).toBe(root);
    });

    it('should find root for 3-element tree', function () {
        var root = new BSTNode(1);
        root.add(0);
        root.add(2);

        expect(root.findRoot()).toBe(root);
        expect(root.left.findRoot()).toBe(root);
        expect(root.right.findRoot()).toBe(root);
    });
});


describe('BSTree.delete leaves', function () {

    it('should delete a left leaf', function () {
        var tree = new BSTree();
        tree.addAll([1, 0, 2]);

        tree.delete(0);

        var root = tree.root;
        expect(root.value).toBe(1);
        expect(root.left).toBeNull();
        expect(root.right.value).toBe(2);
        expect(root.right.parent).toBe(root);
        expect(root.right.isLeaf()).toBe(true);
    });

    it('should delete a right leaf', function () {
        var tree = new BSTree();
        tree.addAll([1, 0, 2]);

        tree.delete(2);

        var root = tree.root;
        expect(root.value).toBe(1);
        expect(root.left.value).toBe(0);
        expect(root.left.parent).toBe(root);
        expect(root.left.isLeaf()).toBe(true);
        expect(root.right).toBeNull();
    });

    it('should delete a left leaf with left child', function () {
        var tree = new BSTree();
        tree.addAll([2, 1, 0]);

        tree.delete(1);

        var root = tree.root;
        expect(root.value).toBe(2);
        expect(root.left.value).toBe(0);
        expect(root.left.parent).toBe(root);
        expect(root.left.isLeaf()).toBe(true);
    });

    it('should delete a left leaf with right child', function () {
        var tree = new BSTree();
        tree.addAll([3, 1, 2]);

        tree.delete(1);

        var root = tree.root;
        expect(root.value).toBe(3);
        expect(root.left.value).toBe(2);
        expect(root.left.parent).toBe(root);
        expect(root.left.isLeaf()).toBe(true);
    });

    it('should delete a right leaf with left child', function () {
        var tree = new BSTree();
        tree.addAll([1, 3, 2]);

        tree.delete(3);

        var root = tree.root;
        expect(root.value).toBe(1);
        expect(root.right.value).toBe(2);
        expect(root.right.parent).toBe(root);
        expect(root.right.isLeaf()).toBe(true);
    });

    it('should delete a right leaf with right child', function () {
        var tree = new BSTree();
        tree.addAll([1, 2, 3]);

        tree.delete(2);

        var root = tree.root;
        expect(root.value).toBe(1);
        expect(root.right.value).toBe(3);
        expect(root.right.parent).toBe(root);
        expect(root.right.isLeaf()).toBe(true);
    });

    it('should delete a parent with two childs only', function () {
        var tree = new BSTree();
        tree.addAll([4, 2, 1, 3]);

        tree.delete(2);

        var root = tree.root;
        expect(root.value).toBe(4);
        expect(root.left.value).toBe(3);
        expect(root.left.parent).toBe(root);
        expect(root.left.left.value).toBe(1);
        expect(root.left.left.parent).toBe(root.left);
        expect(root.left.left.isLeaf()).toBe(true);
    });

    it('should delete a parent with more than 2 childs', function () {
        var tree = new BSTree();
        tree.addAll([9, 5, 4, 7, 6, 8]);

        tree.delete(5);

        var root = tree.root;
        expect(root.value).toBe(9);
        expect(root.left.value).toBe(6);
        expect(root.left.parent).toBe(root);
        expect(root.left.left.value).toBe(4);
        expect(root.left.left.isLeaf()).toBe(true);
        expect(root.left.left.parent).toBe(root.left);
        expect(root.left.right.value).toBe(7);
        expect(root.left.right.parent).toBe(root.left);
        expect(root.left.right.right.value).toBe(8);
        expect(root.left.right.right.isLeaf()).toBe(true);
    });
});

describe('BSTree.delete root', function () {

    it('should delete root from 1-element tree', function () {
        var tree = new BSTree();
        tree.add(1);

        tree.delete(1);

        expect(tree.root).toBeNull();
    });

    it('should delete root from 2-element left tree', function () {
        var tree = new BSTree();
        tree.addAll([2, 1]);

        tree.delete(2);

        expect(tree.root.value).toBe(1);
        expect(tree.root.isLeaf()).toBe(true);
    });

    it('should delete root from 2-element right tree', function () {
        var tree = new BSTree();
        tree.addAll([1, 2]);

        tree.delete(1);

        expect(tree.root.value).toBe(2);
        expect(tree.root.isLeaf()).toBe(true);
    });

    it('should delete root from 3-element balanced tree', function () {
        var tree = new BSTree();
        tree.addAll([2, 1, 3]);

        tree.delete(2);

        var root = tree.root;
        expect(root.value).toBe(3);
        expect(root.left.value).toBe(1);
        expect(root.left.parent).toBe(root);
    });

    it('should delete root from 4-element tree, force finding minimum in the right subtree', function () {
        var tree = new BSTree();
        tree.addAll([2,1,4,3]);

        tree.delete(2);

        var root = tree.root;
        expect(root.value).toBe(3);
        expect(root.left.value).toBe(1);
        expect(root.left.parent).toBe(root);
        expect(root.right.value).toBe(4);
        expect(root.right.parent).toBe(root);
    });

});