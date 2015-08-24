/**
 * @param {Array} initialElements
 * @constructor
 */
function AnimatedBST(initialElements) {

    this.tree = new BSTree();
    for (var i = 0; i < initialElements.length; ++i) {
        this.tree.add(initialElements[i], new FakeSnapshotCollector());
    }

    this.update = function () {
        var snc = new BSTSnapshotCollector(this.tree);
        snc.add('');

        BTreePresenter.runAnimation(snc);
    };

    /**
     * @param {number} what
     */
    this.add = function (what) {
        var snc = new BSTSnapshotCollector(this.tree);

        this.tree.add(what, snc);
        BTreePresenter.runAnimation(snc)
    };

    /**
     * @param {number} what
     */
    this.delete = function (what) {
        var snc = new BSTSnapshotCollector(this.tree);

        this.tree.delete(what, snc);
        BTreePresenter.runAnimation(snc)
    };

    this.inorder = function () {
        var snc = new BSTSnapshotCollector(this.tree);

        this.tree.inorder(snc);
        BTreePresenter.runAnimation(snc)
    };
}