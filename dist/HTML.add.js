/*! HTML - v0.9.0 - 2013-07-15
* http://nbubna.github.io/HTML/
* Copyright (c) 2013 ESHA Research; Licensed MIT, GPL */
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
        if (typeof arg === "string") {// emmet-like code
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
    add.create = function(node, code) {
        var parts = code.split(add.re()),
            root = document.createDocumentFragment(),
            el = document.createElement(parts[0]);
        root.appendChild(el);
        for (var i=1,m=parts.length; i<m; i++) {
            var part = parts[i];
            el = add.syntax[part.charAt(0)].call(el, part.substr(1), root) || el;
        }
        node.appendChild(root);
        return el;
    };
    add.re = function() {
        var chars = '\\'+Object.keys(add.syntax).join('|\\');
        return new RegExp('(?='+chars+')','g');
    };
    add.syntax = {
        '#': function(id) {
            this.id = id;
        },
        '.': function(cls) {
            var list = this.getAttribute('class') || '';
            list = list + (list ? ' ' : '') + cls;
            this.setAttribute('class', list);
        },
        '[': function(attrs) {
            attrs = attrs.substr(0, attrs.length-1).match(/(?:[^\s"]+|"[^"]*")+/g);
            for (var i=0,m=attrs.length; i<m; i++) {
                var attr = attrs[i].split('=');
                this.setAttribute(attr[0], (attr[1] || '').replace(/"/g, ''));
            }
        },
        '>': function(tag) {
            if (tag) {
                var el = document.createElement(tag);
                this.appendChild(el);
                return el;
            }
            return this;
        },
        '+': function(tag, root) {
            return add.syntax['>'].call(this.parentNode || root, tag);
        },
        '*': function(count) {
            var parent = this.parentNode,
                els = [this];
            for (var i=1; i<count; i++) {
                els.push(this.cloneNode(true));
                parent.appendChild(els[i]);
            }
            //TODO: numbering for els
            return els;
        },
        '^': function(tag, root) {
            return add.syntax['+'].call(this.parentNode || root, tag, root);
        },
        '{': function(text) {
            this.appendChild(document.createTextNode(text.substr(0, text.length-1)));
        }
    };

})(document, HTML._);