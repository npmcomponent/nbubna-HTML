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
            if (o.length > 1) {// nodelist
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
                if (this.isNode) {
                    fn.call(this, this, 1, true);
                } else {
                    var self = this;
                    this.forEach(function(el, i) {
                        el = _.prep(el);
                        fn.call(self, el, i);
                    });
                }
                return this;
            },
            find: function(selector) {
                if (this.isNode) {
                    return _.prep(_.slice.call(this.querySelectorAll(selector)));
                }
                for (var i=0,m=this.length,all=[]; i<m; i++) {
                    all = all.concat(_.slice.call(this[i].querySelectorAll(selector)));
                }
                return _.prep(all);
            },
            slice: function(begin, e) {
                if (this.isNode) {
                    return begin === 0 ? this : null;
                }
                return _.prep(this.slice(begin, end || (begin + 1)))
            }
        }
    };

    var HTML = _.prep(document.documentElement);
    HTML._ = _;
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = HTML;
    } else {
        this.HTML = HTML;
    }

})(window, document);
