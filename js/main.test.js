"use strict";

(function (Notes) {
    // Setup.
    var chosenConfiguration = Notes.main.testConfiguration;

    var expect = Notes.test.expect;
    var createSortableFakeObject = Notes.test.mocks.sortableFakeObject;
    var xmlHttpRequestMock = Notes.test.mocks.xmlHttpRequestMock;
    var xmlHttpRequestMock2 = Notes.test.mocks.xmlHttpRequestMock2;

    var testHtmlLogger = Notes.test.htmlLogger({
        document: window.document,
        rootNodeId: "testResults"
    });
    var setTimeout = window.setTimeout;
    var clearTimeout = window.clearTimeout;

    var testTimeoutInMillis = Notes.main.testTimeoutInMillis;
    var testSuiteBuilder = Notes.test.testSuiteBuilder({
        test: Notes.test.test,
        testSuite: Notes.test.testSuite,

        logger: testHtmlLogger,

        setTimeout: setTimeout,
        timeoutInMillis: testTimeoutInMillis,
        clearTimeout: clearTimeout,

        configuration: chosenConfiguration
    });

    // Start 
    console.log("Hello from Notes app!");
    console.log("Mode:", chosenConfiguration.name);

    var startTime = new Date();
    testHtmlLogger.log(Notes.main.testType + " tests have started");
    testHtmlLogger.log("---");

    // Run each test
    var testScriptOptions = {
        expect: expect,
        testSuiteBuilder: testSuiteBuilder,

        // Test helpers.
        createSortableFakeObject: createSortableFakeObject,
        xmlHttpRequestMock: xmlHttpRequestMock,
        xmlHttpRequestMock2: xmlHttpRequestMock2
    };
    var testSuites = [];
    Notes.test.testScripts.forEach(function (testScript) {
        var testSuite = testScript(testScriptOptions);
        testSuites.push(testSuite);
    });

    // Wait to finish
    setTimeout(function () {
        var stopTime = new Date();
        var duration = stopTime.getTime() - startTime.getTime();
        var formattedDuration = duration > 1000 ?
            (duration / 1000) + "s" : 
            duration + "ms";
        testHtmlLogger.log("---");
        testHtmlLogger.log("Tests completed in " + formattedDuration);
    }, testTimeoutInMillis);
})(Notes);
