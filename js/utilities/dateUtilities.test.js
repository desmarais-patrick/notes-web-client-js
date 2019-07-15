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
            var date1 = new Date("2019-07-15T11:15:00.000Z");
            expect(dateUtilities.format(date1)).toEqual("2019-07-15 11:15 AM");
            
            var date2 = new Date("2019-12-01T01:01:00.000Z");
            expect(dateUtilities.format(date2)).toEqual("2019-12-01 1:01 AM");
            
            var date3 = new Date("2019-01-01T00:00:00.000Z");
            expect(dateUtilities.format(date3)).toEqual("2019-01-01 0:00 AM");
            
            var date4 = new Date("2019-12-31T23:59:59.000Z");
            expect(dateUtilities.format(date4)).toEqual("2019-12-31 11:59 PM");

            formatTest.success();
        });

        testSuite.end();

        testSuite.teardown();

        return testSuite;
    };

    Notes.test.testScripts.push(dateUtilitiesTestScript);
})(Notes);
