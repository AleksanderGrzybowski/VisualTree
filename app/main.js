var visualTree = angular.module('visualTree', []);

visualTree.controller('MainCtrl', function ($interval) {
    log.info('Angular controller initializes');
    var vm = this;

    vm.delay = 1000;
    vm.treeType = 'bst';

    /**
     * @type {number}
     */
    vm.number = '';
    
    vm.tree = null; // set later
    
    vm.currentSnapshots = [];
    vm.currentSnapshotIndex = 0;
    
    // !!
    (function () { // TODO better way
        var $svg = $('svg');
        var $body = $('body');

        var newHeight = $body.height() * 0.7;
        var newWidth = $body.width() * 0.4;
        log.info('Setting svg size to ' + newHeight + 'x' + newWidth);

        $svg.height(newHeight);
        $svg.width(newWidth);
    })();
    // !!


    vm.add = function () {
        if (!isNaN(vm.number)) { // stupid trick but hey JS
            SNC.init(vm.tree, 'bst');
            vm.tree.add(+vm.number);
            vm.currentSnapshots = SNC.getSnapshotsAndDisable();
            BTreePresenter.update(vm.currentSnapshots[vm.currentSnapshots.length-1]);
        }
    };
    
    vm.delete = function () {
        if (!isNaN(vm.number)) {
            SNC.init(vm.tree, 'bst');
            vm.tree.delete(+vm.number);
            vm.currentSnapshots = SNC.getSnapshotsAndDisable();
            BTreePresenter.update(vm.currentSnapshots[vm.currentSnapshots.length-1]);
        }
    };
    
    vm.inorder = function () {
        SNC.init(vm.tree, 'bst');
        vm.tree.inorder();
        vm.currentSnapshots = SNC.getSnapshotsAndDisable();
        BTreePresenter.update(vm.currentSnapshots[vm.currentSnapshots.length-1]);
    };

    vm.deleteMin = function () {
        SNC.init(vm.tree, 'bst');
        vm.tree.deleteMin();
        vm.currentSnapshots = SNC.getSnapshotsAndDisable();
        BTreePresenter.update(vm.currentSnapshots[vm.currentSnapshots.length-1]);
    };

    vm.setTreeType = function (newTreeType) {
        vm.treeType = newTreeType;
        
        // this creates useless instances, but cleaner
        var dict = {
            bst: {
                instance: new BSTree(),
                elements: CONFIG.defaultBSTElements
            },
            heap: {
                instance: new Heap(),
                elements: CONFIG.defaultHeapElements
            },
            rbt: {
                instance: new RBTree(),
                elements: CONFIG.defaultRBTElements
            }
        };

        var selected = dict[vm.treeType]; // indexing by string
        vm.tree = selected.instance;
        for (var i = 0; i < selected.elements.length; ++i) {
            vm.tree.add(selected.elements[i]);
        }

        SNC.init(vm.tree, vm.treeType);
        SNC.add('Freshly created');
        vm.currentSnapshots = SNC.getSnapshotsAndDisable();
        BTreePresenter.update(vm.currentSnapshots[0]);
    };
    
    vm.updateView = function () {
        BTreePresenter.update(vm.currentSnapshots[vm.currentSnapshotIndex]);
    };
    
    vm.setSelectedSnapshot = function (index) {
        vm.currentSnapshotIndex = index;
        vm.updateView(); // TODO replace with watch?
    };
    
    vm.next = function () {
        if (vm.currentSnapshots.length - 1 > vm.currentSnapshotIndex) {
            vm.currentSnapshotIndex++;
            vm.updateView();
        }
    };
    
    vm.previous = function () {
        if (vm.currentSnapshotIndex > 0) {
            vm.currentSnapshotIndex--;
            vm.updateView();
        }
    };

    vm.play = function () {
        vm.currentSnapshotIndex = 0;

        var promise = $interval(function () {
            vm.updateView();
            vm.currentSnapshotIndex++;
        
            if (vm.currentSnapshotIndex >= vm.currentSnapshots.length) {
                $interval.cancel(promise);
            }
        }, vm.delay);
    };
    
    vm.setTreeType('bst');
});
