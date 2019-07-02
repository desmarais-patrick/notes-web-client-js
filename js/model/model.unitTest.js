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

        var createApp = Notes.model.app;
        var createEvents = Notes.model.events;
        var createNote = Notes.model.note;
        var createNotes = Notes.model.notes;
        var NOTES_STATUS_ENUM = Notes.model.notes.STATUS_ENUM;

        var createModel = Notes.model.model;
        var createModelOptions = {
            createApp: createApp,
            createEvents: createEvents,
            createNote: createNote,
            createNotes: createNotes,
            NOTES_STATUS_ENUM: NOTES_STATUS_ENUM,
            requestBuilder: requestBuilder
        };

        var testOptions = {
            APP_STATUS_ENUM: Notes.model.app.STATUS_ENUM,
            NOTES_STATUS_ENUM: NOTES_STATUS_ENUM
        };

        testSuite.start();

        var requestAndListenTest = testSuite.test("Request and listen", function () {
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
