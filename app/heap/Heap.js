/*
 * @param {number} index
 */
Array.prototype.removeAt = function (index) {
    this.splice(index, 1);
};

/**
 * @param {number} value
 * @param {string} [visual='']
 * @constructor
 */
function HeapNode(value, visual) {
    this.value = value;
    this.left = this.right = this.parent = null;
    this.visual = (visual === undefined) ? '' : visual;
}

/**
 * @constructor
 */
function Heap() {
    // Dummy element to simplify algs
    // http://www.cs.cmu.edu/~adamchik/15-121/lectures/Binary%20Heaps/heaps.html
    this.data = [{value: -1}];
}

/**
 * @returns {number[]}
 */
Heap.prototype.toArray = function () {
    return this.data.slice(1).map(function (e) {
        return e.value;
    });
};

/**
 * @param {HeapNode} that
 * @param {number} k
 * @returns {HeapNode}
 */
Heap.prototype.toTree = function (that, k) {
    if (arguments.length == 0) {
        var root = new HeapNode(this.data[1].value, this.data[1].visual);
        this.toTree(root, 1);
        return root;
    }

    if (this.data[2 * k] !== undefined) {
        that.left = new HeapNode(this.data[2 * k].value, this.data[2 * k].visual);
        that.left.parent = that;
        this.toTree(that.left, 2 * k);
    } else {
        that.left = null;
    }

    if (this.data[2 * k + 1] !== undefined) {
        that.right = new HeapNode(this.data[2 * k + 1].value, this.data[2 * k + 1].visual);
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
    this.data.push({value: what, visual: 'current'});
    snc.add('Added element (' + what + ') at the end');

    var pos = this.data.length - 1;
    while (true) {
        if (pos <= 1) {
            snc.add('Reached root, finished');
            break;
        }

        this.data[pos].visual = 'intermediate';
        this.data[Math.floor(pos / 2)].visual = 'intermediate';
        snc.add('Should we swap those? (' + this.data[pos].value +
            ') ? (' + this.data[Math.floor(pos / 2)].value + ')');

        if (what < this.data[Math.floor(pos / 2)].value) {
            this.data[pos].visual = 'current';
            this.data[Math.floor(pos / 2)].visual = 'current';
            snc.add('We need to swap them: (' + this.data[pos].value + ') < (' +
                this.data[Math.floor(pos / 2)].value + ')');

            var tmp = this.data[pos];
            this.data[pos] = this.data[Math.floor(pos / 2)];
            this.data[Math.floor(pos / 2)] = tmp;

            snc.add('Swapped');
            this.data[pos].visual = '';
            this.data[Math.floor(pos / 2)].visual = '';
        } else {
            this.data[pos].visual = '';
            this.data[Math.floor(pos / 2)].visual = '';
            snc.add('No need to swap them: (' + this.data[pos].value + ') > (' +
                this.data[Math.floor(pos / 2)].value + ')');
            break;
        }

        pos = Math.floor(pos / 2);
    }
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
    this.data[1].visual = 'current';
    this.data[this.data.length - 1].visual = 'current';
    snc.add('Removing root (' + this.data[1].value + '), replacing it with the last element ('
        + this.data[this.data.length - 1].value + ')');

    this.data[1] = this.data[this.data.length - 1];
    this.data.removeAt(this.data.length - 1);

    var k = 1, tmp; // root

    while (true) {
        if (this.data[2 * k] === undefined && this.data[2 * k + 1] == undefined) {
            if (this.data[k] !== undefined) { // if there was 1 element before
                this.data[k].visual = '';
            }
            snc.add('Finished percolating down');
            break;
        } else if (this.data[2 * k] !== undefined && this.data[2 * k + 1] == undefined) { // left child
            this.data[k].visual = 'intermediate';
            this.data[2 * k].visual = 'intermediate';
            snc.add('Left child is present, should we swap? (' + this.data[k].value + ') ? (' +
                this.data[2 * k].value + ')');

            if (this.data[2 * k].value < this.data[k].value) {
                this.data[k].visual = 'current';
                this.data[2 * k].visual = 'current';
                snc.add('Swapping, (' + this.data[k].value + ') > (' +
                    this.data[2 * k].value + ')');

                tmp = this.data[2 * k];
                this.data[2 * k] = this.data[k];
                this.data[k] = tmp;

                snc.add('Swapped');

                this.data[k].visual = '';
                this.data[2 * k].visual = '';

                k = 2 * k;
            } else {
                this.data[k].visual = '';
                this.data[2 * k].visual = '';
                snc.add('Finished percolating down');

                break;
            }
        } else if (this.data[2 * k] === undefined && this.data[2 * k + 1] !== undefined) { // right child
            this.data[k].visual = 'intermediate';
            this.data[2 * k + 1].visual = 'intermediate';
            snc.add('Right child is present, should we swap? (' + this.data[k].value + ') ? (' +
                this.data[2 * k].value + ')');

            if (this.data[2 * k + 1].value < this.data[k].value) {
                this.data[k].visual = 'current';
                this.data[2 * k + 1].visual = 'current';
                snc.add('Swapping, (' + this.data[k].value + ') > (' +
                    this.data[2 * k + 1].value + ')');

                tmp = this.data[2 * k + 1];
                this.data[2 * k + 1] = this.data[k];
                this.data[k] = tmp;

                snc.add('Swapped');

                this.data[k].visual = '';
                this.data[2 * k + 1].visual = '';

                k = 2 * k + 1;
            } else {
                this.data[k].visual = '';
                this.data[2 * k].visual = '';
                snc.add('Finished percolating down');

                break;
            }
        } else { // two children
            this.data[k].visual = 'current';
            this.data[2 * k].visual = 'intermediate';
            this.data[2 * k + 1].visual = 'intermediate';
            snc.add('Two children, which one is smaller?');

            var smallestIndex;
            if (this.data[2 * k].value < this.data[2 * k + 1].value) {
                smallestIndex = 2 * k;
                this.data[k].visual = 'current';
                this.data[2 * k].visual = 'current';
                this.data[2 * k + 1].visual = '';
            } else {
                smallestIndex = 2 * k + 1;
                this.data[k].visual = 'current';
                this.data[2 * k].visual = '';
                this.data[2 * k + 1].visual = 'current';
            }

            snc.add('Picked smaller, should we swap? (' + this.data[smallestIndex].value + ') ? (' +
                this.data[k].value + ')');

            if (this.data[smallestIndex].value < this.data[k].value) {
                this.data[k].visual = 'current';
                this.data[smallestIndex].visual = 'current';

                snc.add('Swapping, (' + this.data[smallestIndex].value + ') < (' +
                    this.data[k].value + ')');

                tmp = this.data[smallestIndex];
                this.data[smallestIndex] = this.data[k];
                this.data[k] = tmp;

                snc.add('Swapped');

                this.data[k].visual = '';
                this.data[smallestIndex].visual = '';

                k = smallestIndex;
            } else {
                this.data[k].visual = '';
                this.data[2 * k].visual = '';
                this.data[2 * k + 1].visual = '';
                snc.add('Finished percolating down');
                break;
            }
        }
    }
};