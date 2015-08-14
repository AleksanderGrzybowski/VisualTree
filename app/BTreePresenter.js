var BTreePresenter = (function () {

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
    function toPositionalNodesArray(node, pos, depth) {
        if (arguments.length === 1) {
            return toPositionalNodesArray(node, 0.5, 0)
        }

        var arr = [];

        arr.push({
            node: node,
            x: pos,
            y: depth
        });

        if (node.left !== null) {
            arr = arr.concat(toPositionalNodesArray(node.left, pos - Math.pow(0.5, depth + 2), depth + 1))
        }
        if (node.right !== null) {
            arr = arr.concat(toPositionalNodesArray(node.right, pos + Math.pow(0.5, depth + 2), depth + 1))
        }

        return arr;
    }

    /**
     * @param {BTreeNode} node
     * @param {Object[]} nodesArray
     * @returns {Array}
     */
    function toLinksArray(node, nodesArray) {
        var arr = [];

        var getPositionalNode = function (node, nodesArray) {
            return _.find(nodesArray, {node: node});
        };

        // here we duplicate some data,
        // maybe it should be like first>positionalNode>(x,y)
        // this would couple functions to-links and to-nodes
        // but maybe could be shorter...

        if (node.left !== null) {
            arr.push({
                first: {
                    node: node,
                    x: getPositionalNode(node, nodesArray).x,
                    y: getPositionalNode(node, nodesArray).y
                },
                second: {
                    node: node.left,
                    x: getPositionalNode(node.left, nodesArray).x,
                    y: getPositionalNode(node.left, nodesArray).y
                }
            });

            arr = arr.concat(toLinksArray(node.left, nodesArray));
        }

        if (node.right !== null) {
            arr.push({
                first: {
                    node: node,
                    x: getPositionalNode(node, nodesArray).x,
                    y: getPositionalNode(node, nodesArray).y
                },
                second: {
                    node: node.right,
                    x: getPositionalNode(node.right, nodesArray).x,
                    y: getPositionalNode(node.right, nodesArray).y
                }
            });

            arr = arr.concat(toLinksArray(node.right, nodesArray));
        }

        return arr;
    }

    return {
        /**
         * @param {SnapshotCollector} snc
         */
        runAnimation: function (snc) {
            var snapshots = snc.snapshots;
            console.log('AnimatedBTree.animation snapshots.length=' + snapshots.length);

            var idx = 0;
            var timerId = setInterval(function () {
                console.log('AnimatedBTree.animation going through idx=' + idx);
                var snapshot = snapshots[idx++];
                $('#explanation').text(snapshot.text || '');
                BTreePresenter.update(snapshot);

                if (idx === snapshots.length) {
                    clearInterval(timerId);
                }
            }, CONFIG.delay);
        },

        /**
         * @param {BTreeNode} [snapshot=that.tree]
         */
        update: function (snapshot) {
            if (snapshot === undefined) {
                throw new Error("Must be something");
            }

            $('svg').empty();

            var positionalNodes = toPositionalNodesArray(snapshot);
            var links = toLinksArray(snapshot, positionalNodes);

            var data = d3.select('svg')
                .selectAll('circle')
                .data(positionalNodes);

            /**
             * @param {Object} d
             * @returns {{x1: number, y1: number, x2: number, y2: number}}
             */
            var linesHelper = function (d) {
                var $svg = $('svg');
                var width = $svg.width();
                var height = $svg.height();

                return getPointsTouchingCircles(
                    xModelToViewMapper(d.first.x, width),
                    yModelToViewMapper(d.first.y, height),
                    xModelToViewMapper(d.second.x, width),
                    yModelToViewMapper(d.second.y, height),
                    CONFIG.circleRadius
                );
            };

            /*
             * Those functions are used to scale stuff returned by toPositionalNodesArray
             * to positions on the screen.
             */
            var xModelToViewMapper = function (x, width) {
                // x in <0,1>
                return x * width;
            };
            var yModelToViewMapper = function (y, height) {
                return ((2 * y + 1) * height) / CONFIG.levelsScalingFactor;
            };


            var gs = data.enter()
                .append('g')
                .attr('transform', function (d) {
                    var $svg = $('svg');
                    return 'translate(' + xModelToViewMapper(d.x, $svg.width()) + ',' + yModelToViewMapper(d.y, $svg.height()) + ')';
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
                        case 'intermediate':
                            return 'blue';
                        case '':
                            return 'black';
                        case undefined:
                            console.warn('Color not defined, defaulting to black');
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
        }
    }
})();



