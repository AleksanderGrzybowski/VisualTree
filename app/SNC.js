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
                // READ ME! clone does not copy prototype of nested objects at all
                // 'cloned' has right proto but cloned.left/right does not!
                cloned = _.clone(structure.root, true, function (val) {
                    console.log(val);
                    
                });
            } else if (type === 'rbt') {
                cloned = _.clone(structure.root, true); // that preserves prototype?? TODO wtf
                if (cloned != null)
                    cloned.prototype = new RBNode();
            } else if (type === 'splay') {
                cloned = _.clone(structure.root, true); // that preserves prototype?? TODO wtf
                if (cloned != null)
                    cloned.prototype = new SplayNode();
            } else if (type === 'heap') {
                cloned = _.clone(structure.toTree(), true);
                if (cloned != null)
                    cloned.prototype = new HeapNode();
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
    }
})();