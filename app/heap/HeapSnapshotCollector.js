/**
 * @param {Heap} heap
 * @constructor
 */
function HeapSnapshotCollector(heap) {
    this.heap = heap;
    this.snapshots = [];
}

/**
 * @param {string} text
 */
HeapSnapshotCollector.prototype.add = function (text) {
    //noinspection JSCheckFunctionSignatures
    var cloned = _.clone(this.heap.toTree(), true);
    if (cloned !== null) {
        cloned.text = text;
    }

    this.snapshots.push(cloned);
};