/**
 * @param {Array} initialElements
 * @constructor
 */
function AnimatedHeap(initialElements) {

    this.heap = new Heap();
    for (var i = 0; i < initialElements.length; ++i) {
        this.heap.add(initialElements[i]); //TODO typing fix
    }

    this.update = function () {
        SNC.init(this.heap, 'heap');
        SNC.add('');
        BTreePresenter.runAnimation(SNC.getSnapshotsAndDisable());
    };

    /**
     * @param {number} what
     */
    this.add = function (what) {
        SNC.init(this.heap, 'heap');
        this.heap.add(what);
        BTreePresenter.runAnimation(SNC.getSnapshotsAndDisable());
    };

    this.deleteMin = function () {
        SNC.init(this.heap, 'heap');
        this.heap.deleteMin();
        BTreePresenter.runAnimation(SNC.getSnapshotsAndDisable());
    };
}