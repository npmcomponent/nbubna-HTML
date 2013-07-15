(function(HTML) {
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

	test("basic", function() {
		ok(!HTML.body.a, "no A to begin with");
		equal(HTML.body.add('a').tagName, "A", "Tag created.");
		ok(HTML.body.a, 'Tag found.');
		HTML.body.a.remove();
	});

	test("add node", function() {
		var node = document.createElement('article');
		equal(HTML.body.add(node), node, "added node and got it back");
		ok(HTML.body.article && 'isNode' in node, 'added node has been assimilated');
		node.remove();
	});

	test("add list", function() {
		var list = ['nav', document.createElement('nav'), ['nav']];
		equal(HTML.body.add(list).length, 3, 'added three nav elements');
		HTML.find('nav').remove();
	});

  module("HTML element removal");

  test("single", 4, function() {
    var el = HTML.body.add('doomed');
    ok(el, 'have element');
    equal(el.remove(), HTML.body, 'remove returns parent');
    ok(!el.parentNode, 'no parent after removal');
    ok(!('doomed' in HTML.body), 'child property was deleted');
  });

  test("list", 8, function() {
    var list = HTML.body.add('doa*5');
    ok(list && list.isNodeList, 'have list');
    equal(list.remove(), HTML.body, 'remove returns parent');
    list.each(function(doa) {
      ok(!doa.parentNode, 'no parents after removal');
    });
    ok(!('doa' in HTML.body), 'list property was deleted');
  });

}(HTML));
