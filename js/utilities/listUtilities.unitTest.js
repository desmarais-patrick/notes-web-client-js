"use strict";

(function (Notes) {
    var listUtilitiesTestScript = function (options) {
        var expect = options.expect;
        var testSuiteBuilder = options.testSuiteBuilder;

        var testSuite = testSuiteBuilder.createTestSuite("[Utilities] ListUtilities");

        testSuite.setup();

        var listUtilities = Notes.utilities.listUtilities();

        testSuite.start();

        var emptyTest = testSuite.test("Empty [] -> []", function () {
            var changes = listUtilities.computeChanges([], []);

            expect(changes.length).toEqual(0);

            emptyTest.success();
        });

        var firstAddTest = testSuite.test("Empty to one [] -> [a]", function () {
            var changes = listUtilities.computeChanges([], ["a"]);

            expect(changes.length).toEqual(1);
            expect(changes[0].getValue()).toEqual("a");
            expect(changes[0].isAdded()).toEqual(true);
            expect(changes[0].getToIndex()).toEqual(0);

            firstAddTest.success();
        });

        var manyAddTest = testSuite.test("Empty to many [] -> [a, b, c]", function () {
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

        var removeOneTest = testSuite.test("Many minus one [a, b, c] -> [a, c]", function () {
            var changes = listUtilities.computeChanges(["a", "b", "c"], ["a", "c"]);

            expect(changes.length).toEqual(1);
            expect(changes[0].getValue()).toEqual("b");
            expect(changes[0].isRemoved()).toEqual(true);
            expect(changes[0].getFromIndex()).toEqual(1);

            removeOneTest.success();
        });

        var differentListTest = testSuite.test("[a, b] -> [d, e]", function () {
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

        var swapTest = testSuite.test("[a, b] -> [d, b]", function () {
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

        var differentListTest2 = testSuite.test("[a, b, c, d] -> [e, a, c, d]", function () {
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
