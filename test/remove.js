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

