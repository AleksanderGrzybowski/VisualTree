describe('SplayTree.add', function () {


    it('should create empty tree', function () {
        var tree = new SplayTree();

        var root = tree.root;

        expect(root).toBeNull();
    });
    
    it('should create tree with a single element', function () {
        var tree = new SplayTree();
        
        tree.add(1);
        var root = tree.root;
        
        expect(root.value).toBe(1);
        expect(root.isLeaf()).toBe(true);
    });
    
    it('should create tree with 2 elements, splaying the second added element, from all-left tree', function () {
        var tree = new SplayTree();

        tree.add(2);
        tree.add(1);
        var root = tree.root;

        expect(root.value).toBe(1);
        expect(root.left).toBe(null);
        expect(root.right.value).toBe(2);
        expect(root.right.isLeaf()).toBe(true);
    });

    it('should create tree with 2 elements, splaying the second added element, from all-right tree', function () {
        var tree = new SplayTree();

        tree.add(1);
        tree.add(2);
        var root = tree.root;

        expect(root.value).toBe(2);
        expect(root.left.value).toBe(1);
        expect(root.left.isLeaf()).toBe(true);
        expect(root.right).toBe(null);
    });
    
});