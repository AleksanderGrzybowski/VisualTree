/**
 * @param {RBNode} parent
 * @constructor
 */
function RBNil(parent) {
    this.value = 666;
    this.color = 'black';

    this.parent = parent;

    // no left nor right - will throw error if misused
}

RBNil.prototype.isNil = true;

//------------------------------------------------------------

/**
 * @param {number} value
 * @constructor
 */
function RBNode(value) {
    this.value = value;

    // this will be set on creation
    this.color = undefined;

    // the root node will be given this property
    // when tree is constructed
    // also shuts up Intellij about missing method (?)
    this.tree = undefined;

    this.left = new RBNil(this);
    this.right = new RBNil(this);
    this.parent = null;
}

RBNode.prototype.isNil = false;

/**
 * @param {number} value
 */
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
    // duplicates not allowed
};

/**
 * @returns {RBNode}
 */
RBNode.prototype.grandparent = function () {
    if (this.parent !== null) {
        return this.parent.parent; // asssumes root.parent == null
    } else {
        return null;
    }
};

/**
 * @returns {RBNode}
 */
RBNode.prototype.uncle = function () {
    var g = this.grandparent();

    if (g === null) {
        return null;
    } else if (this.parent === g.left) {
        return g.right;
    } else {
        return g.left;
    }
};

RBNode.prototype.insertCase1 = function () {
    if (this.parent === null) {
        this.color = 'black';
    } else {
        this.insertCase2();
    }
};

RBNode.prototype.insertCase2 = function () {
    if (this.parent.color !== 'black') {
        this.insertCase3();
    }
};

RBNode.prototype.insertCase3 = function () {
    var u = this.uncle();

    if (u !== null && u.color === 'red') {
        this.parent.color = 'black';
        u.color = 'black';
        var g = this.grandparent();
        g.color = 'red';
        g.insertCase1();
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