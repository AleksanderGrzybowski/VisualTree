describe('RBNode creation', function () {
    it('should create tree with 1 element', function () {
        var root = new RBNode(5);

        expect(root.value).toBe(5);
        expect(root.color).toBe('black');
        expect(root.isNil).toBe(false);
        expect(root.parent).toBe(null);

        expect(root.left.isNil).toBe(true);
        expect(root.left.color).toBe('black');
        expect(root.left.parent).toBe(root);

        expect(root.right.isNil).toBe(true);
        expect(root.right.color).toBe('black');
        expect(root.right.parent).toBe(root);
    });
});

describe('RBNode.add', function () {
    it('should add 1 element on the left, simplest case', function () {
        var root = new RBNode(2);
        root.add(1);

        expect(root.value).toBe(2);
        expect(root.color).toBe('black');

        expect(root.right.isNil).toBe(true);

        expect(root.left.isNil).toBe(false);
        expect(root.left.value).toBe(1);
        expect(root.left.color).toBe('red');
        expect(root.left.parent).toBe(root);

        expect(root.left.left.isNil).toBe(true);
        expect(root.left.left.parent).toBe(root.left);
        expect(root.left.right.isNil).toBe(true);
        expect(root.left.right.parent).toBe(root.left);
    });

    it('should add 2 elements on both sides, simplest case', function () {
        var root = new RBNode(2);
        root.add(1);
        root.add(3);

        expect(root.value).toBe(2);
        expect(root.color).toBe('black');

        expect(root.left.isNil).toBe(false);
        expect(root.left.value).toBe(1);
        expect(root.left.color).toBe('red');
        expect(root.left.parent).toBe(root);

        expect(root.right.isNil).toBe(false);
        expect(root.right.value).toBe(3);
        expect(root.right.color).toBe('red');
        expect(root.right.parent).toBe(root);

        expect(root.left.left.isNil).toBe(true);
        expect(root.left.left.parent).toBe(root.left);
        expect(root.left.right.isNil).toBe(true);
        expect(root.left.right.parent).toBe(root.left);

        expect(root.right.left.isNil).toBe(true);
        expect(root.right.left.parent).toBe(root.right);
        expect(root.right.right.isNil).toBe(true);
        expect(root.right.right.parent).toBe(root.right);
    });

    it('should add element on the left left, case 3, double recoloring', function () {
        var root = new RBNode(3);
        root.add(2);
        root.add(4);

        root.add(1);

        expect(root.color).toBe('black');
        expect(root.left.color).toBe('black');
        expect(root.right.color).toBe('black');
        expect(root.left.left.color).toBe('red');
    })
});