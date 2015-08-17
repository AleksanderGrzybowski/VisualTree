Array.prototype.removeAt = function (index) {
    this.splice(index, 1);
};

/**
 * @param {number} value
 * @constructor
 */
function HeapNode(value) {
    this.value = value;
    this.left = this.right = this.parent = null;
}

/**
 * @constructor
 */
function Heap() {
    // Dummy element to simplify algs
    // http://www.cs.cmu.edu/~adamchik/15-121/lectures/Binary%20Heaps/heaps.html
    this.data = [-1];
}

/**
 * @returns {number[]}
 */
Heap.prototype.toArray = function () {
    return this.data.slice(1);
};

/**
 * @param {HeapNode} that
 * @param {number} k
 * @returns {HeapNode}
 */
Heap.prototype.toTree = function (that, k) {
    if (arguments.length == 0) {
        var root = new HeapNode(this.data[1]);
        this.toTree(root, 1);
        return root;
    }

    if (this.data[2 * k] !== undefined) { // TODO is this 'undefined' right choice? Maybe fill with nulls
        that.left = new HeapNode(this.data[2 * k]);
        that.left.parent = that;
        this.toTree(that.left, 2 * k);
    } else {
        that.left = null;
    }

    if (this.data[2 * k + 1] !== undefined) {
        that.right = new HeapNode(this.data[2 * k + 1]);
        that.right.parent = that;
        this.toTree(that.right, 2 * k + 1);
    } else {
        that.right = null;
    }
};

/**
 * @param {number} what
 * @param {Object} snc
 */
Heap.prototype.add = function (what, snc) {
    snc.add('Added element');
    this.data.push(what);
    var pos = this.data.length - 1;

    for (; pos > 1 && what < this.data[Math.floor(pos / 2)]; pos = Math.floor(pos / 2)) {
        snc.add('Shifting');
        this.data[pos] = this.data[Math.floor(pos / 2)]
    }

    this.data[pos] = what;
    snc.add("Finished");
};

/**
 * @param {number[]} elements
 */
Heap.prototype.addAll = function (elements) {
    for (var i = 0; i < elements.length; ++i) {
        this.add(elements[i], new FakeSnapshotCollector());
    }
};

// http://www.algolist.net/Data_structures/Binary_heap/Remove_minimum
Heap.prototype.deleteMin = function (snc) {
    this.data[1] = this.data[this.data.length - 1];
    this.data.removeAt(this.data.length - 1);

    var k = 1, tmp; // root

    while (true) {
        if (this.data[2 * k] === undefined && this.data[2 * k + 1] == undefined) {
            break;
        } else if (this.data[2 * k] !== undefined && this.data[2 * k + 1] == undefined) { // left child
            if (this.data[2 * k] < this.data[k]) {
                tmp = this.data[2 * k];
                this.data[2 * k] = this.data[k];
                this.data[k] = tmp;
                k = 2 * k;
            } else {
                break;
            }
        } else if (this.data[2 * k] === undefined && this.data[2 * k + 1] !== undefined) { // right child
            if (this.data[2 * k + 1] < this.data[k]) {
                tmp = this.data[2 * k + 1];
                this.data[2 * k + 1] = this.data[k];
                this.data[k] = tmp;
                k = 2 * k + 1;
            } else {
                break;
            }
        } else { // two children
            var smallestIndex;
            if (this.data[2 * k] < this.data[2 * k + 1]) {
                smallestIndex = 2 * k;
            } else {
                smallestIndex = 2 * k + 1;
            }
            if (this.data[smallestIndex] < this.data[k]) {
                tmp = this.data[smallestIndex];
                this.data[smallestIndex] = this.data[k];
                this.data[k] = tmp;
                k = smallestIndex;
            } else {
                break;
            }
        }
    }
};