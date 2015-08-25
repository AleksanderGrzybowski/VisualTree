/**
 * @param {Array} initialElements
 * @constructor
 */
function AnimatedBST(initialElements) {

    this.tree = new BSTree();
    for (var i = 0; i < initialElements.length; ++i) {
        this.tree.add(initialElements[i]);
    }

    this.update = function () {
        SNC.init(this.tree, 'bst');
        SNC.add('');
        BTreePresenter.runAnimation(SNC.getSnapshotsAndDisable());
    };

    /**
     * @param {number} what
     */
    this.add = function (what) {
        SNC.init(this.tree, 'bst');
        this.tree.add(what);
        BTreePresenter.runAnimation(SNC.getSnapshotsAndDisable());
    };

    /**
     * @param {number} what
     */
    this.delete = function (what) {
        SNC.init(this.tree, 'bst');
        this.tree.delete(what);
        BTreePresenter.runAnimation(SNC.getSnapshotsAndDisable());
    };

    this.inorder = function () {
        SNC.init(this.tree, 'bst');
        this.tree.inorder();
        BTreePresenter.runAnimation(SNC.getSnapshotsAndDisable())
    };
}