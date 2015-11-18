function SplayTree() {
    this.root = null;


    this.add = function (value) {
        if (this.root === null) {
            this.root = new SplayNode(value);
        } else {
            this.root.add(value);
        }
    };
}