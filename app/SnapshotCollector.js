function SnapshotCollector(root) {
    this.root = root;
    this.snapshots = [];
}

SnapshotCollector.prototype.add = function (text) {
    var cloned = _.clone(this.root, true);
    cloned.text = text;
    this.snapshots.push(cloned);
};