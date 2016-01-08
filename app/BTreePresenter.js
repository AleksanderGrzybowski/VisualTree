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
     * @param {BSTNode|HeapNode} node
     * @param {number} [pos=0.5]
     * @param {number} [depth=2]
     * @returns {Object[]}
     */
    function toPositionalNodesArray(node, pos, depth) {
        if (arguments.length === 1) {
            return toPositionalNodesArray(node, 0.5, 0);
        }

        if (node === null) {
            return [];
        }

        var arr = [];

        arr.push({
            node: node,
            x: pos,
            y: depth
        });

        if (node.left !== null) {
            arr = arr.concat(toPositionalNodesArray(node.left, pos - Math.pow(0.5, depth + 2), depth + 1));
        }
        if (node.right !== null) {
            arr = arr.concat(toPositionalNodesArray(node.right, pos + Math.pow(0.5, depth + 2), depth + 1));
        }

        return arr;
    }

    /**
     * @param {BSTNode|HeapNode} node
     * @param {Object[]} nodesArray
     * @returns {Array}
     */
    function toLinksArray(node, nodesArray) {
        var arr = [];

        var getPositionalNode = function (node, nodesArray) {
            for (var i = 0; i < nodesArray.length; ++i) {
                if (nodesArray[i].node === node) return nodesArray[i];
            }
            throw new Error();
        };

        // here we duplicate some data,
        // maybe it should be like first>positionalNode>(x,y)
        // this would couple functions to-links and to-nodes
        // but maybe could be shorter...

        if (node === null) {
            return [];
        }

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
         * @param {BSTNode|HeapNode} [snapshot=that.tree]
         */
        update: function (snapshot) {
            $('svg').empty();
            
            if (snapshot === undefined || snapshot === null) {
                log.info('Empty tree'); // Intended or not
                return;
            }

            var positionalNodes = toPositionalNodesArray(snapshot);
            var links = toLinksArray(snapshot, positionalNodes);

            log.trace('Snapshot');
            log.trace(snapshot);
            log.trace('Positional nodes');
            log.trace(positionalNodes);
            log.trace('Links');
            log.trace(links);

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
                    CONFIG.circleRadius / snapshot.height()
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
                return height * (1 + y) / (snapshot.height() + 1);
            };


            var gs = data.enter()
                .append('g')
                .attr('transform', function (d) {
                    var $svg = $('svg');
                    return 'translate(' + xModelToViewMapper(d.x, $svg.width()) + ',' + yModelToViewMapper(d.y, $svg.height()) + ')';
                });

            gs.append('circle')
                .attr('r', CONFIG.circleRadius / snapshot.height())
                .style('fill', 'none')
                .style('stroke-width', 5)
                .style('z-index', 3)
                .style('fill', function (d) {
                    switch (d.node.visual) {
                        case 'current':
                            return 'orange';
                        case 'intermediate':
                            return 'lightblue';
                        default: // also for undefined
                            return 'none';
                    }
                })
                .style('stroke', function (d) {
                    if (d.node.color !== undefined) { // for red-black
                        return d.node.color;
                    } else {
                        return '#777777';
                    }
                });

            gs.append('text')
                .style('font-size', '15pt')
                .style('text-anchor', 'middle')
                .style('alignment-baseline', 'middle')
                .style('dominant-baseline', 'middle')
                .text(function (d) {
                    if (d.node.value === -1) {
                        return '~';
                    } else {
                        return '' + d.node.value;
                    }
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
    };
})();
