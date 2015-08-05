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

    /**
     * @param {number} what
     */
    this.add = function (what) {
        console.log('AnimatedBTree.add adding ' + what);
        var snapshots = [];

        this.bTree.add(what, snapshots);
        this.runAnimation(snapshots)
    };

    this.inorder = function () {
        var snapshots = [];

        this.bTree.inorder(snapshots);
        this.runAnimation(snapshots)
    };

    /**
     * @param {BTreeNode[]} snapshots
     */
    this.runAnimation = function (snapshots) {
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
     *
     * @param {BTreeNode} [snapshot=that.bTree]
     */
    this.update = function (snapshot) {
        $('svg').empty();

        if (snapshot === undefined) {
            snapshot = that.bTree;
        }

        var nodes = toNodesArray(snapshot);
        var links = toLinksArray(snapshot, nodes);

        var data = d3.select('svg')
            .selectAll('circle')
            .data(nodes);


        var gs = data.enter()
            .append('g')
            .attr('transform', function (d) {
                return 'translate(' + (d.x * 720) + ',' + (d.y * 100) + ')'
            });

        gs.append('circle')
            .attr('r', 10)
            .style('fill', 'black')
            .style('fill', function (d) {
                if (d.node.isred == true) {
                    return "red";
                } else {
                    return "green";
                }
            });

        gs.append('text')
            .text(function (d) {
                return '' + d.node.value;
            })
            .attr('x', -10)
            .attr('y', 30);

        d3.select('svg')
            .selectAll('line')
            .data(links)
            .enter()
            .append('line')
            .attr('x1', function (d) {
                return d.first.x * 720;
            })
            .attr('x2', function (d) {
                return d.second.x * 720;
            })
            .attr('y1', function (d) {
                return d.first.y * 100;
            })
            .attr('y2', function (d) {
                return d.second.y * 100;
            })
    };

    /**
     * @param {BTreeNode} node
     * @param {number} [pos=0.5]
     * @param {number} [depth=2]
     * @returns {Object[]}
     */
    function toNodesArray(node, pos, depth) {
        if (arguments.length == 1) {
            return toNodesArray(node, 0.5, 2)
        }

        var arr = [];

        arr.push({
            node: node,
            x: pos,
            y: depth
        });

        if (node.left !== null) {
            arr = arr.concat(toNodesArray(node.left, pos - Math.pow(0.5, depth), depth + 1))
        }
        if (node.right !== null) {
            arr = arr.concat(toNodesArray(node.right, pos + Math.pow(0.5, depth), depth + 1))
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
            if (node.value === nodesArray[i].node.value) { // TODO compare by ref
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