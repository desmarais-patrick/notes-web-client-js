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
            STATUS_ENUM: Notes.model.app.STATUS_ENUM
        };

        testSuite.start();

        var appStatusTest = testSuite.test("Lifecycle and change events", function () {
            var app = createApp(createAppOptions);
            var STATUS_ENUM = testOptions.STATUS_ENUM;
            var eventIterator = events.listen("change App.Status");

            expect(app.getStatus()).toEqual(STATUS_ENUM.UNKNOWN);

            // App starts its initialization.
            expect(eventIterator.get()).toBeNull();
            expect(eventIterator.hasNext()).toEqual(false);
            app.setStatus(STATUS_ENUM.INITIALIZING);

            expect(app.getStatus()).toEqual(STATUS_ENUM.INITIALIZING);
            expect(eventIterator.hasNext()).toEqual(true);
            expect(eventIterator.next()).toNotBeNull();
            expect(eventIterator.get().options.newStatus)
                .toEqual(STATUS_ENUM.INITIALIZING);
            expect(eventIterator.hasNext()).toEqual(false);

            // App is ready.
            app.setStatus(STATUS_ENUM.READY);

            // App is working on a request.
            app.setStatus(STATUS_ENUM.WORKING);

            // App is ready.
            app.setStatus(STATUS_ENUM.READY);

            // Events can be replayed.
            expect(eventIterator.hasNext()).toEqual(true);
            expect(eventIterator.next().options.newStatus)
                .toEqual(STATUS_ENUM.READY);
            expect(eventIterator.next().options.newStatus)
                .toEqual(STATUS_ENUM.WORKING);
            expect(eventIterator.next().options.newStatus)
                .toEqual(STATUS_ENUM.READY);
            expect(eventIterator.hasNext()).toEqual(false);

            appStatusTest.success();
        });

        testSuite.end();

        testSuite.teardown();

        return testSuite;
    };

    Notes.test.testScripts.push(appTestScript);
})(Notes);
