"use strict";

(function (Notes) {
    var testScript = function (options) {
        var expect = options.expect;
        var createSortableFakeObject = options.createSortableFakeObject;
        var testSuiteBuilder = options.testSuiteBuilder;

        var testSuite = testSuiteBuilder.createTestSuite(
            "[Model.Core] SortedLinkedList");

        testSuite.setup();

        var createNode = Notes.model.core.node;
        var createSortedLinkedList = Notes.model.core.sortedLinkedList;

        testSuite.start();

        var instantiationTest = testSuite.test("Instantiation", function () {
            var sll = createSortedLinkedList({
                createNode: createNode
            });

            try {
                expect(sll).toBeDefined();
                instantiationTest.success();
            } catch (expectError) {
                instantiationTest.fail(expectError);
            }
        });

        var emptyTest = testSuite.test("New list returns empty", function () {
            var sll = createSortedLinkedList({
                createNode: createNode
            });

            try {
                expect(sll.toArray()).toBeDefined();
                expect(sll.toArray().length).toEqual(0);
                emptyTest.success();
            } catch (expectError) {
                emptyTest.fail(expectError);
            }
        });

        var insertOneTest = testSuite.test("Insert one element", function () {
            var sll = createSortedLinkedList({
                createNode: createNode
            });
            var object = createSortableFakeObject("1", 1);
            sll.insertOne(object);

            var array = sll.toArray();

            try {
                expect(array.length).toEqual(1);
                expect(array[0]).toEqual(object);
                insertOneTest.success();
            } catch (expectError) {
                insertOneTest.fail(expectError);
            }
        });

        // Test add one. toArray => ["1"]
        // Test add many consecutive...
          // from empty. "2", "3" toArray => ["1", "2", "3"]
          // from many at 2. toArray => ["1", "2", "4", "5", "3"]
          // from many at 10. toArray => ["1", "2", "4", "5", "3", "10", "11"]
        // Test remove. toArray => ["1", "3"]
        // Test update (no change). toArray => ["1", "2", "3"]
        // Test update (with change). toArray => ["1", "3", "2"]

        /*
        var deleteTest = testSuite.test("DELETE request", function () {
            requestBuilder.delete("/notes/1")
                .send(function (err, response) {
                    try {
                        expect(err).toBeNull();
                        expect(response).toBeObject();
                        deleteTest.success();
                    } catch (expectError) {
                        deleteTest.fail(expectError.stack.toString());
                    }
                });
        });
        */

        testSuite.end();

        testSuite.teardown();

        return testSuite;
    };

    Notes.test.testScripts.push(testScript);
})(Notes);
