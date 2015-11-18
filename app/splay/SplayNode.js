function SplayNode(value) {

    this.left = null;
    this.right = null;
    this.parent = null;
    this.value = value;

    this.visual = '';


    this.isLeaf = function () {
        return this.left === null && this.right === null;
    };
   
    this.splay = function () {
        
    }
}