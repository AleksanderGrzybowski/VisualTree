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
    
    it('should create tree with 2 elements, splaying the second added element, from all-left tree, zig left-to-right', function () {
        var tree = new SplayTree();

        tree.add(2);
        tree.add(1);
        var root = tree.root;

        expect(root.value).toBe(1);
        expect(root.left).toBe(null);
        expect(root.right.value).toBe(2);
        expect(root.right.isLeaf()).toBe(true);
    });

    it('should create tree with 2 elements, splaying the second added element, from all-right tree, zig right-to-left', function () {
        var tree = new SplayTree();

        tree.add(1);
        tree.add(2);
        var root = tree.root;

        expect(root.value).toBe(2);
        expect(root.left.value).toBe(1);
        expect(root.left.isLeaf()).toBe(true);
        expect(root.right).toBe(null);
    });
    
    it('should create tree with 3 elements, result is 3-element all-left degenerated-to-linked-list tree', function () {
        var tree = new SplayTree();

        tree.add(1);
        tree.add(2);
        tree.add(3);
        var root = tree.root;
        
        expect(root.value).toBe(3);
        
        expect(root.left.value).toBe(2);
        expect(root.left.parent).toBe(root);
        expect(root.left.right).toBe(null);
        
        expect(root.left.left.value).toBe(1);
        expect(root.left.left.parent).toBe(root.left);
        expect(root.left.left.isLeaf()).toBe(true);
    });

    it('should create tree with 3 elements, result is 3-element all-right degenerated-to-linked-list tree', function () {
        var tree = new SplayTree();

        tree.add(1);
        tree.add(2);
        tree.add(0);
        var root = tree.root;

        expect(root.value).toBe(0);

        expect(root.right.value).toBe(1);
        expect(root.right.parent).toBe(root);
        expect(root.right.left).toBe(null);

        expect(root.right.right.value).toBe(2);
        expect(root.right.right.parent).toBe(root.right);
        expect(root.right.right.isLeaf()).toBe(true);
    });
    
    it('should create tree with 4 elements, perform 2 splays, intermediate all-right degenerated tre', function () {
        var tree = new SplayTree();

        tree.add(1);
        tree.add(2);
        tree.add(0);
        tree.add(3);
        var root = tree.root;

        expect(root.value).toBe(3);
        
        expect(root.right).toBe(null);
        
        expect(root.left.value).toBe(0);
        expect(root.left.parent).toBe(root);
        expect(root.left.left).toBeNull();
        
        expect(root.left.right.value).toBe(2);
        expect(root.left.right.parent).toBe(root.left);
        expect(root.left.right.right).toBeNull();
        
        expect(root.left.right.left.value).toBe(1);
        expect(root.left.right.left.parent).toBe(root.left.right);
        expect(root.left.right.left.isLeaf()).toBe(true);
    });

    it('should create tree with 4 elements, perform 2 splays, intermediate all-left degenerated tre', function () {
        var tree = new SplayTree();

        tree.add(1);
        tree.add(2);
        tree.add(3);
        tree.add(0);
        var root = tree.root;

        expect(root.value).toBe(0);

        expect(root.left).toBe(null);

        expect(root.right.value).toBe(3);
        expect(root.right.parent).toBe(root);
        expect(root.right.right).toBeNull();

        expect(root.right.left.value).toBe(1);
        expect(root.right.left.parent).toBe(root.right);
        expect(root.right.left.left).toBeNull();

        expect(root.right.left.right.value).toBe(2);
        expect(root.right.left.right.parent).toBe(root.right.left);
        expect(root.right.left.right.isLeaf()).toBe(true);
    })
});