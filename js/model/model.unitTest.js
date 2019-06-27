"use strict";

(function (Notes) {
    var modelTestScript = function (options) {
        var expect = options.expect;
        var testSuiteBuilder = options.testSuiteBuilder;

        var testSuite = testSuiteBuilder.createTestSuite("[Model] Model");

        testSuite.setup();

        var createApp = Notes.model.app;
        var createEvents = Notes.model.events;

        var createModel = Notes.model.model;
        var createModelOptions = {
            createApp: createApp,
            createEvents: createEvents
        };

        var testOptions = {
            APP_STATUS_ENUM: Notes.model.app.APP_STATUS_ENUM,
            NOTE_LIST_STATUS_ENUM: Notes.model.noteList.NOTE_LIST_STATUS_ENUM
        };

        testSuite.start();

        var listenTest = testSuite.test("Listen", function () {
            var model = createModel(createModelOptions);
            var NOTE_LIST_STATUS_ENUM = testOptions.NOTE_LIST_STATUS_ENUM;

            var statusEventIterator = model.listen("change Notes.Status");
            expect(statusEventIterator.hasNext()).toEqual(false);
            var listEventIterator = model.listen("change Notes.List");
            expect(listEventIterator.hasNext()).toEqual(false);

            model.requestMoreNotes();

            expect(statusEventIterator.hasNext()).toEqual(true);
            expect(statusEventIterator.next().source.getStatus())
                .toEqual(NOTE_LIST_STATUS_ENUM.LOADING_MORE);
            expect(listEventIterator.hasNext()).toEqual(false);

            // Request completes.

            expect(statusEventIterator.hasNext()).toEqual(true);
            expect(statusEventIterator.next().source.getStatus())
                .toEqual(NOTE_LIST_STATUS_ENUM.READY);

            expect(listEventIterator.hasNext()).toEqual(true);
            expect(statusEventIterator.next().source.getList().length)
                .toEqual(3);

            expect(statusEventIterator.hasNext()).toEqual(false);
            expect(listEventIterator.hasNext()).toEqual(false);

            listenTest.success();
        });
        
        // Get note X
        var getNoteXTest = testSuite.test("Get note X", function () {
            var model = createModel(createModelOptions);

            // Imagine someone enters the app with bookmark to note X.

            var noteId = "x";
            model.getNote(noteId, function (err, note) {
                // Error is null.
                // Note is returned.
            });

            // Imagine someone returns to page with bookmark to same note X, 
            // already in cache.

            model.getNote(noteId, function (err, note) {
                // Request hasn't been called.
            });

            // Imagine someone returns to note that doesn't exist (anymore).
            var anotherNoteId = "404";
            model.getNote(anotherNoteId, function (err, note) {
                // Error is null.
                // Note is null.
            });

            // Imagine someone is offline and network is not accessible for note Y.
            var yetAnotherNoteId = "y";
            model.getNote(yetAnotherNoteId, function (err, note) {
                // Error is not null.
                // Error is about offline, note can't be accessed.
                // Note is null.
            });

            getNoteXTest.success();
        });

        // Get note X (404)
        // Create note with text
        // Create note with text (offline)
        // Update note X with newText
        // Delete note X

        testSuite.end();

        testSuite.teardown();

        return testSuite;
    };

    Notes.test.testScripts.push(modelTestScript);
})(Notes);
