describe('Splay tests', function () {

    // splay implemented atop rotates!!!!!!!!!!!!!!!!!! TODO
    
    it('zig step, x on the left, p is its root', function () {
        var tree = new SplayTree();
        tree.add(3);
        tree.add(1);
        tree.add(0);
        tree.add(2);
        tree.add(4);

        tree.root.left.splay();
        var root = tree.root;

        expect(root.value).toBe(1);
        
        expect(root.left.value).toBe(0);
        expect(root.left.parent).toBe(root);
        
        expect(root.right.value).toBe(3);
        expect(root.right.parent).toBe(root);
        expect(root.right.left.value).toBe(2);
        expect(root.right.left.parent).toBe(root.right);
        expect(root.right.right.value).toBe(4);
        expect(root.right.right.parent).toBe(root.right);
    });
    
    it('zig step, x on the right, p is its root', function () {
        var tree = new SplayTree();
        tree.add(1);
        tree.add(0);
        tree.add(3);
        tree.add(2);
        tree.add(4);

        tree.root.right.splay();
        var root = tree.root;

        expect(root.value).toBe(3);

        expect(root.left.value).toBe(1);
        expect(root.left.parent).toBe(root);

        expect(root.left.left.value).toBe(0);
        expect(root.left.left.parent).toBe(root.left);
        expect(root.left.right.value).toBe(2);
        expect(root.left.right.parent).toBe(root.left);
        
        expect(root.right.value).toBe(4);
        expect(root.right.parent).toBe(root);
    });
    
    it('zig zig step, all on the left', function () {
        var tree = new SplayTree();
        tree.add(6);
        tree.add(7);
        tree.add(4);
        tree.add(5);
        tree.add(2);
        tree.add(1);
        tree.add(3);
        
        tree.root.left.left.splay();
        var root = tree.root;
        
        expect(root.value).toBe(2);
        
        expect(root.left.value).toBe(1);
        expect(root.left.parent).toBe(root);
        
        expect(root.right.value).toBe(4);
        expect(root.right.parent).toBe(root);
        
        expect(root.right.left.value).toBe(3);
        expect(root.right.left.parent).toBe(root.right);
        
        expect(root.right.right.value).toBe(6);
        expect(root.right.right.parent).toBe(root.right);
        
        expect(root.right.right.left.value).toBe(5);
        expect(root.right.right.left.parent).toBe(root.right.right);

        expect(root.right.right.right.value).toBe(7);
        expect(root.right.right.right.parent).toBe(root.right.right);
    });

    it('zig zig step, all on the right', function () {
        var tree = new SplayTree();
        tree.add(2);
        tree.add(1);
        tree.add(4);
        tree.add(3);
        tree.add(6);
        tree.add(5);
        tree.add(7);

        tree.root.right.right.splay();
        var root = tree.root;

        expect(root.value).toBe(6);
        
        expect(root.left.value).toBe(4);
        expect(root.left.parent).toBe(root);
        
        expect(root.left.right.value).toBe(5);
        expect(root.left.right.parent).toBe(root.left);
        
        expect(root.left.left.value).toBe(2);
        expect(root.left.left.parent).toBe(root.left);
        
        expect(root.left.left.left.value).toBe(1);
        expect(root.left.left.left.parent).toBe(root.left.left);
        
        expect(root.left.left.right.value).toBe(3);
        expect(root.left.left.right.parent).toBe(root.left.left);
        
        expect(root.right.value).toBe(7);
        expect(root.right.parent).toBe(root);
    });
    
    it('zig-zag x is right child, p is left child', function () {
        var tree = new SplayTree();
        tree.add(6);
        tree.add(7);
        tree.add(2);
        tree.add(1);
        tree.add(4);
        tree.add(3);
        tree.add(5);
        
        tree.root.left.right.splay();
        var root = tree.root;
        
        expect(root.value).toBe(4);
        
        expect(root.left.value).toBe(2);
        expect(root.left.parent).toBe(root);
        
        expect(root.left.left.value).toBe(1);
        expect(root.left.left.parent).toBe(root.left);
        
        expect(root.left.right.value).toBe(3);
        expect(root.left.right.parent).toBe(root.left);
        
        expect(root.right.value).toBe(6);
        expect(root.right.parent).toBe(root.right);
        
        expect(root.right.left.value).toBe(5);
        expect(root.right.left.parent).toBe(root.right);
        
        expect(root.right.right.value).toBe(7);
        expect(root.right.right.parent).toBe(root.right);
    });


    it('zig-zag x is left child, p is right child', function () {
        var tree = new SplayTree();
        tree.add(2);
        tree.add(1);
        tree.add(6);
        tree.add(7);
        tree.add(4);
        tree.add(3);
        tree.add(5);

        tree.root.right.left.splay();
        var root = tree.root;
        
        expect(root.value).toBe(4);
        
        expect(root.left.value).toBe(2);
        expect(root.left.parent).toBe(root);
        
        expect(root.left.left.value).toBe(1);
        expect(root.left.left.parent).toBe(root.left);
        
        expect(root.left.right.value).toBe(3);
        expect(root.left.right.parent).toBe(root.left);
        
        expect(root.right.value).toBe(6);
        expect(root.right.parent).toBe(root);
        
        expect(root.right.left.value).toBe(5);
        expect(root.right.left.parent).toBe(root.right);
        
        expect(root.right.right.value).toBe(7);
        expect(root.right.right.parent).toBe(root.right);
        
        
        
        
    })
});