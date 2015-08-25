/**
 * @param {Array} initialElements
 * @constructor
 */
function AnimatedRBT(initialElements) {
    this.tree = new RBTree();
    for (var i = 0; i < initialElements.length; ++i) {
        this.tree.add(initialElements[i]);
    }

    this.update = function () {
        SNC.init(this.tree, 'rbt');
        SNC.add('');
        BTreePresenter.runAnimation(SNC.getSnapshotsAndDisable());
    };

    /**
     * @param {number} what
     */
    this.add = function (what) {
        SNC.init(this.tree, 'rbt');
        this.tree.add(what);
        BTreePresenter.runAnimation(SNC.getSnapshotsAndDisable());
    };
}

