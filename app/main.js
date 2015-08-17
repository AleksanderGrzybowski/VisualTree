var visualTree = angular.module('visualTree', []);

visualTree.controller('MainCtrl', function () {
    var vm = this;

    $(function () {
        var $svg = $('svg');
        var $body = $('body');

        $svg.height($body.height() * 0.7);
        $svg.width($body.width() * 0.8);
    });


    vm.treeType = 'bst';
    vm.number = 13;
    vm.animatedTree = new AnimatedBST([80, 40, 120, 20, 60, 100, 140, 10, 30, 50, 70, 90, 110, 130, 150, 0, 160]);

    // !!
    vm.animatedTree.update();

    // TODO validation if really a number
    vm.add = function () {
        vm.animatedTree.add(+vm.number);
    };
    vm.delete= function () {
        vm.animatedTree.delete(+vm.number);
    };
    vm.inorder= function () {
        vm.animatedTree.inorder();
    };

    vm.setTreeType = function (newTreeType) {
        vm.treeType = newTreeType;
        if (vm.treeType === 'bst') {
            vm.animatedTree = new AnimatedBST([80, 40, 120, 20, 60, 100, 140, 10, 30, 50, 70, 90, 110, 130, 150, 0, 160]);
        } else if (vm.treeType === 'heap') {
            vm.animatedTree = new AnimatedHeap([10, 20, 30, 40]);
        }
        vm.animatedTree.update();
    };

});



console.log("Here!");