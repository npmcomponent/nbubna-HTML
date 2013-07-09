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

  module("HTML");

  test('presence', function() {
    ok(typeof HTML !== "undefined", 'HTML should be present');
  });

  test('external', 2, function() {
    ok(typeof HTML.external !== "undefined", "HTML should be present");
    var expected = 'HTML v'+HTML._.version;
    strictEqual(HTML.external(), expected);
  });

	module("HTML element selection");

	test("HTML -- HTML is the document body", function() {
		equal(HTML.tagName, "BODY", "HTML is the body");
	})

	test("HTML.find(<selector>) -- Returns array not nodelist", function() {
		ok(HTML.find("div") instanceof Array, "Is array!");
	});

	test("HTML.find(<id>) -- Returns single element", function() {
		ok(HTML.find("#identity") instanceof HTMLElement, "Is an element");
	});

	test("HTML.find(<selector>) -- Returns undefined if not elements found", function() {
		equal(HTML.find("#idontexist"), undefined, "Undefined!");
	});

	test("HTML.<tag>.find(<selector>) -- Scoped find selection", function() {
		ok(HTML.section.find("div"), "Selection!");
	});

	test("HTML.find(<selector>).<tag> -- DOM transversal after selector", function() {
		ok(HTML.find("section").div, "Exists!");
	});

	test("HTML.<tag> -- Getter selection and HTMLElement", 2, function() {
		ok(HTML.section, "Exists!");
		ok(HTML.section instanceof HTMLElement, "Is a HTML element!");
	});

	test("HTML.<tag>.<tag> -- Getter DOM transversal and returns array", 2, function() {
		ok(HTML.section.div, "Exists!");
		ok(HTML.section.div instanceof Array, "Is an array!")
	});

	asyncTest("HTML.<tag>.use() -- Sends node as parameter", 2, function() {
		HTML.section.use(function(section) {
			ok(section instanceof HTMLElement, "Is an element!");
			equal(section.tagName, "SECTION", "Is the node");
			start();
		});
	});

	test("HTML.<tag>.eq(<int>) -- Specific node select in list", function() {
		ok(HTML.section.div.eq(1) instanceof HTMLElement, "Node selected!");
	});

	test("HTML.<tag>.eq(<int>, <int>) -- Range selection in list", function() {
		ok(HTML.section.div.eq(0, 3).length > 2, "Nodes selected!")
	});

	test("HTML.<tag> -- Returns nodes in descending order", function() {
		var div = HTML.section.div;
		ok(div[0].id == "first" && div[div.length - 1].id == "last", "Order is descending");
	})

}());

