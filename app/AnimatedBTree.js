/**
 * @param {Array} initialElements
 * @constructor
 */
function AnimatedBTree(initialElements) {
    var that = this;

    this.bTree = new BTreeNode(initialElements[0]);
    for (var i = 1; i < initialElements.length; ++i) {
        this.bTree.add(initialElements[i]);
    }

    //////////////////////   ALGORITHMS    //////////////////////

    /**
     * @param {number} what
     */
    this.add = function (what) {
        console.log('AnimatedBTree.add adding ' + what);
        var snc = new SnapshotCollector(this.bTree);

        this.bTree.add(what, snc);
        this.runAnimation(snc)
    };

    /**
     * @param {number} what
     */
    this.delete = function (what) {
        console.log('AnimatedBTree.add deleting ' + what);
        var snc = new SnapshotCollector(this.bTree);

        this.bTree.delete(what, snc);
        this.runAnimation(snc)
    };

    this.inorder = function () {
        var snc = new SnapshotCollector(this.bTree);

        this.bTree.inorder(snc);
        this.runAnimation(snc)
    };

    //////////////////////   INTERNALS    //////////////////////

    /**
     * @param {BTreeNode[]} snapshots
     */
    this.runAnimation = function (snc) {
        var snapshots = snc.snapshots;
        console.log('AnimatedBTree.animation snapshots.length=' + snapshots.length);

        var idx = 0;
        var timerId = setInterval(function () {
            console.log('AnimatedBTree.animation going through idx=' + idx);
            var snapshot = snapshots[idx++];
            $('#explanation').text(snapshot.text || '');
            that.update(snapshot);

            if (idx == snapshots.length) {
                clearInterval(timerId);
            }
        }, CONFIG.delay);
    };

    /**
     * @param {BTreeNode} [snapshot=that.bTree]
     */
    this.update = function (snapshot) {
        if (snapshot === undefined) {
            snapshot = that.bTree;
        }

        $('svg').empty();

        var nodes = toNodesArray(snapshot);
        var links = toLinksArray(snapshot, nodes);

        var data = d3.select('svg')
            .selectAll('circle')
            .data(nodes);

        /**
         * @param {Object} d
         * @returns {{x1: number, y1: number, x2: number, y2: number}}
         */
        var linesHelper = function (d) {
            var $svg = $('svg');
            return getPointsTouchingCircles(
                xModelToViewMapper(d.first.x, $svg),
                yModelToViewMapper(d.first.y, $svg),
                xModelToViewMapper(d.second.x, $svg),
                yModelToViewMapper(d.second.y, $svg),
                CONFIG.circleRadius
            );
        };

        /*
         * Those functions are used to scale stuff returned by toNodesArray
         * to positions on the screen.
         */
        var xModelToViewMapper = function (x, $svg) {
            return x * $svg.width();
        };
        var yModelToViewMapper = function (y, $svg) {
            return ((2 * y + 1) * $svg.height()) / CONFIG.levelsScalingFactor;
        };


        var gs = data.enter()
            .append('g')
            .attr('transform', function (d) {
                var $svg = $('svg');
                return 'translate(' + xModelToViewMapper(d.x, $svg) + ',' + yModelToViewMapper(d.y, $svg) + ')';
            });

        gs.append('circle')
            .attr('r', CONFIG.circleRadius)
            .style('fill', 'none')
            .style('stroke-width', 5)
            .style('z-index', 3)
            .style('stroke', function (d) {
                switch (d.node.visual) {
                    case 'current':
                        return 'red';
                        break;
                    case 'inorder-immediate':
                        return 'blue';
                    case '':
                        return 'black';
                    default:
                        throw new Error('Color not implemented!');
                }
            });

        gs.append('text')
            .style('font-size', '15pt')
            .style('text-anchor', 'middle')
            .style('alignment-baseline', 'middle')
            .style('dominant-baseline', 'middle')
            .text(function (d) {
                return '' + d.node.value;
            });


        d3.select('svg')
            .selectAll('line')
            .data(links)
            .enter()
            .append('line')
            .attr('x1', function (d) {
                return linesHelper(d).x1;
            })
            .attr('x2', function (d) {
                return linesHelper(d).x2;
            })
            .attr('y1', function (d) {
                return linesHelper(d).y1;
            })
            .attr('y2', function (d) {
                return linesHelper(d).y2;
            });
    };

    /**
     * @param {number} x1
     * @param {number} y1
     * @param {number} x2
     * @param {number} y2
     * @param {number} r
     * @returns {{x1: number, y1: number, x2: number, y2: number}}
     */
    function getPointsTouchingCircles(x1, y1, x2, y2, r) {
        var vecU = [x2 - x1, y2 - y1];
        var len = Math.sqrt(vecU[0] * vecU[0] + vecU[1] * vecU[1]);
        vecU[0] /= len;
        vecU[1] /= len;

        return {
            x1: x1 + vecU[0] * r,
            y1: y1 + vecU[1] * r,
            x2: x2 - vecU[0] * r,
            y2: y2 - vecU[1] * r
        };
    }

    /**
     * @param {BTreeNode} node
     * @param {number} [pos=0.5]
     * @param {number} [depth=2]
     * @returns {Object[]}
     */
    function toNodesArray(node, pos, depth) {
        if (arguments.length == 1) {
            return toNodesArray(node, 0.5, 0)
        }

        var arr = [];

        arr.push({
            node: node,
            x: pos,
            y: depth
        });

        if (node.left !== null) {
            arr = arr.concat(toNodesArray(node.left, pos - Math.pow(0.5, depth + 2), depth + 1))
        }
        if (node.right !== null) {
            arr = arr.concat(toNodesArray(node.right, pos + Math.pow(0.5, depth + 2), depth + 1))
        }

        return arr;
    }

    /**
     * @param {BTreeNode} node
     * @param {Object[]} nodesArray
     * @returns {{x: number, y: number}}
     */
    function getPosOfNode(node, nodesArray) {
        for (var i = 0; i < nodesArray.length; ++i) {
            if (node === nodesArray[i].node) {
                return {x: nodesArray[i].x, y: nodesArray[i].y};
            }
        }
        throw new Error("impossible");
    }

    /**
     * @param {BTreeNode} node
     * @param {Object[]} nodesArray
     * @returns {Array}
     */
    function toLinksArray(node, nodesArray) {
        var arr = [];

        if (node.left != null) {
            arr.push({
                first: {
                    node: node,
                    x: getPosOfNode(node, nodesArray).x,
                    y: getPosOfNode(node, nodesArray).y
                },
                second: {
                    node: node.left,
                    x: getPosOfNode(node.left, nodesArray).x,
                    y: getPosOfNode(node.left, nodesArray).y
                }
            });
        }

        if (node.right != null) {
            arr.push({
                first: {
                    node: node,
                    x: getPosOfNode(node, nodesArray).x,
                    y: getPosOfNode(node, nodesArray).y
                },
                second: {
                    node: node.right,
                    x: getPosOfNode(node.right, nodesArray).x,
                    y: getPosOfNode(node.right, nodesArray).y
                }
            });
        }

        if (node.left !== null) {
            arr = arr.concat(toLinksArray(node.left, nodesArray));
        }
        if (node.right !== null) {
            arr = arr.concat(toLinksArray(node.right, nodesArray));
        }

        return arr;
    }
}