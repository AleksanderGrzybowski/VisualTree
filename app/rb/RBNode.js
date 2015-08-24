function RBNil(parent) {
    this.value = 666;
    this.color = 'black';

    this.parent = parent;
    // no left nor right - will throw error if misused
}

RBNil.prototype.isNil = true;



function RBNode(value) {
    this.value = value;
    this.color = 'black'; // root is black, first new call

    this.left = new RBNil(this);
    this.right = new RBNil(this);
    this.parent = null;
}

RBNode.prototype.isNil = false;

RBNode.prototype.add = function (value) {
    if (value < this.value) { // on the left
        if (this.left.isNil) {
            this.left = new RBNode(value);
            this.left.parent = this;
            this.left.color = 'red';
            this.left.insertCase1();
        } else {
            this.left.add(value);
        }
    } else if (value > this.value) { // right
        if (this.right.isNil) {
            this.right = new RBNode(value);
            this.right.parent = this;
            this.right.color = 'red';
            this.right.insertCase1();
        } else {
            this.right.add(value);
        }
    }
    // already here - do nothing
};

RBNode.prototype.grandparent = function () {
    if (this.parent != null) {
        return this.parent.parent; // asssumes root.parent == null
    } else {
        return null;
    }
};

RBNode.prototype.uncle = function () {
    var gnp = this.grandparent();

    if (gnp == null) {
        return null;
    }
    if (this.parent == gnp.left) {
        return gnp.right;
    } else {
        return gnp.left;
    }
};

RBNode.prototype.insertCase1 = function () {
    if (this.parent == null) {
        this.color = 'black';
    } else {
        this.insertCase2();
    }
};

RBNode.prototype.insertCase2 = function () {
    if (this.parent.color != 'black') {
        this.insertCase3();
    }
};

RBNode.prototype.insertCase3 = function () {
    var uncle = this.uncle();
    var gnp;

    if ((uncle != null) && uncle.color == 'red') {
        this.parent.color = 'black';
        uncle.color = 'black';
        gnp = this.grandparent();
        gnp.color = 'red';
        gnp.insertCase1();
    } else {
        this.insertCase4();
    }
};

RBNode.prototype.insertCase4 = function () {
    var g = this.grandparent();
    var n = this;
    if (n === n.parent.right && n.parent === g.left) {
        n.parent.rotateLeft();
        n = n.left;
    } else if (n === n.parent.left && n.parent === g.right) {
        n.parent.rotateRight();
        n = n.right;
    }
    n.insertCase5();
};

RBNode.prototype.insertCase5 = function () {
    var g = this.grandparent();
    var n = this;
    n.parent.color = 'black';
    g.color = 'red';
    if (n === n.parent.left) {
        g.rotateRight();
    } else {
        g.rotateLeft();
    }
};

RBNode.prototype.rotateLeft = function () {
    if (this.parent === null) { // rotating root
        this.tree.rotateLeftRoot();
        return;
    }

    var g = this.parent;
    var p = this;
    var n = this.right;
    var savedLeftN = n.left;

    g.left = n;
    n.parent = g;
    n.left = p;
    p.parent = n;
    p.right = savedLeftN;
    savedLeftN.parent = p;
};

RBNode.prototype.rotateRight = function () {
    if (this.parent === null) { // rotating root
        this.tree.rotateRightRoot();
        return;
    }

    var g = this.parent;
    var n = this;
    var p = this.left;
    var savedRightP = p.right;

    g.left = p;
    p.parent = g;
    p.right = n;
    n.parent = p;
    n.left = savedRightP;
    savedRightP.parent = n;
};