"use strict";

(function (Notes) {
    var synchronizeListTestScript = function (options) {
        var expect = options.expect;
        var testSuiteBuilder = options.testSuiteBuilder;

        var testSuite = testSuiteBuilder.createTestSuite("[Utilities] SynchronizedList");

        testSuite.setup();

        var orderedSet = Notes.utilities.orderedSet;
        var UPDATE_TYPES = Notes.utilities.orderedSet.UPDATE_TYPES;

        var createMutators = function (records) {
            records.created = [];
            records.deleted = [];

            return {
                create: function (id) {
                    var object = {
                        id: id
                    };
                    records.created.push(object);
                    return object;
                },
                delete: function (id, object) {
                    records.deleted.push({
                        id: id,
                        object: object
                    });
                }
            };
        };

        testSuite.start();

        var emptyTest = testSuite.test("Empty", function () {
            var list = orderedSet();
            var records = {};
            var mutators = createMutators(records);
    
            var updateInfo = list.update([], mutators);

            expect(list.getIds().length).toEqual(0);
            expect(list.getObjects().length).toEqual(0);

            expect(records.created.length).toEqual(0);
            expect(records.deleted.length).toEqual(0);

            expect(updateInfo.type).toEqual(UPDATE_TYPES.NO_UPDATE);

            emptyTest.success();
        });

        var firstAddTest = testSuite.test("Empty to one", function () {
            var list = orderedSet();
            var records = {};
            var mutators = createMutators(records);

            var updateInfo = list.update(["anId"], mutators);

            expect(list.getIds().length).toEqual(1);
            expect(list.getIds()[0]).toEqual("anId");
            expect(list.getObjects().length).toEqual(1);
            expect(list.getObjects()[0].id).toEqual("anId");

            expect(records.created.length).toEqual(1);
            expect(records.created[0].id).toEqual("anId");
            expect(records.deleted.length).toEqual(0);

            expect(updateInfo.type).toEqual(UPDATE_TYPES.SINGLE_ADD);
    
            firstAddTest.success();
        });

        var manyAddTest = testSuite.test("Empty to many", function () {
            var list = orderedSet();
            var records = {};
            var mutators = createMutators(records);

            var updateInfo = list.update(
                ["anId", "anotherId", "yetAnotherId"], mutators);

            expect(list.getIds().length).toEqual(3);
            expect(list.getIds()[0]).toEqual("anId");
            expect(list.getIds()[1]).toEqual("anotherId");
            expect(list.getIds()[2]).toEqual("yetAnotherId");
            expect(list.getObjects().length).toEqual(3);

            expect(records.created.length).toEqual(3);
            expect(records.created[0].id).toEqual("anId");
            expect(records.deleted.length).toEqual(0);

            expect(updateInfo.type).toEqual(UPDATE_TYPES.MANY_UPDATES);
    
            manyAddTest.success();
        });

        var removeFirstTest = testSuite.test("Remove first", function () {
            var list = orderedSet();
            
            // Add three initially.
            var records = {};
            var mutators = createMutators(records);
            list.update(["anId", "anotherId", "yetAnotherId"], mutators);

            // Remove first.
            records = {};
            mutators = createMutators(records);
            var updateInfo = list.update(["anotherId", "yetAnotherId"], mutators);

            expect(list.getIds().length).toEqual(2);
            expect(list.getIds()[0]).toEqual("anotherId");
            expect(list.getIds()[1]).toEqual("yetAnotherId");
            expect(list.getObjects().length).toEqual(2);

            expect(records.created.length).toEqual(0);
            expect(records.deleted.length).toEqual(1);
            expect(records.deleted[0].id).toEqual("anId");

            expect(updateInfo.type).toEqual(UPDATE_TYPES.SINGLE_DELETE);

            removeFirstTest.success();
        });

        var removeMiddleTest = testSuite.test("Remove middle", function () {
            var list = orderedSet();
            
            // Add three initially.
            var records = {};
            var mutators = createMutators(records);
            list.update(["anId", "anotherId", "yetAnotherId"], mutators);

            // Remove middle.
            records = {};
            mutators = createMutators(records);
            var updateInfo = list.update(["anId", "yetAnotherId"], mutators);

            expect(list.getIds().length).toEqual(2);
            expect(list.getIds()[0]).toEqual("anId");
            expect(list.getIds()[1]).toEqual("yetAnotherId");
            expect(list.getObjects().length).toEqual(2);

            expect(records.created.length).toEqual(0);
            expect(records.deleted.length).toEqual(1);
            expect(records.deleted[0].id).toEqual("anotherId");

            expect(updateInfo.type).toEqual(UPDATE_TYPES.SINGLE_DELETE);

            removeMiddleTest.success();
        });

        var manyChangesTest = testSuite.test("Many changes", function () {
            var list = orderedSet();
            
            // Add three initially.
            var records = {};
            var mutators = createMutators(records);
            list.update(["anId", "anotherId", "yetAnotherId"], mutators);

            // Remove and add and keep.
            records = {};
            mutators = createMutators(records);
            var updateInfo = list.update(
                ["aNewId", "anId", "yetAnotherId"], mutators);

            expect(list.getIds().length).toEqual(3);
            expect(list.getIds()[0]).toEqual("aNewId");
            expect(list.getIds()[1]).toEqual("anId");
            expect(list.getIds()[2]).toEqual("yetAnotherId");
            expect(list.getObjects().length).toEqual(3);

            expect(records.created.length).toEqual(1);
            expect(records.deleted.length).toEqual(1);

            expect(updateInfo.type).toEqual(UPDATE_TYPES.MANY_UPDATES);

            manyChangesTest.success();
        });

        testSuite.end();

        testSuite.teardown();

        return testSuite;
    };

    Notes.test.testScripts.push(synchronizeListTestScript);
})(Notes);
