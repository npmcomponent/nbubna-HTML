(function(_) {
    "use strict";

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

})(HTML._);
