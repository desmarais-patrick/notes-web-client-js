"use strict";

(function (Notes) {
    var noteTestScript = function (options) {
        var expect = options.expect;
        var testSuiteBuilder = options.testSuiteBuilder;

        var testSuite = testSuiteBuilder.createTestSuite("[Model] Note");

        testSuite.setup();

        var createEvents = Notes.model.events;
        var createNote = Notes.model.note;

        testSuite.start();

        var eventsTest = testSuite.test("Events", function () {
            var events = createEvents();
            var note = createNote({
                events: events
            });

            var clientId = note.getClientId();
            var topic = "change Notes[" + clientId + "].Text";
            var eventIterator = events.listen(topic);

            note.setText("some new text");
            expect(eventIterator.next().options.newText)
                .toEqual("some new text");

            eventsTest.success();
        });

        testSuite.end();

        testSuite.teardown();

        return testSuite;
    };

    Notes.test.testScripts.push(noteTestScript);
})(Notes);