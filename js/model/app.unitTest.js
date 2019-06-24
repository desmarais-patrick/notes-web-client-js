"use strict";

(function (Notes) {
    var appTestScript = function (options) {
        var expect = options.expect;
        var testSuiteBuilder = options.testSuiteBuilder;

        var testSuite = testSuiteBuilder.createTestSuite("[Model] App");

        testSuite.setup();

        var createChangeEvent = Notes.model.changeEvent;
        var changeEventBuilder = Notes.model.changeEventBuilder({
            createChangeEvent: createChangeEvent
        });

        var createApp = Notes.model.app;
        var createAppOptions = {
            changeEventBuilder: changeEventBuilder
        };

        var testOptions = {
            APP_STATUS_ENUM: Notes.model.app.APP_STATUS_ENUM
        };

        testSuite.start();

        var appStatusTest = testSuite.test("Lifecycle and change events", function () {
            var app = createApp(createAppOptions);
            var APP_STATUS_ENUM = testOptions.APP_STATUS_ENUM;

            // Imagine someone is waiting for app to be ready.

            var latestAppStatus = null;
            var onAppStatusChange = function (changeEvent) {
                var app = changeEvent.getSource();
                latestAppStatus = app.getStatus();
            };
            app.addChangeEventListener(onAppStatusChange);
            expect(latestAppStatus).toEqual(APP_STATUS_ENUM.UNKNOWN);

            // App started its initialization.

            app.setStatus(APP_STATUS_ENUM.INITIALIZING);
            expect(latestAppStatus).toEqual(APP_STATUS_ENUM.INITIALIZING);

            // App finishes its initialization process.

            app.setStatus(APP_STATUS_ENUM.READY);
            expect(latestAppStatus).toEqual(APP_STATUS_ENUM.READY);

            // App is working on getting or saving some content, for example.

            app.setStatus(APP_STATUS_ENUM.WORKING);
            expect(latestAppStatus).toEqual(APP_STATUS_ENUM.WORKING);

            // Another element is starting work and attempts to change app.
            latestAppStatus = null;
            app.setStatus(APP_STATUS_ENUM.WORKING);
            expect(latestAppStatus).toEqual(null);
                // We don't want to be notified if there's no change.

            // Imagine this someone is no longer interested in the change.

            app.removeChangeEventListener(onAppStatusChange);
            app.setStatus(APP_STATUS_ENUM.READY);
            expect(latestAppStatus).toEqual(null);

            appStatusTest.success();
        });

        testSuite.end();

        testSuite.teardown();

        return testSuite;
    };

    Notes.test.testScripts.push(appTestScript);
})(Notes);
