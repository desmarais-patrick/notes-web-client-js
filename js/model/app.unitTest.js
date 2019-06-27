"use strict";

(function (Notes) {
    var appTestScript = function (options) {
        var expect = options.expect;
        var testSuiteBuilder = options.testSuiteBuilder;

        var testSuite = testSuiteBuilder.createTestSuite("[Model] App");

        testSuite.setup();

        var createEvents = Notes.model.events;
        var events = createEvents();

        var createApp = Notes.model.app;
        var createAppOptions = {
            events: events
        };

        var testOptions = {
            APP_STATUS_ENUM: Notes.model.app.APP_STATUS_ENUM
        };

        testSuite.start();

        var appStatusTest = testSuite.test("Lifecycle and change events", function () {
            var app = createApp(createAppOptions);
            var APP_STATUS_ENUM = testOptions.APP_STATUS_ENUM;
            var eventIterator = events.listen("change App.Status");

            expect(app.getStatus()).toEqual(APP_STATUS_ENUM.UNKNOWN);

            // App starts its initialization.
            expect(eventIterator.get()).toBeNull();
            expect(eventIterator.hasNext()).toEqual(false);
            app.setStatus(APP_STATUS_ENUM.INITIALIZING);

            expect(app.getStatus()).toEqual(APP_STATUS_ENUM.INITIALIZING);
            expect(eventIterator.hasNext()).toEqual(true);
            expect(eventIterator.next()).toNotBeNull();
            expect(eventIterator.get().options.source.getStatus())
                .toEqual(APP_STATUS_ENUM.INITIALIZING);

            // App is ready.
            app.setStatus(APP_STATUS_ENUM.READY);

            // App is working on a request.
            app.setStatus(APP_STATUS_ENUM.WORKING);

            // App is ready.
            app.setStatus(APP_STATUS_ENUM.READY);

            // Events can be replayed.
            expect(eventIterator.hasNext()).toEqual(true);
            expect(eventIterator.next().options.source.getStatus())
                .toEqual(APP_STATUS_ENUM.READY);
            expect(eventIterator.next().options.source.getStatus())
                .toEqual(APP_STATUS_ENUM.WORKING);
            expect(eventIterator.next().options.source.getStatus())
                .toEqual(APP_STATUS_ENUM.READY);
            expect(eventIterator.hasNext()).toEqual(false);

            appStatusTest.success();
        });

        testSuite.end();

        testSuite.teardown();

        return testSuite;
    };

    Notes.test.testScripts.push(appTestScript);
})(Notes);
