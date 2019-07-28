"use strict";

(function (Notes) {
    var listUtilitiesTestScript = function (options) {
        var expect = options.expect;
        var testSuiteBuilder = options.testSuiteBuilder;

        var testSuite = testSuiteBuilder.createTestSuite("[Utilities] ListUtilities");

        testSuite.setup();

        var listUtilities = Notes.utilities.listUtilities();

        testSuite.start();

        var differenceTest1 = testSuite.test("difference([], []) --> [], []", function () {
            var empty = listUtilities.difference([], []);
            expect(empty.result.length).toEqual(0);
            expect(empty.rest.length).toEqual(0);

            differenceTest1.success();
        });

        var differenceTest2 = testSuite.test('difference(["a", "b", "c"], ["b", "d"]) --> ["a", "c"], ["b"]', function () {
            var many = listUtilities.difference(["a", "b", "c"], ["b", "d"]);
            expect(many.result.length).toEqual(2);
            expect(many.result[0]).toEqual("a");
            expect(many.result[1]).toEqual("c");
            expect(many.rest.length).toEqual(1);
            expect(many.rest[0]).toEqual("b");

            differenceTest2.success();
        });

        var equalTest1 = testSuite.test("isEqual([], []) --> TRUE", function () {
            var result = listUtilities.isEqual([], []);
            expect(result).toEqual(true);

            equalTest1.success();
        });

        var equalTest2 = testSuite.test('isEqual(["b"], ["b", "d"]) --> FALSE', function () {
            var result = listUtilities.isEqual(["b"], ["b", "d"]);
            expect(result).toEqual(false);

            equalTest2.success();
        });

        var emptyTest = testSuite.test("Changes on empty [] -> []", function () {
            var changes = listUtilities.computeChanges([], []);

            expect(changes.length).toEqual(0);

            emptyTest.success();
        });

        var firstAddTest = testSuite.test("Changes on empty to one [] -> [a]", function () {
            var changes = listUtilities.computeChanges([], ["a"]);

            expect(changes.length).toEqual(1);
            expect(changes[0].getValue()).toEqual("a");
            expect(changes[0].isAdded()).toEqual(true);
            expect(changes[0].getToIndex()).toEqual(0);

            firstAddTest.success();
        });

        var manyAddTest = testSuite.test("Changes on empty to many [] -> [a, b, c]", function () {
            var changes = listUtilities.computeChanges([], ["a", "b", "c"]);

            expect(changes.length).toEqual(3);
            expect(changes[0].getValue()).toEqual("a");
            expect(changes[0].isAdded()).toEqual(true);
            expect(changes[0].getToIndex()).toEqual(0);
            expect(changes[1].getValue()).toEqual("b");
            expect(changes[1].isAdded()).toEqual(true);
            expect(changes[1].getToIndex()).toEqual(1);
            expect(changes[2].getValue()).toEqual("c");
            expect(changes[2].isAdded()).toEqual(true);
            expect(changes[2].getToIndex()).toEqual(2);

            manyAddTest.success();
        });

        var removeOneTest = testSuite.test("Changes on many minus one [a, b, c] -> [a, c]", function () {
            var changes = listUtilities.computeChanges(["a", "b", "c"], ["a", "c"]);

            expect(changes.length).toEqual(1);
            expect(changes[0].getValue()).toEqual("b");
            expect(changes[0].isRemoved()).toEqual(true);
            expect(changes[0].getFromIndex()).toEqual(1);

            removeOneTest.success();
        });

        var differentListTest = testSuite.test("Changes on [a, b] -> [d, e]", function () {
            var changes = listUtilities.computeChanges(["a", "b"], ["d", "e"]);

            expect(changes.length).toEqual(4);
            expect(changes[0].getValue()).toEqual("a");
            expect(changes[0].isRemoved()).toEqual(true);
            expect(changes[0].getFromIndex()).toEqual(0);
            expect(changes[2].getValue()).toEqual("d");
            expect(changes[2].isAdded()).toEqual(true);
            expect(changes[2].getToIndex()).toEqual(0);

            differentListTest.success();
        });

        var swapTest = testSuite.test("Changes on [a, b] -> [d, b]", function () {
            var changes = listUtilities.computeChanges(["a", "b"], ["d", "b"]);

            expect(changes.length).toEqual(2);
            expect(changes[0].getValue()).toEqual("a");
            expect(changes[0].isRemoved()).toEqual(true);
            expect(changes[0].getFromIndex()).toEqual(0);
            expect(changes[1].getValue()).toEqual("d");
            expect(changes[1].isAdded()).toEqual(true);
            expect(changes[1].getToIndex()).toEqual(0);

            swapTest.success();
        });

        var differentListTest2 = testSuite.test("Changes on [a, b, c, d] -> [e, a, c, d]", function () {
            var changes = listUtilities.computeChanges(["a", "b", "c", "d"], ["e", "a", "c", "d"]);

            expect(changes.length).toEqual(3);

            expect(changes[0].getValue()).toEqual("a");
            expect(changes[0].isAdded()).toEqual(false);
            expect(changes[0].getToIndex()).toEqual(1);

            expect(changes[1].getValue()).toEqual("b");
            expect(changes[1].isRemoved()).toEqual(true);
            expect(changes[1].getFromIndex()).toEqual(1);

            expect(changes[2].getValue()).toEqual("e");
            expect(changes[2].isAdded()).toEqual(true);
            expect(changes[2].getToIndex()).toEqual(0);

            differentListTest2.success();
        });

        testSuite.end();

        testSuite.teardown();

        return testSuite;
    };

    Notes.test.testScripts.push(listUtilitiesTestScript);
})(Notes);
