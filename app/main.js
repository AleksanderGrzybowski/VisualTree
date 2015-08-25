var visualTree = angular.module('visualTree', []);

visualTree.controller('MainCtrl', function () {
    log.info('Angular controller initializes');
    var vm = this;

    vm.treeType = 'bst';
    vm.number = 13;
    vm.animatedTree = new AnimatedBST(CONFIG.defaultBSTElements);

    // !!
    (function () {
        var $svg = $('svg');
        var $body = $('body');

        var newHeight = $body.height() * 0.7;
        var newWidth = $body.width() * 0.8;
        log.info('Setting svg size to ' + newHeight + 'x' + newWidth);

        $svg.height(newHeight);
        $svg.width(newWidth);
    })();
    vm.animatedTree.update();
    // !!


    vm.add = function () {
        if (!isNaN(vm.number)) { // stupid trick but hey JS
            vm.animatedTree.add(+vm.number);
        }
    };
    vm.delete = function () {
        if (!isNaN(vm.number)) {
            vm.animatedTree.delete(+vm.number);
        }
    };
    vm.inorder = function () {
        vm.animatedTree.inorder();
    };

    vm.deleteMin = function () {
        vm.animatedTree.deleteMin();
    };


    vm.setTreeType = function (newTreeType) {
        vm.treeType = newTreeType;

        if (vm.treeType === 'bst') {
            vm.animatedTree = new AnimatedBST(CONFIG.defaultBSTElements);
        } else if (vm.treeType === 'heap') {
            vm.animatedTree = new AnimatedHeap(CONFIG.defaultHeapElements);
        } else if (vm.treeType === 'rbt') {
            vm.animatedTree = new AnimatedRBT(CONFIG.defaultRBTElements);
        } else {
            throw new Error('Not yet implemented')
        }

        vm.animatedTree.update();
    };
});
