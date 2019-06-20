"use strict";

(function (Notes) {
    var cacheTestScript = function (options) {
        var expect = options.expect;
        var testSuiteBuilder = options.testSuiteBuilder;

        var testSuite = testSuiteBuilder.createTestSuite("[Model] Cache");

        testSuite.setup();

        var createCache = Notes.model.cache;

        testSuite.start();
        
        // Get app
        // Get noteList
        // Get note X

        testSuite.end();

        testSuite.teardown();

        return testSuite;
    };

    Notes.test.testScripts.push(cacheTestScript);
})(Notes);
