"use strict";

(function (Notes) {
    // Setup.
    var chosenConfiguration = Notes.config.configurations["Test"];

    // Instantiate classes.
    var expect = Notes.test.expect;

    var testHtmlLogger = Notes.test.htmlLogger({
        document: window.document,
        rootNodeId: "testResults"
    });
    var setTimeout = window.setTimeout;
    var clearTimeout = window.clearTimeout;

    var testSuiteBuilder = Notes.test.testSuiteBuilder({
        test: Notes.test.test,
        testSuite: Notes.test.testSuite,

        logger: testHtmlLogger,

        setTimeout: setTimeout,
        timeoutInMillis: 2000,
        clearTimeout: clearTimeout,

        configuration: chosenConfiguration
    });

    // Run 
    console.log("Hello from Notes app!");
    console.log("Mode:", chosenConfiguration.name);

    console.log("===============================");
    console.log(" TEST START");
    console.log("===============================");

    var testScriptOptions = {
        expect: expect,
        testSuiteBuilder: testSuiteBuilder
    };
    var testSuites = [];
    Notes.test.testScripts.forEach(function (testScript) {
        var testSuite = testScript(testScriptOptions);
        testSuites.push(testSuite);
    });

    var anyPendingTests = function () {
        return testSuites.find(function (testSuite) {
            return testSuite.isPending();
        });
    };
    var printEnd = function () {
        console.log("===============================");
        console.log(" TEST END");
        console.log("===============================");
    };

    if (anyPendingTests()) {
        // Final timeout.
        setTimeout(function () {
            testSuites.forEach(function (testSuite) {
                if (testSuite.isPending()) {
                    console.log("Test", testSuite.name, "takes too long to complete.");
                }
            });
            printEnd();
        }, 2000);
    } else {
        printEnd();
    }
})(Notes);
