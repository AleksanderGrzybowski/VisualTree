/**
 * @param {Array} initialElements
 * @constructor
 */
function AnimatedBTree(initialElements) {

    this.tree = new BTreeNode(initialElements[0]);
    for (var i = 1; i < initialElements.length; ++i) {
        this.tree.add(initialElements[i], new FakeSnapshotCollector());
    }

    this.update = function () {
        var snc = new SnapshotCollector(this.tree);
        snc.add('');

        BTreePresenter.runAnimation(snc);
    };

    /**
     * @param {number} what
     */
    this.add = function (what) {
        var snc = new SnapshotCollector(this.tree);

        this.tree.add(what, snc);
        BTreePresenter.runAnimation(snc)
    };

    /**
     * @param {number} what
     */
    this.delete = function (what) {
        var snc = new SnapshotCollector(this.tree);

        this.tree.delete(what, snc);
        BTreePresenter.runAnimation(snc)
    };

    this.inorder = function () {
        var snc = new SnapshotCollector(this.tree);

        this.tree.inorder(snc);
        BTreePresenter.runAnimation(snc)
    };
}