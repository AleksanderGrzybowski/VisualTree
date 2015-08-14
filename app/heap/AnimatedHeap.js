/**
 * @param {Array} initialElements
 * @constructor
 */
function AnimatedHeap(initialElements) {

    this.heap = new Heap();
    for (var i = 0; i < initialElements.length; ++i) {
        this.heap.add(initialElements[i], new FakeSnapshotCollector()); //TODO typing fix
    }

    this.update = function () {
        var snc = new HeapSnapshotCollector(this.heap);
        snc.add('');

        BTreePresenter.runAnimation(snc);
    };

    /**
     * @param {number} what
     */
    this.add = function (what) {
        var snc = new HeapSnapshotCollector(this.heap);

        this.heap.add(what, snc);
        BTreePresenter.runAnimation(snc)
    };
}