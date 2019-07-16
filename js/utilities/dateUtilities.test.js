"use strict";

(function (Notes) {
    var dateUtilitiesTestScript = function (options) {
        var expect = options.expect;
        var testSuiteBuilder = options.testSuiteBuilder;

        var testSuite = testSuiteBuilder.createTestSuite("[Utilities] DateUtilities");

        testSuite.setup();

        var dateUtilities = Notes.utilities.dateUtilities();

        testSuite.start();

        var formatTest = testSuite.test("Format", function () {
            var date = new Date();
            date.setFullYear(2019);
            date.setMonth(11);
            date.setDate(15);
            date.setHours(11);
            date.setMinutes(15);
            expect(dateUtilities.format(date)).toEqual("2019-12-15 11:15 AM");
            
            // Single digits.
            date.setMonth(6);
            date.setDate(1);
            date.setHours(1);
            date.setMinutes(1);
            expect(dateUtilities.format(date)).toEqual("2019-07-01 1:01 AM");

            formatTest.success();
        });

        testSuite.end();

        testSuite.teardown();

        return testSuite;
    };

    Notes.test.testScripts.push(dateUtilitiesTestScript);
})(Notes);
