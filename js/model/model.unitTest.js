"use strict";

(function (Notes) {
    var modelTestScript = function (options) {
        var expect = options.expect;
        var testSuiteBuilder = options.testSuiteBuilder;
        var xmlHttpRequestMock2 = options.xmlHttpRequestMock2;

        var testSuite = testSuiteBuilder.createTestSuite("[Model] Model");

        testSuite.setup();

        var lastXMLHttpRequest = null;
        var XMLHttpRequestMock = xmlHttpRequestMock2(function (request) {
            lastXMLHttpRequest = request;
        });
        var configuration = testSuite.configuration;
        var createRequest = Notes.communication.request;
        var requestBuilder = Notes.communication.requestBuilder({
            XMLHttpRequest: XMLHttpRequestMock,
            requestTimeoutInMillis: 30000,

            request: createRequest,
            baseUrl: configuration.apiServerBaseUrl
        });

        var setTimeout = window.setTimeout;

        var createApp = Notes.model.app;
        var createCache = Notes.model.cache;
        var createEvents = Notes.model.events;
        var createNote = Notes.model.note;
        var NOTE_STATUS_ENUM = Notes.model.note.STATUS_ENUM;
        var createNotes = Notes.model.notes;
        var NOTES_STATUS_ENUM = Notes.model.notes.STATUS_ENUM;

        var createModel = Notes.model.model;
        var createModelOptions = {
            createApp: createApp,
            createCache: createCache,
            createEvents: createEvents,
            createNote: createNote,
            NOTE_STATUS_ENUM: NOTE_STATUS_ENUM,
            createNotes: createNotes,
            NOTES_STATUS_ENUM: NOTES_STATUS_ENUM,
            requestBuilder: requestBuilder,
            setTimeout: setTimeout
        };

        var testOptions = {
            APP_STATUS_ENUM: Notes.model.app.STATUS_ENUM,
            NOTES_STATUS_ENUM: NOTES_STATUS_ENUM
        };

        testSuite.start();

        var requestAndListenTest = testSuite.test("Request and listen", function () {
            lastXMLHttpRequest = null;
            var model = createModel(createModelOptions);
            var NOTES_STATUS_ENUM = testOptions.NOTES_STATUS_ENUM;

            var statusEventIterator = model.listen("change Notes.Status");
            expect(statusEventIterator.hasNext()).toEqual(false);
            var listEventIterator = model.listen("change Notes.List");
            expect(listEventIterator.hasNext()).toEqual(false);

            // Send a request for more notes.
            model.requestMoreNotes();

            // List is loading.
            expect(statusEventIterator.hasNext()).toEqual(true);
            expect(statusEventIterator.next().options.newStatus)
                .toEqual(NOTES_STATUS_ENUM.LOADING);
            expect(listEventIterator.hasNext()).toEqual(false);

            // Request completes with some results.
            var noteItemInResponseFormat = {
                type: "Note",
                id: "1",
                text: "some text",
                date: (new Date("2019-01-01")).toISOString()
            };
            var collectionInResponseFormat = {
                type: "Collection",
                items: [noteItemInResponseFormat],
                offset: 0,
                limit: 10
            };
            lastXMLHttpRequest.load({
                responseStatus: 200,
                responseText: JSON.stringify(collectionInResponseFormat)
            }, function afterLoad() {
                // List is ready.
                expect(statusEventIterator.hasNext()).toEqual(true);
                expect(statusEventIterator.next().options.newStatus)
                    .toEqual(NOTES_STATUS_ENUM.READY);
    
                // List has been updated.
                expect(listEventIterator.hasNext()).toEqual(true);
                expect(listEventIterator.next().options.newList.length)
                    .toEqual(1);
    
                expect(statusEventIterator.hasNext()).toEqual(false);
                expect(listEventIterator.hasNext()).toEqual(false);
    
                requestAndListenTest.success();
            });
        });

        var requestFailTest = testSuite.test("Handle fail request", function () {
            lastXMLHttpRequest = null;
            var model = createModel(createModelOptions);
            var NOTES_STATUS_ENUM = testOptions.NOTES_STATUS_ENUM;

            // List is ready before error.
            var statusEventIterator = model.listen("change Notes.Status");
            expect(statusEventIterator.hasNext()).toEqual(false);
            expect(model.getNotes().getStatus())
                .toEqual(NOTES_STATUS_ENUM.READY);

            // Send request.
            model.requestMoreNotes();

            // List is loading pending response.
            expect(statusEventIterator.next().options.newStatus)
                    .toEqual(NOTES_STATUS_ENUM.LOADING);
            expect(lastXMLHttpRequest).toNotBeNull();

            // Respond with error.
            var errorResponse = {
                type: "Error",
                code: 500,
                message: "Some server error"
            };
            lastXMLHttpRequest.load({
                responseStatus: 500,
                responseText: JSON.stringify(errorResponse)
            }, function afterLoad() {
                // List is ready after error.
                expect(statusEventIterator.next().options.newStatus)
                    .toEqual(NOTES_STATUS_ENUM.READY);
                
                requestFailTest.success();
            });
        });
        
        var requestNoteTest = testSuite.test("Request note X", function () {
            lastXMLHttpRequest = null;
            var model = createModel(createModelOptions);

            // Example use case:
            // Someone enters the app with bookmark to note X.
            var noteId = "x";
            var pendingNote = model.requestNote(noteId, function (err, note) {
                expect(err).toBeNull();
                expect(note).toNotBeNull();
                
                // Note is updated instead of replaced.
                expect(note).toEqual(pendingNote);
                expect(note.getId()).toEqual("x");                
                expect(note.getText()).toEqual("some text");
                expect(note.getStatus()).toEqual(NOTE_STATUS_ENUM.READY);
            });
            expect(pendingNote.getStatus()).toEqual(NOTE_STATUS_ENUM.LOADING);

            expect(lastXMLHttpRequest).toNotBeNull();
            var noteX = {
                type: "Note",
                id: "x",
                text: "some text",
                date: (new Date("2019-01-01")).toISOString()
            };
            lastXMLHttpRequest.load({
                responseStatus: 200,
                responseText: JSON.stringify(noteX)
            }, function afterLoad() {
                requestNoteTest.success();
            });
        });
        
        var cacheTest = testSuite.test("Cache", function () {
            lastXMLHttpRequest = null;
            var model = createModel(createModelOptions);

            // Example use case:
            // Imagine someone chooses to open note from list.
            var noteId = "1";
            var noteItemInResponseFormat = {
                type: "Note",
                id: noteId,
                text: "some text",
                date: (new Date("2019-01-01")).toISOString()
            };
            var collectionInResponseFormat = {
                type: "Collection",
                items: [noteItemInResponseFormat],
                offset: 0,
                limit: 10
            };
            model.requestMoreNotes();
            lastXMLHttpRequest.load({
                responseStatus: 200,
                responseText: JSON.stringify(collectionInResponseFormat)
            }, function afterLoad() {
                lastXMLHttpRequest = null; // Reset for next test.

                var requestedNote = model.requestNote(noteId, function (err, note) {
                    expect(err).toBeNull();
                    expect(note).toNotBeNull();
                });
                expect(lastXMLHttpRequest).toBeNull(); // No request, cached!
                expect(requestedNote.getId()).toEqual(noteId); // Cached!
                expect(requestedNote.getStatus()).toEqual(NOTE_STATUS_ENUM.READY);
                cacheTest.success();
            });
        });

        var noteNotFoundTest = testSuite.test("Note not found", function () {
            lastXMLHttpRequest = null;
            var model = createModel(createModelOptions);

            // Example use case:
            // Imagine someone chooses to open note from list.
            var noteId = "notFound";
            var pendingNote = model.requestNote(noteId, function (err, note) {
                expect(err).toNotBeNull();
                expect(note).toBeNull();
            });
            var response = {
                type: "Error",
                code: 404,
                message: "Resource 'notFound' could not be found."
            };
            lastXMLHttpRequest.load({
                responseStatus: 404,
                responseText: JSON.stringify(response)
            }, function afterLoad() {
                expect(pendingNote.getStatus()).toEqual(NOTE_STATUS_ENUM.FAILED_TO_LOAD);
                noteNotFoundTest.success();
            });
        });

        var networkUnavailable = testSuite.test("Network unavailable", function () {
            lastXMLHttpRequest = null;
            var model = createModel(createModelOptions);

            // Example use case:
            // Imagine someone tries to open a new note from start while offline.
            var requestedNote = model.requestNote("y", function (err, note) {
                expect(err).toNotBeNull();
                expect(note).toBeNull();
            });
            lastXMLHttpRequest.error(new Error("Network unavailable"),
                function afterLoad() {
                    expect(requestedNote.getStatus()).toEqual(NOTE_STATUS_ENUM.FAILED_TO_LOAD);
                    networkUnavailable.success();
                });
        });

        var createNoteTest = testSuite.test("Create", function () {
            lastXMLHttpRequest = null;
            var model = createModel(createModelOptions);

            var newNote = model.createNote("some initial text");
            expect(newNote.getClientId()).toNotBeNull();
            expect(newNote.getId()).toBeNull();
            expect(newNote.getText()).toEqual("some initial text");
            expect(newNote.getStatus()).toEqual(NOTE_STATUS_ENUM.LOADING);

            var createResponse = {
                type: "NoteCreated"
            };
            lastXMLHttpRequest.load({
                responseStatus: 201,
                responseText: JSON.stringify(createResponse)
            }, function afterLoad() {
                expect(newNote.getStatus()).toEqual(NOTE_STATUS_ENUM.READY);
                createNoteTest.success();
            });
        });

        var createNoteFailedTest = testSuite.test("Create offline", function () {
            lastXMLHttpRequest = null;
            var model = createModel(createModelOptions);

            var newNote = model.createNote("some initial text");
            var errorResponse = {
                type: "Error",
                code: 500,
                message: "Failed to save note with text 'some in...'."
            };
            lastXMLHttpRequest.load({
                responseStatus: 500,
                responseText: JSON.stringify(errorResponse)
            }, function afterLoad() {
                expect(newNote.getStatus()).toEqual(NOTE_STATUS_ENUM.FAILED_TO_SYNC);
                createNoteFailedTest.success();
            });
        });

        // Update note X with newText
        // Delete note X

        testSuite.end();

        testSuite.teardown();

        return testSuite;
    };

    Notes.test.testScripts.push(modelTestScript);
})(Notes);
