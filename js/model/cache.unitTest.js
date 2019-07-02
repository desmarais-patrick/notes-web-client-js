"use strict";

(function (Notes) {
    var cacheTestScript = function (options) {
        var expect = options.expect;
        var testSuiteBuilder = options.testSuiteBuilder;

        var testSuite = testSuiteBuilder.createTestSuite("[Model] Cache");

        testSuite.setup();

        var createCache = Notes.model.cache;
        var createEvents = Notes.model.events;
        var createNote = Notes.model.note;

        testSuite.start();
        
        var storeNoteTest = testSuite.test("Store notes", function () {
            var cache = createCache();

            var note = createNote({
                events: createEvents(),
                id: "some id"
            });
            cache.save(note);

            var cachedNote = cache.get("some id");
            expect(cachedNote).toEqual(note);

            storeNoteTest.success();
        });

        var cacheMissTest = testSuite.test("Cache miss", function () {
            var cache = createCache();

            var cachedNote = cache.get("some unknown id");
            expect(cachedNote).toBeNull();

            cacheMissTest.success();
        });

        testSuite.end();

        testSuite.teardown();

        return testSuite;
    };

    Notes.test.testScripts.push(cacheTestScript);
})(Notes);
