$(function () {
    var $svg = $('svg');
    var $body = $('body');

    $svg.height($body.height() * 0.7);
    $svg.width($body.width() * 0.8);
});

var visualTree = angular.module('visualTree', []);

visualTree.controller('MainCtrl', function () {
    var vm = this;

    vm.treeType = 'bst';
    vm.number = 13;
    vm.animatedTree = new AnimatedBST(CONFIG.defaultBSTElements);

    // !!
    vm.animatedTree.update();
    // !!


    vm.add = function () {
        if (!isNaN(vm.number)) { // stupid trick but hey JS
            vm.animatedTree.add(vm.number);
        }
    };
    vm.delete = function () {
        if (!isNaN(vm.number)) {
            vm.animatedTree.delete(vm.number);
        }
    };
    vm.inorder = function () {
        vm.animatedTree.inorder();
    };


    vm.setTreeType = function (newTreeType) {
        vm.treeType = newTreeType;

        if (vm.treeType === 'bst') {
            vm.animatedTree = new AnimatedBST(CONFIG.defaultBSTElements);
        } else if (vm.treeType === 'heap') {
            vm.animatedTree = new AnimatedHeap(CONFIG.defaultHeapElements);
        } else {
            throw new Error('Not yet implemented')
        }

        vm.animatedTree.update();
    };
});
