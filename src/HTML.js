/*
 * Copyright (c) 2013 ESHA Research
 * License under the MIT license.
 */
(function(window, document) {
    "use strict";

    var _ = {
        version: "<%= pkg.version %>",
        slice: _.slice,
        prep: function(o) {
            if (o.length !== 1) {// nodelist
                o = _.slice.call(o);
            } else {
                o = o[0];// node
                o.isNode = true;
                _.defineChildren(o);
            }
            for (var name in _.fn) {
                o[name] = _.fn[name].bind(o);
            }
        },
        defineChildren: function(node) {
            for(var i=0, m=node.children.length, map={}; i<m; i++) {
                var child = node.children[i],
                    tag = child.tagName.toLowerCase();
                (map[tag]||map[tag]=[]).push(child);
            }
            Object.keys(map).forEach(function(key) {
                Object.defineProperty(node, key, {
                    get: function() {
                        return _.prep(map[key]);
                    },
                    configurable: true
                });
            });
        },
        fn: {
            each: function(fn) {
                var self = this.isNode ? [this] : this;
                self.forEach(function(el, i, arr) {
                    fn.call(self, _.prep(el), i, arr);
                });
                return this;
            },
            find: function(selector) {
                var self = this.isNode ? [this] : this;
                for (var o=[],i=0,m=self.length; i<m; i++) {
                    o = o.concat(_.slice.call(self[i].querySelectorAll(selector)));
                }
                return _.prep(all);
            },
            only: function(b, e) {
                var self = this.isNode ? [this] : this,
                return _.prep(
                    b >= 0 || b < 0 ?
                        self.slice(b, e || (b + 1)) :
                        self.filter(
                            typeof b === "function" ? b :
                            function(el){ return el[_.matches](b); }
                        )
                );
            }
        }
    };

    var HTML = _.prep(document.documentElement);
    HTML._ = _;
    ['m','webkitM','mozM','msM'].forEach(function(prefix) {
        if (HTML[prefix+'atchesSelector']) {
            _.matches = prefix+'atchesSelector';
        }
    });
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = HTML;
    } else {
        this.HTML = HTML;
    }

})(window, document);
