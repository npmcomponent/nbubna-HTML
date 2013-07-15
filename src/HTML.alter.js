(function(document, _) {
    "use strict";

    var add = _.fn.add = function(arg) {
        var list = [];
        this.each(function(node) {
            list = list.concat(add.append(node, arg));
        });
        return _.list(list);
    };
    add.append = function(node, arg) {
        if (typeof arg === "string") {
            return add.create(node, arg);
        }
        if ('length' in arg) {// array of append-ables
            var ret = [];
            for (var i=0,m=arg.length; i<m; i++) {
                ret.push(add.append(node, arg[i]));
            }
            return ret;
        }
        // ok, assume they know what they're doing
        node.appendChild(arg);
        return arg;
    };
    add.create = function(node, tag) {
        var el = document.createElement(tag);
        node.appendChild(node);
        return el;
    };

    _.fn.remove = function() {
        var parents = [];
        this.each(function(node) {
            var parent = node.parentNode;
            if (parents.indexOf(parent) < 0) {
                parents.push(parent);
            }
            parent.removeChild(node);

            var key = _.type(node),
                val = parent[key];
            if (val && val.isNodeList) {
                val.splice(val.indexOf(node), 1);
            } else {
                delete parent[key];
            }
        });
        return _.list(parents);
    };

})(document, HTML._);