var SNC = (function () {
    var snapshots = [];
    var enabled = false;
    var type = '';
    var structure;

    //noinspection JSUnusedGlobalSymbols
    return {
        // TODO think of valid states (?) of this object/singleton
        init: function (newStructure, newType) {
            enabled = true;
            snapshots = [];
            type = newType;
            structure = newStructure;
        },
        disable: function () {
            enabled = false;
        },
        add: function (text) {
            if (!enabled) return;

            var cloned;

            if (type === 'bst' || type === 'rbt' || type === 'splay') {
                cloned = _.clone(structure.root, true);
            } else if (type === 'heap') {
                cloned = _.clone(structure.toTree(), true);
            } else {
                throw new Error();
            }

            if (cloned !== null) {
                cloned.text = text;
            }

            snapshots.push(cloned);
        },
        getSnapshots: function () {
            return snapshots;
        },
        getSnapshotsAndDisable: function () {
            enabled = false;
            return snapshots;
        }
    };
})();