(function() {
  /*
    ======== A Handy Little QUnit Reference ========
    http://api.qunitjs.com/

    Test methods:
      module(name, {[setup][ ,teardown]})
      test(name, callback)
      expect(numberOfAssertions)
      stop(increment)
      start(decrement)
    Test assertions:
      ok(value, [message])
      equal(actual, expected, [message])
      notEqual(actual, expected, [message])
      deepEqual(actual, expected, [message])
      notDeepEqual(actual, expected, [message])
      strictEqual(actual, expected, [message])
      notStrictEqual(actual, expected, [message])
      throws(block, [expected], [message])
  */

	module("HTML element creation");

	test("HTML.body.add('tag') -- Creates <tag>", 2, function() {
		equal(HTML.body.create('a').tagName, "a", "Tag created.");
		ok(HTML.body.a, 'Tag found.');
	});

	test("HTML.body.add('tag>tag') -- Creates nested <tag>s", 2, function() {
		equal(HTML.body.add('div>div').tagName, "DIV", "Tags created.");
		equal(HTML.body.div.div, 'Tags found.')
	});

	test("HTML.body.add('tag+tag').add('tag') -- Create siblings with kids", 2, function() {
		var titles = HTML.body.add('section+section').add('h1');

		equal(span.tagName, "SPAN", "Tag created");
		equal(span.parentNode.tagName, "SECTION", "Tag within parent");
	});

	test("HTML.body.<tag>.add('')<tag>.mult(<int>) -- Element multiplication on tag and appended", 4, function() {
		var spans = HTML.body.section.add('')span.mult(10);

		ok(spans instanceof Array, "Multiple elements created and is array");
		ok(spans.length == 10, "Exact amount of elements preset");
		equal(spans[0].tagName, "SPAN", "Element specified created");
		equal(spans[0].parentNode.tagName, "SECTION", "Appended!");
	});

}());
