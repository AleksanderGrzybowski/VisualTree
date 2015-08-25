describe('Heap.toTree', function () {
    it('should create heap with one element, no percolation', function () {
        var heap = new Heap();
        heap.addAll([1]);
        var root = heap.toTree();

        expect(root.value).toBe(1);
        expect(root.parent).toBe(null);
        expect(root.left).toBe(null);
        expect(root.right).toBe(null);
    });

    it('should create heap with two elements, no percolation', function () {
        var heap = new Heap();
        heap.addAll([1, 2]);
        var root = heap.toTree();

        expect(root.value).toBe(1);
        expect(root.right).toBe(null);

        expect(root.left.value).toBe(2);
        expect(root.left.parent).toBe(root);
    });

    it('should create heap with three elements, no percolation', function () {
        var heap = new Heap();
        heap.addAll([1, 2, 3]);
        var root = heap.toTree();

        expect(root.value).toBe(1);

        expect(root.left.value).toBe(2);
        expect(root.left.parent).toBe(root);

        expect(root.right.value).toBe(3);
        expect(root.right.parent).toBe(root);
    });

    it('should create heap with five elements, no percolation', function () {
        var heap = new Heap();
        heap.addAll([1, 2, 3, 4, 5]);

        var root = heap.toTree();

        expect(root.value).toBe(1);

        expect(root.right.value).toBe(3);
        expect(root.right.parent).toBe(root);

        expect(root.left.value).toBe(2);
        expect(root.left.parent).toBe(root);

        expect(root.left.left.value).toBe(4);
        expect(root.left.left.parent).toBe(root.left);

        expect(root.left.right.value).toBe(5);
        expect(root.left.right.parent).toBe(root.left);
    });
});

describe('Heap.add', function () {

    it('should add two elements, with percolation', function () {
        var heap = new Heap();
        heap.addAll([2, 1]);

        expect(heap.toArray()).toEqual([1, 2]);
    });

    it('should add three elements, with percolation', function () {
        var heap = new Heap();
        heap.addAll([1, 2, 0]);

        expect(heap.toArray()).toEqual([0, 2, 1]);
    });

    it('should add four elements, with double percolation on the left', function () {
        var heap = new Heap();
        heap.addAll([1, 2, 3, 0]);

        expect(heap.toArray()).toEqual([0, 1, 3, 2]);
    });

    it('should add four elements, with zigzag percolation', function () {
        var heap = new Heap();
        heap.addAll([1, 4, 6, 7, 8, 0]);

        expect(heap.toArray()).toEqual([0, 4, 1, 7, 8, 6]);
    });
});

describe('Heap.deleteMin', function () {
    it('should delete root element in 1-element heap, no percolation', function () {
        var heap = new Heap();
        heap.addAll([1]);

        heap.deleteMin();

        expect(heap.toArray()).toEqual([]);
    });

    it('should delete root element in 2-element heap, no percolation', function () {
        var heap = new Heap();
        heap.addAll([1, 2]);

        heap.deleteMin();

        expect(heap.toArray()).toEqual([2]);
    });

    it('should delete root element in 3-element heap, no percolation', function () {
        var heap = new Heap();
        heap.addAll([1, 3, 2]);

        heap.deleteMin();

        expect(heap.toArray()).toEqual([2, 3]);
    });

    it('should delete root element in 3-element heap, single percolation', function () {
        var heap = new Heap();
        heap.addAll([1, 2, 3]);

        heap.deleteMin();

        expect(heap.toArray()).toEqual([2, 3]);
    });

    it('should delete root element in 6-element heap, example from the internet', function () {
        var heap = new Heap();
        heap.addAll([1, 3, 6, 5, 9, 8]);

        heap.deleteMin();

        expect(heap.toArray()).toEqual([3, 5, 6, 8, 9]);
    });
});