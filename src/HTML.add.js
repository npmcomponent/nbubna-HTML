(function(window, document, HTML, _) {
    "use strict";

    _.fn.add = function(zen) {
        if (this.isNode) {
            var el = _.create(zen);
            this.appendChild(el);
            return _.prep(el);
        } else {
            var els = [],
                node = _.create(zen);
            this.forEach(function(parent) {
                var el = node.cloneNode(true);
                parent.appendChild(el);
                els.push(el);
            });
            return _.prep(els);
        }
    };
    _.re = function() {
        var chars = '\\'+Object.keys(_.syntax).join('|\\');
        return new RegExp('(?='+chars+')','g');
    };
    _.create = function(zen) {
        var parts = zen.split(_.re()),
            root = document.createDocumentFragment(),
            el = document.createElement(parts[0]);
        root.appendChild(el);
        for (var i=1,m=parts.length; i<m; i++) {
            var part = parts[i];
            el = _.syntax[part.charAt(0)].call(el, part.substr(1), root) || el;
        }
        return root;
    };
    _.syntax = {
        '#': function(id) {
            this.id = val;
        },
        '.': function(cls) {
            var list = this.getAttribute('class');
            list = list + (list ? ' ' : '') + cls;
            this.setAttribute('class', list);
        },
        '[': function(attrs) {
            attrs = attrs.substr(1, attr.length-1).match(/(?:[^\s"]+|"[^"]*")+/g);
            for (var i=0,m=attrs.length; i<m; i++) {
                var attr = attrs[i].split('='),
                this.setAttribute(attr[0], attr[1] || '');
            }
        },
        '>': function(tag) {
            if (tag.length <= 1) {
                return this;
            } else {
                var el = document.createElement(tag.substr(1));
                this.appendChild(el);
                return el;
            }
        },
        '+': function(tag) {
            return _.zen['>'].call(this.parentNode, tag);
        },
        '*': function(count) {
            var parent = this.parentNode,
                els[this];
            for (var i=1; i<count; i++) {
                els.push(this.cloneNode(true));
                parent.appendChild(els[i]);
            }
            return els;
        },
        '^': function(tag, root) {
            return _.zen['>'].call(this.parentNode || root, tag);
        },
        '{': function(text) {
            this.innerText = text.substr(1, text.length - 2);
        }
    };

})(window, document, HTML, HTML._);