"use strict";

(function (Notes) {
    var noteTestScript = function (options) {
        var expect = options.expect;
        var testSuiteBuilder = options.testSuiteBuilder;

        var testSuite = testSuiteBuilder.createTestSuite("[Model] Note");

        testSuite.setup();

        var createEvents = Notes.model.events;
        var createNote = Notes.model.note;
        var STATUS_ENUM = Notes.model.note.STATUS_ENUM;

        testSuite.start();

        var dateTest = testSuite.test("Date", function () {
            var events = createEvents();
            var note = createNote({
                events: events,
                id: "some id",
                text: "some text",
                date: new Date("2019-01-01"),
                status: STATUS_ENUM.READY
            });
            var clientId = note.getClientId();

            expect(note.getDate().toISOString())
                .toEqual("2019-01-01T00:00:00.000Z");
            
            var newDate = new Date(0);
            note.setDate(newDate);

            var topic = "change Notes[" + clientId + "].Date";
            var eventIterator = events.listen(topic);
            expect(eventIterator.next().options.newDate.toISOString())
                .toEqual("1970-01-01T00:00:00.000Z");

            dateTest.success();
        });

        var eventsTest = testSuite.test("Events", function () {
            var events = createEvents();
            var note = createNote({
                events: events,
                id: null,
                text: null,
                date: null,
                status: null
            });

            var clientId = note.getClientId();
            var topic = "change Notes[" + clientId + "].Text";
            var eventIterator = events.listen(topic);

            note.setText("some new text");
            expect(eventIterator.next().options.newText)
                .toEqual("some new text");

            eventsTest.success();
        });

        var statusTest = testSuite.test("Status", function () {
            var events = createEvents();
            var note = createNote({
                events: events,
                id: "some id",
                text: null,
                date: null,
                status: STATUS_ENUM.LOADING
            });
            expect(note.getStatus()).toEqual(STATUS_ENUM.LOADING);

            // Error requesting the additional information for note.
            note.setStatus(STATUS_ENUM.FAILED_TO_LOAD);
            expect(note.getStatus()).toEqual(STATUS_ENUM.FAILED_TO_LOAD);

            // Success in recovering info for note.
            note.setText("new text");
            note.setDate(new Date("2019-01-01"));
            note.setStatus(STATUS_ENUM.READY);

            statusTest.success();
        });

        testSuite.end();

        testSuite.teardown();

        return testSuite;
    };

    Notes.test.testScripts.push(noteTestScript);
})(Notes);