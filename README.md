HTML is a small, extensible library to help you use the DOM in a simpler, more direct way.
See [here][home] for a demo, more information and documentation.
Thanks to Adrian Cooney for the inspiration and [starting point][voyeur] for this project.

[home]: http://nbubna.github.io/HTML
[voyeur]: http://dunxrion.github.io/voyeur.js

## Getting Started

Download: [HTML.min.js][prod]  or  [HTML.js][dev]  
[Bower][bower]: `bower install HTML`  
[NPM][npm]: `npm install html.js`   

[prod]: https://raw.github.com/nbubna/HTML/master/dist/HTML.min.js
[dev]: https://raw.github.com/nbubna/HTML/master/dist/HTML.all.js
[npm]: https://npmjs.org/package/html.js
[bower]: http://bower.io/

## Example Usage

```html
<script src="dist/HTML.min.js"></script>
<body>
  <header>
    <h1 id="title"><a href="/">HTML!</a></h1>
  </header>
  <section>
    <ul>
      <li><a href="#1">Tab 1</a></li>
      <li><a href="#2">Tab 2</a></li>
      <li><a href="#3">Tab 3</a></li>
      <li><a href="#4">Tab 4</a></li>
      <li><a href="#5">Tab 5</a></li>
    </ul>
  </section>
</body>
```

```js
// direct traversal
var url = HTML.body.div.header.h1.a.href;

// easy, contextual search
HTML.body.find("#title a").textContent = "New title!";

// an each() function to use the selected node or nodes
HTML.body.section.ul.li.each(function(li, i) {
    li.a.textContent = "Link #" + i;
});

// an only() function to narrow your selection
var list = HTML.find('li');
list.only(4).classList.add('highlighted');                  // by index
list.only(0, 4).classList.remove('highlighted');            // by slice
list.only('.highlighted').style.fontStyle = 'italic';       // by selector
list.only(function(l,i){return i%2;}).textContent += 'Odd'; // by function
```

## Extensions
The [minified][all] version automatically includes 
`find()`,`each()`,`only()`,`add()`and`remove()` (so far). 
The one "official" extensions (so far) is:

#### [HTML.emmet.js][add]

[add]: http://raw.github.com/nbubna/HTML/master/dist/HTML.emmet.js

```js
// use simple expressions with `add()` ([emmet][emmet] w/o grouping or numbering)
var content = HTML.body.add('div>section*5>p>').each(function(p) {
    p.textContext = "Hello world!";
});
```

[emmet]: http://docs.emmet.io/abbreviations/syntax/

## Release History
* 2013-08-01 v0.9.0 (estimated first release)

[v1.0.0]: https://github.com/nbubna/store/tree/1.0.0
