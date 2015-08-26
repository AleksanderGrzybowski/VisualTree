/**
 * @param {RBNode} parent
 * @constructor
 */
function RBNil(parent) {
    this.value = -1;
    this.color = 'black';

    this.parent = parent;

    // this is needed by visualization functions
    this.left = this.right = null;
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
    this.visual = 'current';
    SNC.add('Visiting node (' + this.value + ')');
    if (value < this.value) { // on the left
        if (this.left.isNil) {
            this.left = new RBNode(value);
            this.left.parent = this;
            this.left.color = 'red';
            SNC.add('Adding on the left, coloring it red');
            this.visual = '';
            this.left.insertCase1();
        } else {
            SNC.add('Going left');
            this.visual = '';
            this.left.add(value);
        }
    } else if (value > this.value) { // right
        if (this.right.isNil) {
            this.right = new RBNode(value);
            this.right.parent = this;
            this.right.color = 'red';
            SNC.add('Adding on the right, coloring it red');
            this.visual = '';
            this.right.insertCase1();
        } else {
            SNC.add('Going right');
            this.visual = '';
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
    this.visual = 'current';
    SNC.add('Case 1: is that the root node?');
    if (this.parent === null) {
        this.color = 'black';
        this.visual = '';
        SNC.add('Yes, coloring it black, finished');
    } else {
        SNC.add('No, it isn\'t, going to case 2');
        this.visual = '';
        this.insertCase2();
    }
};

RBNode.prototype.insertCase2 = function () {
    this.visual = 'current';
    SNC.add('Case 2: is the parent black?');
    if (this.parent.color !== 'black') {
        SNC.add('The parent is red, going to case 3');
        this.visual = '';
        this.insertCase3();
    } else {
        this.visual = '';
        SNC.add('Yes, it is black, finished');
    }
};

RBNode.prototype.insertCase3 = function () {
    this.visual = 'current';
    SNC.add('Case 3: are the parent and the uncle red?');
    var u = this.uncle();

    if (u !== null && u.color === 'red') {
        SNC.add('Yes, coloring them black and running case 1 on grandparent');
        this.parent.color = 'black';
        u.color = 'black';
        var g = this.grandparent();
        g.color = 'red';
        this.visual = '';
        g.insertCase1();
    } else {
        SNC.add('No, they aren\'t, going to case 4');
        this.visual = '';
        this.insertCase4();
    }
};

RBNode.prototype.insertCase4 = function () {
    this.visual = '';
    SNC.add('Case 4: parent is red and uncle is black, N is the right child of P');
    var g = this.grandparent();
    var n = this;

    if (n === n.parent.right && n.parent === g.left) {
        SNC.add('Rotating left');
        n.parent.rotateLeft();
        n = n.left;
    } else if (n === n.parent.left && n.parent === g.right) {
        SNC.add('Rotating right');
        n.parent.rotateRight();
        n = n.right;
    }
    SNC.add('Going to case 5');
    this.visual = '';
    n.insertCase5();
};

RBNode.prototype.insertCase5 = function () {
    this.visual = '';
    SNC.add('Case 5: parent is red and uncle is black');

    var g = this.grandparent();
    var n = this;

    n.parent.color = 'black';
    g.color = 'red';

    SNC.add('Coloring parent black and grandparent red');

    if (n === n.parent.left) {
        SNC.add('Rotating grandparent right');
        g.rotateRight();
    } else {
        SNC.add('Rotating grandparent left');
        g.rotateLeft();
    }
    this.visual = '';
    SNC.add('Finished');
};

RBNode.prototype.rotateLeft = function () {
    SNC.add('Rotating left');
    if (this.parent === null) { // rotating root
        this.tree.rotateLeftRoot();
        return;
    }

    var g = this.parent;
    var p = this;
    var n = this.right;
    var savedLeftN = n.left;

    if (p === g.left) {
        g.left = n;
    } else {
        g.right = n;
    }
    n.parent = g;
    n.left = p;
    p.parent = n;
    p.right = savedLeftN;
    savedLeftN.parent = p;
};

RBNode.prototype.rotateRight = function () {
    SNC.add('Rotating right');
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