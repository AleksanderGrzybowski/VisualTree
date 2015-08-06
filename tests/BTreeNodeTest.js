describe('Binary tree creation', function () {

    it('should create root-like tree if called as constructor', function () {
        var root = new BTreeNode(7);

        expect(root.value).toBe(7);
        expect(root.isLeaf()).toBe(true);
    });

    it('should create valid three-element balanced tree', function () {
        var root = new BTreeNode(2);
        root.add(1);
        root.add(3);

        expect(root.left.value).toBe(1);
        expect(root.right.value).toBe(3);

        expect(root.left.parent).toBe(root);
        expect(root.right.parent).toBe(root);

        expect(root.left.isLeaf()).toBe(true);
        expect(root.right.isLeaf()).toBe(true);
    });

    it('should create valid only-left tree', function () {
        var root = new BTreeNode(4);
        root.add(3);
        root.add(2);

        expect(root.value).toBe(4);
        expect(root.left.value).toBe(3);
        expect(root.left.parent).toBe(root);
        expect(root.left.left.value).toBe(2);
        expect(root.left.left.parent).toBe(root.left);
        expect(root.left.left.isLeaf()).toBe(true);
    })
});

describe('BTreeNode.findRoot', function () {

    it('should find root for 1-element tree', function () {
        var root = new BTreeNode(1);

        expect(root.findRoot()).toBe(root);
    });

    it('should find root for 3-element tree', function () {
        var root = new BTreeNode(1);
        root.add(0);
        root.add(2);

        expect(root.findRoot()).toBe(root);
        expect(root.left.findRoot()).toBe(root);
        expect(root.right.findRoot()).toBe(root);
    });
});


describe('BTreeNode.delete', function () {

    it('should delete a left leaf', function () {
        var root = new BTreeNode(1);
        root.add(0);
        root.add(2);

        root.delete(0);

        expect(root.value).toBe(1);
        expect(root.left).toBeNull();
        expect(root.right.value).toBe(2);
        expect(root.right.parent).toBe(root);
        expect(root.right.isLeaf()).toBe(true);
    });

    it('should delete a right leaf', function () {
        var root = new BTreeNode(1);
        root.add(0);
        root.add(2);

        root.delete(2);

        expect(root.value).toBe(1);
        expect(root.left.value).toBe(0);
        expect(root.left.parent).toBe(root);
        expect(root.left.isLeaf()).toBe(true);
        expect(root.right).toBeNull();
    });

    it('should delete a left leaf with left child', function () {
        var root = new BTreeNode(2);
        root.add(1);
        root.add(0);

        root.delete(1);

        expect(root.value).toBe(2);
        expect(root.left.value).toBe(0);
        expect(root.left.parent).toBe(root);
        expect(root.left.isLeaf()).toBe(true);
    });

    it('should delete a left leaf with right child', function () {
        var root = new BTreeNode(3);
        root.add(1);
        root.add(2);

        root.delete(1);

        expect(root.value).toBe(3);
        expect(root.left.value).toBe(2);
        expect(root.left.parent).toBe(root);
        expect(root.left.isLeaf()).toBe(true);
    });

    it('should delete a right leaf with left child', function () {
        var root = new BTreeNode(1);
        root.add(3);
        root.add(2);

        root.delete(3);

        expect(root.value).toBe(1);
        expect(root.right.value).toBe(2);
        expect(root.right.parent).toBe(root);
        expect(root.right.isLeaf()).toBe(true);
    });

    it('should delete a right leaf with right child', function () {
        var root = new BTreeNode(1);
        root.add(2);
        root.add(3);

        root.delete(2);

        expect(root.value).toBe(1);
        expect(root.right.value).toBe(3);
        expect(root.right.parent).toBe(root);
        expect(root.right.isLeaf()).toBe(true);
    });

    it('should delete a parent with two childs only', function () {
        var root = new BTreeNode(4);
        root.add(2);
        root.add(1);
        root.add(3);

        root.delete(2);

        expect(root.value).toBe(4);
        expect(root.left.value).toBe(3);
        expect(root.left.parent).toBe(root);
        expect(root.left.left.value).toBe(1);
        expect(root.left.left.parent).toBe(root.left);
        expect(root.left.left.isLeaf()).toBe(true);
    });

    it('should delete a parent with more than 2 childs', function () {
        var root = new BTreeNode(9);
        root.add(5);
        root.add(4);
        root.add(7);
        root.add(6);
        root.add(8);

        root.delete(5);

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
    })
});