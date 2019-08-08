"use strict";

(function (Notes) {
    var userUtilitiesTestScript = function (options) {
        var expect = options.expect;
        var testSuiteBuilder = options.testSuiteBuilder;

        var testSuite = testSuiteBuilder.createTestSuite(
            "[Utilities] UserUtilities");

        testSuite.setup();

        var dateUtilities = Notes.utilities.dateUtilities();
        var userUtilities = Notes.utilities.userUtilities({
            dateUtilities: dateUtilities,
            Date: Date,
            Math: Math
        });

        testSuite.start();

        var generateUserTest = testSuite.test("Generate user", function () {
            var user1 = userUtilities.generateUser();
            expect(typeof user1).toEqual("string");
            expect(user1.length).toBeGreaterThan(0);
            expect(user1.length).toBeSmallerThan(100);

            var user2 = userUtilities.generateUser();
            expect(user1).toNotEqual(user2);

            generateUserTest.success();
        });

        testSuite.end();

        testSuite.teardown();

        return testSuite;
    };

    Notes.test.testScripts.push(userUtilitiesTestScript);
})(Notes);
