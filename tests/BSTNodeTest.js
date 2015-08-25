describe('BSTree constructor', function () {

    it('should create 1-element tree', function () {
        var tree = new BSTree();
        tree.add(7);

        expect(tree.root.value).toBe(7);
        expect(tree.root.isLeaf()).toBe(true);
    });

    it('should create valid three-element balanced tree', function () {
        var tree = new BSTree();
        tree.add(2);
        tree.add(1);
        tree.add(3);

        expect(tree.root.left.value).toBe(1);
        expect(tree.root.right.value).toBe(3);

        expect(tree.root.left.parent).toBe(tree.root);
        expect(tree.root.right.parent).toBe(tree.root);

        expect(tree.root.left.isLeaf()).toBe(true);
        expect(tree.root.right.isLeaf()).toBe(true);
    });

    it('should create valid only-left tree', function () {
        var tree = new BSTree();
        tree.add(4);
        tree.root.add(3);
        tree.root.add(2);

        expect(tree.root.value).toBe(4);
        expect(tree.root.left.value).toBe(3);
        expect(tree.root.left.parent).toBe(tree.root);
        expect(tree.root.left.left.value).toBe(2);
        expect(tree.root.left.left.parent).toBe(tree.root.left);
        expect(tree.root.left.left.isLeaf()).toBe(true);
    })
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


describe('BSTree.delete', function () {

    it('should delete a left leaf', function () {
        var tree = new BSTree();
        tree.add(1);
        tree.add(0);
        tree.add(2);

        tree.delete(0);

        expect(tree.root.value).toBe(1);
        expect(tree.root.left).toBeNull();
        expect(tree.root.right.value).toBe(2);
        expect(tree.root.right.parent).toBe(tree.root);
        expect(tree.root.right.isLeaf()).toBe(true);
    });

    it('should delete a right leaf', function () {
        var tree = new BSTree();
        tree.add(1);
        tree.add(0);
        tree.add(2);

        tree.delete(2);

        expect(tree.root.value).toBe(1);
        expect(tree.root.left.value).toBe(0);
        expect(tree.root.left.parent).toBe(tree.root);
        expect(tree.root.left.isLeaf()).toBe(true);
        expect(tree.root.right).toBeNull();
    });

    it('should delete a left leaf with left child', function () {
        var tree = new BSTree();
        tree.add(2);
        tree.add(1);
        tree.add(0);

        tree.delete(1);

        expect(tree.root.value).toBe(2);
        expect(tree.root.left.value).toBe(0);
        expect(tree.root.left.parent).toBe(tree.root);
        expect(tree.root.left.isLeaf()).toBe(true);
    });

    it('should delete a left leaf with right child', function () {
        var tree = new BSTree();
        tree.add(3);
        tree.add(1);
        tree.add(2);

        tree.delete(1);

        expect(tree.root.value).toBe(3);
        expect(tree.root.left.value).toBe(2);
        expect(tree.root.left.parent).toBe(tree.root);
        expect(tree.root.left.isLeaf()).toBe(true);
    });

    it('should delete a right leaf with left child', function () {
        var tree = new BSTree();
        tree.add(1);
        tree.add(3);
        tree.add(2);

        tree.delete(3);

        expect(tree.root.value).toBe(1);
        expect(tree.root.right.value).toBe(2);
        expect(tree.root.right.parent).toBe(tree.root);
        expect(tree.root.right.isLeaf()).toBe(true);
    });

    it('should delete a right leaf with right child', function () {
        var tree = new BSTree();
        tree.add(1);
        tree.add(2);
        tree.add(3);

        tree.delete(2);

        expect(tree.root.value).toBe(1);
        expect(tree.root.right.value).toBe(3);
        expect(tree.root.right.parent).toBe(tree.root);
        expect(tree.root.right.isLeaf()).toBe(true);
    });

    it('should delete a parent with two childs only', function () {
        var tree = new BSTree();
        tree.add(4);
        tree.add(2);
        tree.add(1);
        tree.add(3);

        tree.delete(2);

        expect(tree.root.value).toBe(4);
        expect(tree.root.left.value).toBe(3);
        expect(tree.root.left.parent).toBe(tree.root);
        expect(tree.root.left.left.value).toBe(1);
        expect(tree.root.left.left.parent).toBe(tree.root.left);
        expect(tree.root.left.left.isLeaf()).toBe(true);
    });

    it('should delete a parent with more than 2 childs', function () {
        var tree = new BSTree();
        tree.add(9);
        tree.add(5);
        tree.add(4);
        tree.add(7);
        tree.add(6);
        tree.add(8);

        tree.delete(5);

        expect(tree.root.value).toBe(9);
        expect(tree.root.left.value).toBe(6);
        expect(tree.root.left.parent).toBe(tree.root);
        expect(tree.root.left.left.value).toBe(4);
        expect(tree.root.left.left.isLeaf()).toBe(true);
        expect(tree.root.left.left.parent).toBe(tree.root.left);
        expect(tree.root.left.right.value).toBe(7);
        expect(tree.root.left.right.parent).toBe(tree.root.left);
        expect(tree.root.left.right.right.value).toBe(8);
        expect(tree.root.left.right.right.isLeaf()).toBe(true);
    })
});