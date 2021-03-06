var visualTree = angular.module('visualTree', []);

visualTree.controller('MainCtrl', function ($interval) {
    log.info('Angular controller initializes');
    var vm = this;

    vm.treeType = 'bst';

    /**
     * @type {number}
     */
    vm.number = '';
    
    vm.tree = null; // set later
    
    vm.currentSnapshots = [];
    vm.currentSnapshotIndex = 0;

    vm.animationPromise = null;
    vm.isPlaying = false;
    
    // !!
    // We need to wait till bootstrap calculates
    // the width of column that contains the tree
    setTimeout(function () {
        var $svg = $('svg');
        var $body = $('body');
        var $container = $('#svg-container');

        var newWidth = $container.width();
        var newHeight = $body.height() * 0.5; // reasonable compromise
        log.info('Setting svg size to ' + newHeight + 'x' + newWidth);

        $svg.height(newHeight);
        $svg.width(newWidth);

        vm.setTreeType('bst');
    }, 100);
    // !!

    function wrapAroundDisplaying(f) {
        return function () {
            SNC.init(vm.tree, vm.treeType);
            f();
            vm.currentSnapshots = SNC.getSnapshotsAndDisable();
            vm.currentSnapshotIndex = 0;
            BTreePresenter.update(vm.currentSnapshots[vm.currentSnapshots.length - 1]);
        };
    }

    vm.add = wrapAroundDisplaying(function () {
        if (!isNaN(vm.number)) {
            vm.tree.add(+vm.number);
        }
    });

    vm.delete = wrapAroundDisplaying(function () {
        if (!isNaN(vm.number)) {
            vm.tree.delete(+vm.number);
        }
    });

    vm.inorder = wrapAroundDisplaying(function () {
        vm.tree.inorder();
    });

    vm.preorder = wrapAroundDisplaying(function () {
        vm.tree.preorder();
    });

    vm.postorder = wrapAroundDisplaying(function () {
        vm.tree.postorder();
    });

    vm.deleteMin = wrapAroundDisplaying(function () {
        vm.tree.deleteMin();
    });

    vm.find = wrapAroundDisplaying(function () {
        if (!isNaN(vm.number)) {
            vm.tree.find(+vm.number);
        }
    });

    vm.setTreeType = function (newTreeType) {
        vm.treeType = newTreeType;
        vm.isPlaying = false;
        vm.currentSnapshotIndex = 0;
        
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
            },
            splay: {
                instance: new SplayTree(),
                elements: CONFIG.defaultSplayTreeElements
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

    vm.togglePlay = function () {
        if (vm.isPlaying) {
            vm.isPlaying = false;
            $interval.cancel(vm.animationPromise);
        } else {
            vm.isPlaying = true;
            vm.currentSnapshotIndex = 0;

            vm.animationPromise = $interval(function () {
                vm.updateView();
                vm.currentSnapshotIndex++;

                if (vm.currentSnapshotIndex >= vm.currentSnapshots.length) {
                    vm.currentSnapshotIndex--; // this makes more sense than playing with control flow
                    $interval.cancel(vm.animationPromise);
                    vm.isPlaying = false;
                }
            }, CONFIG.delay);
        }
    };
    
    vm.setTreeType('bst');
});
