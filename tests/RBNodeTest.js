describe('RBTree()', function () {
    it('should create empty tree', function () {
        var tree = new RBTree();

        expect(tree.root).toBe(null);
    });

    it('should create tree with 1 element, case 1', function () {
        var tree = new RBTree();
        tree.add(5);
        var root = tree.root;

        expect(root).not.toBeNull();
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

/* Here insertion of the first element means assigning to root, that's
 why counts in test names are off-by-1.
 */
describe('RBTree.add', function () {
    it('should add 1 element on the left, simplest, case 2', function () {
        var tree = new RBTree();
        tree.addAll([2, 1]);
        var root = tree.root;

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

    it('should add 2 elements on both sides, simplest, case 2', function () {
        var tree = new RBTree();
        tree.addAll([2, 1, 3]);
        var root = tree.root;

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
        var tree = new RBTree();
        tree.addAll([3, 2, 4, 1]);
        var root = tree.root;

        expect(root.color).toBe('black');
        expect(root.left.color).toBe('black');
        expect(root.right.color).toBe('black');
        expect(root.left.left.color).toBe('red');
    });

    it('should work for example wikipedia:RBT:case4 and case5', function () {
        var tree = new RBTree();
        tree.addAll([3, 1, 4]);
        tree.root.left.color = 'red'; // modify to match
        tree.root.right.color = 'black';

        tree.add(2);

        var root = tree.root;
        expect(root.value).toBe(2);
        expect(root.color).toBe('black');
        expect(root.parent).toBe(null);

        expect(root.left.value).toBe(1);
        expect(root.left.color).toBe('red');
        expect(root.left.parent).toBe(root);

        expect(root.right.value).toBe(3);
        expect(root.right.color).toBe('red');
        expect(root.right.parent).toBe(root);

        expect(root.right.right.value).toBe(4);
        expect(root.right.right.color).toBe('black');
        expect(root.right.right.parent).toBe(root.right);
    });

    // TODO refactor this to rotating tests, add opposite case too!
    it('should properly rotate independent on the position (left/right) of grandparent', function () {
        var tree = new RBTree();
        tree.addAll([5, 1, 8, 9, 10]);
        var root = tree.root;

        expect(root.value).toBe(5);
        expect(root.color).toBe('black');

        expect(root.left.value).toBe(1);
        expect(root.left.color).toBe('black');

        expect(root.right.value).toBe(9);
        expect(root.right.color).toBe('black');

        expect(root.right.left.value).toBe(8);
        expect(root.right.left.color).toBe('red');

        expect(root.right.right.value).toBe(10);
        expect(root.right.right.color).toBe('red');
    });
});


describe('RBTree.rotateLeft', function () {
    it('-this- is the LEFT child of its parent, wikipedia:RBT:case4 picture', function () {
        // colors don't matter here

        var root = new RBNode(6);

        root.left = new RBNode(2);
        root.left.parent = root;

        root.left.left = new RBNode(1);
        root.left.left.parent = root.left;

        root.left.right = new RBNode(4);
        root.left.right.parent = root.left;

        root.left.right.left = new RBNode(3);
        root.left.right.left.parent = root.left.right;

        root.left.right.right = new RBNode(5);
        root.left.right.right.parent = root.left.right;


        root.left.rotateLeft(); // root.left is 'this'


        expect(root.value).toBe(6);

        expect(root.left.value).toBe(4);
        expect(root.left.parent).toBe(root);

        expect(root.left.left.value).toBe(2);
        expect(root.left.left.parent).toBe(root.left);

        expect(root.left.left.left.value).toBe(1);
        expect(root.left.left.left.parent).toBe(root.left.left);

        expect(root.left.left.right.value).toBe(3);
        expect(root.left.left.right.parent).toBe(root.left.left);

        expect(root.left.right.value).toBe(5);
        expect(root.left.right.parent).toBe(root.left);
    });

    it('-this- is the RIGHT child of its parent, wikipedia:RBT:case4 picture', function () {
        // colors don't matter here

        var root = new RBNode(1);

        root.right = new RBNode(3);
        root.right.parent = root;

        root.right.left = new RBNode(2);
        root.right.left.parent = root.right;

        root.right.right = new RBNode(5);
        root.right.right.parent = root.right;

        root.right.right.left = new RBNode(4);
        root.right.right.left.parent = root.right.right;

        root.right.right.right = new RBNode(6);
        root.right.right.right.parent = root.right.right;


        root.right.rotateLeft();


        expect(root.value).toBe(1);

        expect(root.right.value).toBe(5);
        expect(root.right.parent).toBe(root);

        expect(root.right.left.value).toBe(3);
        expect(root.right.left.parent).toBe(root.right);

        expect(root.right.left.left.value).toBe(2);
        expect(root.right.left.left.parent).toBe(root.right.left);

        expect(root.right.left.right.value).toBe(4);
        expect(root.right.left.right.parent).toBe(root.right.left);

        expect(root.right.right.value).toBe(6);
        expect(root.right.right.parent).toBe(root.right);
    });


    it('should work while performed on root', function () {
        var tree = new RBTree();

        // accessing 'private'
        tree.add(2); // this will add tree wrapper

        var root = tree.root;
        root.left = new RBNode(1);
        root.left.parent = root;

        root.right = new RBNode(4);
        root.right.parent = root;

        root.right.left = new RBNode(3);
        root.right.left.parent = root.right;

        root.right.right = new RBNode(5);
        root.right.right.parent = root.right;


        root.rotateLeft();
        root = tree.root;

        expect(root.value).toBe(4);
        expect(root.parent).toBe(null);

        expect(root.left.value).toBe(2);
        expect(root.left.parent).toBe(root);

        expect(root.left.left.value).toBe(1);
        expect(root.left.left.parent).toBe(root.left);

        expect(root.right.value).toBe(5);
        expect(root.right.parent).toBe(root);
    });
});

describe('RBTree.rotateRight', function () {

    it('-this- is the LEFT child of its parent, wikipedia:RBT:case4 picture', function () {
        // colors don't matter here

        var root = new RBNode(6);

        root.left = new RBNode(4);
        root.left.parent = root;

        root.left.left = new RBNode(2);
        root.left.left.parent = root.left;

        root.left.left.left = new RBNode(1);
        root.left.left.left.parent = root.left.left;

        root.left.left.right = new RBNode(3);
        root.left.left.right.parent = root.left.left;

        root.left.right = new RBNode(5);
        root.left.right.parent = root.left;

        root.right = new RBNode(8);
        root.right.parent = root;

        root.right.left = new RBNode(7);
        root.right.left.parent = root.right;

        root.right.right = new RBNode(9);
        root.right.right.parent = root.right;


        root.left.rotateRight(); // root.left is 'this'


        expect(root.value).toBe(6);

        expect(root.left.value).toBe(2);
        expect(root.left.parent).toBe(root);

        expect(root.left.left.value).toBe(1);
        expect(root.left.left.parent).toBe(root.left);

        expect(root.left.right.value).toBe(4);
        expect(root.left.right.parent).toBe(root.left);

        expect(root.left.right.left.value).toBe(3);
        expect(root.left.right.left.parent).toBe(root.left.right);

        expect(root.left.right.right.value).toBe(5);
        expect(root.left.right.right.parent).toBe(root.left.right);
    });

    it('-this- is the RIGHT child of its parent, wikipedia:RBT:case4 picture', function () {
        var root = new RBNode(1);

        root.right = new RBNode(5);
        root.right.parent = root;

        root.right.left = new RBNode(3);
        root.right.left.parent = root.right;

        root.right.left.left = new RBNode(2);
        root.right.left.left.parent = root.right.left;

        root.right.left.right = new RBNode(4);
        root.right.left.right.parent = root.right.left;

        root.right.right = new RBNode(6);
        root.right.right.parent = root.right;


        root.right.rotateRight();


        expect(root.value).toBe(1);

        expect(root.right.value).toBe(3);
        expect(root.right.parent).toBe(root);

        expect(root.right.left.value).toBe(2);
        expect(root.right.left.parent).toBe(root.right);

        expect(root.right.right.value).toBe(5);
        expect(root.right.right.parent).toBe(root.right);

        expect(root.right.right.left.value).toBe(4);
        expect(root.right.right.left.parent).toBe(root.right.right);

        expect(root.right.right.right.value).toBe(6);
        expect(root.right.right.right.parent).toBe(root.right.right);
    });

    it('should work while performed on root', function () {
        var tree = new RBTree();

        // accessing 'private'
        tree.add(4); // this will add tree wrapper

        var root = tree.root;

        root.left = new RBNode(2);
        root.left.parent = root.left;

        root.left.left = new RBNode(1);
        root.left.left.parent = root.left;

        root.left.right = new RBNode(3);
        root.left.right.parent = root.left;

        root.right = new RBNode(5);
        root.right.parent = root;

        root.rotateRight();
        root = tree.root;

        expect(root.value).toBe(2);
        expect(root.parent).toBe(null);

        expect(root.left.value).toBe(1);
        expect(root.left.parent).toBe(root);

        expect(root.right.value).toBe(4);
        expect(root.right.parent).toBe(root);

        expect(root.right.left.value).toBe(3);
        expect(root.right.left.parent).toBe(root.right);

        expect(root.right.right.value).toBe(5);
        expect(root.right.right.parent).toBe(root.right);
    });
});
