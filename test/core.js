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

  module("HTML");

  test('HTML', function() {
    ok(HTML, 'HTML should be present');
  });

  test('_', function() {
    ok(HTML._, "HTML._ should be present");
  });

	test("HTML is the root", function() {
		strictEqual(HTML, document.documentElement, "HTML is the root document element");
	});

	module("traversal");

	test("children", 2, function() {
		ok(HTML.body, "body");
		ok(HTML.head, "head");
	});

	test("single grandkid is HTMLElement", 2, function() {
		ok(HTML.body.section, "got to grandkid");
		ok(HTML.body.section instanceof HTMLElement, "it's an element");
	});

	test("multiple grandkids gets an array", 2, function() {
		ok(HTML.body.section.div, "got multiple");
		ok(HTML.body.section.div instanceof Array, "as an array");
	});

	test("grandkids come descending order", function() {
		var div = HTML.body.section.div;
		ok(div[0].id === "first" && div[div.length - 1].id === "last", "Order is descending");
	});

	module("each()");

	test("each for single grandkid", 3, function() {
		var self = HTML.body.section,
		ret = self.each(function(section) {
			ok(section instanceof HTMLElement, "still an element");
			strictEqual(section, self, "is the one we called each() on");
		});
		ok(ret === self, 'returned this');
	});

	test("each for multiple grandkids", function() {
		var pdiv, pi = -1,
			self = HTML.body.section.div,
		ret = self.each(function(div, i, arr) {
			notEqual(pdiv, div, 'should have new div');
			strictEqual(i, pi+1, 'index one less');
			ok(arr, 'array as third arg');
			ok(div instanceof HTMLElement, 'have an element');
			pi = i;
			pdiv = div;
		});
		ok(ret === self, 'returned this');
	});


	module("only()");

	test("by slice, on one", function() {
		var section = HTML.body.section;
		strictEqual(section.only(0), section, "self for 0");
		ok(!section.only(1).length, 'empty array for bad index');
	});

	test("by selector, on one", function() {
		var section = HTML.body.section;
		strictEqual(section.only('.foo'), section, "self for .foo");
		ok(!section.only('#first').length, 'empty array for non-matching selector');
	});

	test("by function, on one", function() {
		var section = HTML.body.section;
		strictEqual(section.only(function(el) {
			return el.tagName === 'SECTION';
		}), section, "self when tagName is SECTION");
	});

	test("by slice, on multiple", function() {
		var divs = HTML.body.section.div;
		strictEqual(divs.only(-1), divs[divs.length-1], 'get last one');
		strictEqual(divs.only(1,4).length, 3, "got sublist of proper length");
	});

	test("by selector, on multiple", function() {
		var divs = HTML.body.section.div;
		strictEqual(divs.only('#first'), HTML.find('#first'), 'got #first');
	});

	test("by function, on multiple", function() {
		var odds = function(n,i){ return i%2; };
		strictEqual(HTML.body.section.div.only(odds).length, 2, "got two odd divs");
	});


	module("search");

	test("find multiple, get array", function() {
		ok(HTML.find("div") instanceof Array, "should be an array");
	});

	test("find one, get HTMLElement", function() {
		ok(HTML.find("#identity") instanceof HTMLElement, "should be an element");
	});

	test("find nonexistent, get empty array", function() {
		ok(!HTML.find("#idontexist").length, "empty array");
	});

	test("contextual search", function() {
		strictEqual(HTML.body.section.find("div").length, 5, "should be five divs, not seven");
	});

	test("traverse on result", function() {
		ok(HTML);
		ok(HTML.find('section'));
		ok(HTML.find("section").div, "should be present");
	});

}(HTML));

