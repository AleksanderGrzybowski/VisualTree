var visualTree = angular.module('visualTree', []);

visualTree.controller('MainCtrl', function () {
    log.info('Angular controller initializes');
    var vm = this;

    vm.delay = 1000;
    vm.treeType = 'bst';

    /**
     * @type {number}
     */
    vm.number = '';
    
    vm.tree = new BSTree();
    
    vm.currentSnapshotsArray = [];
    vm.selectedSnapshotIndex = 0;
    
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
    //vm.animatedTree.update();
    // !!


    vm.add = function () {
        if (!isNaN(vm.number)) { // stupid trick but hey JS
            SNC.init(vm.tree, 'bst');
            vm.tree.add(+vm.number);
            vm.currentSnapshotsArray = SNC.getSnapshotsAndDisable();
            BTreePresenter.update(vm.currentSnapshotsArray[vm.currentSnapshotsArray.length-1]);
        }
    };
    
    vm.delete = function () {
        if (!isNaN(vm.number)) {
            SNC.init(vm.tree, 'bst');
            vm.tree.delete(+vm.number);
            vm.currentSnapshotsArray = SNC.getSnapshotsAndDisable();
            BTreePresenter.update(vm.currentSnapshotsArray[vm.currentSnapshotsArray.length-1]);
        }
    };
    
    vm.inorder = function () {
        SNC.init(vm.tree, 'bst');
        vm.tree.inorder();
        vm.currentSnapshotsArray = SNC.getSnapshotsAndDisable();
        BTreePresenter.update(vm.currentSnapshotsArray[vm.currentSnapshotsArray.length-1]);
    };

    vm.deleteMin = function () {
        SNC.init(vm.tree, 'bst');
        vm.tree.deleteMin();
        vm.currentSnapshotsArray = SNC.getSnapshotsAndDisable();
        BTreePresenter.update(vm.currentSnapshotsArray[vm.currentSnapshotsArray.length-1]);
    };

    vm.setTreeType = function (newTreeType) {
        vm.treeType = newTreeType;
        var i;
        
        if (vm.treeType === 'bst') {
            vm.tree = new BSTree();
            for (i = 0; i < CONFIG.defaultBSTElements.length; ++i) {
                vm.tree.add(CONFIG.defaultBSTElements[i]);
            }
        } else if (vm.treeType === 'heap') {
            vm.tree = new Heap();
            for (i = 0; i < CONFIG.defaultHeapElements.length; ++i) {
                vm.tree.add(CONFIG.defaultHeapElements[i]);
            }
        } else if (vm.treeType === 'rbt') {
            vm.tree = new RBTree();
            for (i = 0; i < CONFIG.defaultRBTElements.length; ++i) {
                vm.tree.add(CONFIG.defaultRBTElements[i]);
            }
        } else {
            throw new Error('Not yet implemented')
        }

        SNC.init(vm.tree, vm.treeType);
        SNC.add('Freshly created');
        vm.currentSnapshotsArray = SNC.getSnapshotsAndDisable();
        BTreePresenter.update(vm.currentSnapshotsArray[0]);
    };
    
    vm.updateView = function () {
        BTreePresenter.update(vm.currentSnapshotsArray[vm.selectedSnapshotIndex]);
    };
    
    vm.setSelectedSnapshot = function (index) {
        vm.selectedSnapshotIndex = index;
        vm.updateView(); // TODO replace with watch?
    };
    
    vm.next = function () {
        if (vm.currentSnapshotsArray.length - 1 > vm.selectedSnapshotIndex) {
            vm.selectedSnapshotIndex++;
        }
        vm.updateView();
    };
    
    vm.previous = function () {
        if (vm.selectedSnapshotIndex > 0) {
            vm.selectedSnapshotIndex--;
        }
        vm.updateView();
    };
    
    vm.setTreeType('bst');

    
});
