"use strict";

(function (Notes) {
    var modelTestScript = function (options) {
        var expect = options.expect;
        var testSuiteBuilder = options.testSuiteBuilder;

        var testSuite = testSuiteBuilder.createTestSuite("[Model] Model");

        testSuite.setup();

        var createModel = Notes.model.model;
        var createModelOptions = {

        };

        var testOptions = {
            APP_STATUS_ENUM: Notes.model.app.APP_STATUS_ENUM,
            NOTE_LIST_STATUS_ENUM: Notes.model.noteList.NOTE_LIST_STATUS_ENUM
        };

        testSuite.start();

        var appStatusTest = testSuite.test("App.Status model", function () {
            var model = createModel(createModelOptions);
            var APP_STATUS_ENUM = testOptions.APP_STATUS_ENUM;

            // Imagine someone is waiting for app to be ready.

            var latestAppStatus = null;
            var onAppStatusChange = function (changeEvent) {
                var app = changeEvent.getSource();
                latestAppStatus = app.getStatus();
            };
            model.addEventListener("App.Status", onAppStatusChange);
            expect(latestAppStatus).toEqual(APP_STATUS_ENUM.UNKNOWN);

            // App started its initialization.

            model.setAppStatus(APP_STATUS_ENUM.INITIALIZING);
            expect(latestAppStatus).toEqual(APP_STATUS_ENUM.INITIALIZING);

            // App finishes its initialization process.

            model.setAppStatus(APP_STATUS_ENUM.READY);
            expect(latestAppStatus).toEqual(APP_STATUS_ENUM.READY);

            // App is working on getting or saving some content, for example.

            model.setAppStatus(APP_STATUS_ENUM.WORKING);
            expect(latestAppStatus).toEqual(APP_STATUS_ENUM.WORKING);

            // Imagine this someone is no longer interested in the change.

            model.removeEventListener("App.Status", onAppStatusChange);
            model.setAppStatus(APP_STATUS_ENUM.READY);
            expect(latestAppStatus).toEqual(APP_STATUS_ENUM.WORKING);

            appStatusTest.success();
        });

        var noteListStatusTest = testSuite.test("NoteList.Status", function () {
            var model = createModel(createModelOptions);
            var NOTE_LIST_STATUS_ENUM = testOpionts.NOTE_LIST_STATUS_ENUM;

            // Imagine someone is interested in the NoteList model.

            var latestNoteList = null;
            var latestNoteListStatus = null;
            var onNoteListChange = function (changeEvent) {
                latestNoteList = changeEvent.getSource();
                latestNoteListStatus = latestNoteList.getStatus();
            };
            model.addEventListener("NoteList.Status", onNoteListChange);
            expect(latestNoteListStatus).toEqual(NOTE_LIST_STATUS_ENUM.EMPTY);
            expect(latestNoteList.getList().length).toEqual(0);

            // Imagine this someone looks for more notes to display.

            expect(latestNoteList.hasMore()).toEqual(true);
            model.loadMoreNotes();
            expect(latestNoteListStatus).toEqual(NOTE_LIST_STATUS_ENUM.LOADING_MORE);

            // List acquires the requested notes.

            // TODO Complete request on model based on injection here in tests.

            expect(latestNoteListStatus).toEqual(NOTE_LIST_STATUS_ENUM.READY);
            expect(latestNoteList.getList().length).toBeGreaterThan(0);
            expect(latestNoteList.hasMore()).toEqual(false);
                // For testing purposes ;) .. there could be more.

            noteListStatusTest.success();
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
