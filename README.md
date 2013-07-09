HTML is a small, extensible library to help you use the DOM in a simpler, more direct way. See [here][home] for a demo, more information and documentation.  Many thanks to Adrian Cooney for the inspiration and [starting point][voyeur] for this project.

[home]: http://nbubna.github.io/HTML
[voyeur]: http://dunxrion.github.io/voyeur.js

## Getting Started

Download: [HTML.min.js][all]  or  [HTML.js][core]  
Bower: `bower install HTML` 
[NPM][npm]: `npm install html.js`  (name change due to NPM restrictions)  

[all]: https://raw.github.com/nbubna/HTML/master/dist/HTML.min.js
[core]: https://raw.github.com/nbubna/HTML/master/src/HTML.js
[npm]: https://npmjs.org/package/html.js

In your web page:

```html
<script src="dist/HTML.min.js"></script>
<body>
    <div>
        <header>
            <h1 id="title"><em><a href="/">Hello world!</a></em></h1>
        </header>
        <section>
            <ul>
                <li class="item"><a href="#">Navigation Item</a></li>
                <li class="item"><a href="#">Navigation Item</a></li>
                <li class="item"><a href="#">Navigation Item</a></li>
                <li class="item"><a href="#">Navigation Item</a></li>
                <li class="item"><a href="#">Navigation Item</a></li>
            </ul>
        </section>
    </div>
</body>
```

```js
//Lets get the title link
HTML.body.div.header.h1.em.a.href = "http://google.com"
HTML.find("#title").em.a.innerText = "New title!";

//Let's get those navigation items
HTML.body.div.section.ul.li.each(function(li, i) {
    li.a.innerText = "Link #" + i;
});

HTML.body.div.section.ul.li(3).classList.add("Highlighted!");

//How about we add some content
var content = HTML.body.add('div>section*5>p>em').each(function(em) {
    em.textContext = "Hello world!";
});

HTML.body.div.appendChild(content);
```

## Todo
* Make HTML handle the DOMSubtreeModified event.

## Release History
_(Nothing yet)_
