(function(window, document) {
    "use strict";

    var _ = {
        version: "<%= pkg.version %>",
        slice: Array.prototype.slice,
        list: function(list) {
            if (list.isNodeList){ return list; }
            if (list.length === 1){ return _.node(list[0]); }
            list = _.slice.call(list);
            list.isNodeList = true;
            _.functions(list);
            return list;
        },
        node: function(node) {
            if (!node.isNode) {
                node.isNode = true;
                _.functions(node);
            }
            _.children(node);// make sure we're current
            return node;
        },
        functions: function(o) {
            for (var name in _.fn) {
                o[name] = _.fn[name].bind(o);
            }
        },
        children: function(node) {
            for(var i=0, m=node.childNodes.length, map={}; i<m; i++) {
                var child = node.childNodes[i],
                    type = _.type(child);
                (map[type]||(map[type]=[])).push(child);
            }
            Object.keys(map).forEach(function(key) {
                try {
                    Object.defineProperty(node, key, _.definition(map[key]));
                } catch (e) {}
            });
        },
        type: function(node) {
            return node.tagName ? node.tagName.toLowerCase() :
                   node.nodeType === 3 && node.textContent.trim() ? '_text' :
                   '_empty';
        },
        definition: function(children) {
            return {
                get: function(){ return _.list(children); },
                configurable: true
            };
        },
        fn: {
            each: function(fn) {
                var self = this.isNode ? [this] : this;
                self.forEach(function(el, i, arr) {
                    fn.call(self, _.node(el), i, arr);
                });
                return this;
            },
            find: function(selector) {
                var self = this.isNode ? [this] : this;
                for (var list=[],i=0,m=self.length; i<m; i++) {
                    list = list.concat(_.slice.call(self[i].querySelectorAll(selector)));
                }
                return _.list(list);
            },
            only: function(b, e) {
                var self = this.isNode ? [this] : this;
                return _.list(
                    b >= 0 || b < 0 ?
                        self.slice(b, e || (b + 1) || undefined) :
                        self.filter(
                            typeof b === "function" ? b :
                            function(el){ return el[_.matches](b); }
                        )
                );
            }
        }
    };

    var HTML = _.node(document.documentElement);// early, for use in head
    HTML._ = _;
    ['m','webkitM','mozM','msM'].forEach(function(prefix) {
        if (HTML[prefix+'atchesSelector']) {
            _.matches = prefix+'atchesSelector';
        }
    });
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = HTML;
    } else {
        window.HTML = HTML;
    }
    // again, for use in body
    document.addEventListener("DOMContentLoaded", function(){ _.node(HTML); });

})(window, document);
