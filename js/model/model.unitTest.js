"use strict";

(function (Notes) {
    var modelTestScript = function (options) {
        var expect = options.expect;
        var testSuiteBuilder = options.testSuiteBuilder;
        var xmlHttpRequestMock2 = options.xmlHttpRequestMock2;

        var testSuite = testSuiteBuilder.createTestSuite("[Model] Model");

        testSuite.setup();

        var setupNewTestContext = function () {
            var testContext = {
                lastXMLHttpRequest: null,
                model: null
            };

            var XMLHttpRequestMock = xmlHttpRequestMock2(function (request) {
                testContext.lastXMLHttpRequest = request;
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

            testContext.model = createModel(createModelOptions);
            return testContext;
        };

        var testOptions = {
            APP_STATUS_ENUM: Notes.model.app.STATUS_ENUM,
            NOTE_STATUS_ENUM: Notes.model.note.STATUS_ENUM,
            NOTES_STATUS_ENUM: Notes.model.notes.STATUS_ENUM
        };

        testSuite.start();

        var requestAndListenTest = testSuite.test("Request and listen", function () {
            var testContext = setupNewTestContext();
            var model = testContext.model;
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
            testContext.lastXMLHttpRequest.load({
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
            var testContext = setupNewTestContext();
            var model = testContext.model;
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
            expect(testContext.lastXMLHttpRequest).toNotBeNull();

            // Respond with error.
            var errorResponse = {
                type: "Error",
                code: 500,
                message: "Some server error"
            };
            testContext.lastXMLHttpRequest.load({
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
            var testContext = setupNewTestContext();
            var model = testContext.model;
            var NOTE_STATUS_ENUM = testOptions.NOTE_STATUS_ENUM;

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

            expect(testContext.lastXMLHttpRequest).toNotBeNull();
            var noteX = {
                type: "Note",
                id: "x",
                text: "some text",
                date: (new Date("2019-01-01")).toISOString()
            };
            testContext.lastXMLHttpRequest.load({
                responseStatus: 200,
                responseText: JSON.stringify(noteX)
            }, function afterLoad() {
                requestNoteTest.success();
            });
        });
        
        var cacheTest = testSuite.test("Cache", function () {
            var testContext = setupNewTestContext();
            var model = testContext.model;
            var NOTE_STATUS_ENUM = testOptions.NOTE_STATUS_ENUM;

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
            testContext.lastXMLHttpRequest.load({
                responseStatus: 200,
                responseText: JSON.stringify(collectionInResponseFormat)
            }, function afterLoad() {
                testContext.lastXMLHttpRequest = null; // Reset for next test.

                var requestedNote = model.requestNote(noteId, function (err, note) {
                    expect(err).toBeNull();
                    expect(note).toNotBeNull();
                });
                expect(testContext.lastXMLHttpRequest).toBeNull(); // No request, cached!
                expect(requestedNote.getId()).toEqual(noteId); // Cached!
                expect(requestedNote.getStatus()).toEqual(NOTE_STATUS_ENUM.READY);
                cacheTest.success();
            });
        });

        var noteNotFoundTest = testSuite.test("Note not found", function () {
            var testContext = setupNewTestContext();
            var model = testContext.model;
            var NOTE_STATUS_ENUM = testOptions.NOTE_STATUS_ENUM;

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
            testContext.lastXMLHttpRequest.load({
                responseStatus: 404,
                responseText: JSON.stringify(response)
            }, function afterLoad() {
                expect(pendingNote.getStatus()).toEqual(NOTE_STATUS_ENUM.FAILED_TO_LOAD);
                noteNotFoundTest.success();
            });
        });

        var networkUnavailable = testSuite.test("Network unavailable", function () {
            var testContext = setupNewTestContext();
            var model = testContext.model;
            var NOTE_STATUS_ENUM = testOptions.NOTE_STATUS_ENUM;

            // Example use case:
            // Imagine someone tries to open a new note from start while offline.
            var requestedNote = model.requestNote("y", function (err, note) {
                expect(err).toNotBeNull();
                expect(note).toBeNull();
            });
            testContext.lastXMLHttpRequest.error(new Error("Network unavailable"),
                function afterLoad() {
                    expect(requestedNote.getStatus()).toEqual(NOTE_STATUS_ENUM.FAILED_TO_LOAD);
                    networkUnavailable.success();
                });
        });

        var createNoteTest = testSuite.test("Create", function () {
            var testContext = setupNewTestContext();
            var model = testContext.model;
            var NOTE_STATUS_ENUM = testOptions.NOTE_STATUS_ENUM;

            var newNote = model.createNote("some initial text");
            expect(newNote.getClientId()).toNotBeNull();
            expect(newNote.getId()).toBeNull();
            expect(newNote.getText()).toEqual("some initial text");
            expect(newNote.getStatus()).toEqual(NOTE_STATUS_ENUM.LOADING);

            var createResponse = {
                type: "NoteCreated",
                id: "1"
            };
            testContext.lastXMLHttpRequest.load({
                responseStatus: 201,
                responseText: JSON.stringify(createResponse)
            }, function afterLoad() {
                expect(newNote.getId()).toEqual("1");
                expect(newNote.getStatus()).toEqual(NOTE_STATUS_ENUM.READY);

                expect(model.getNotes().getList()[0].getId()).toEqual("1");
                expect(model.getNote(1)).toNotBeNull();

                createNoteTest.success();
            });
        });

        var createNoteFailedTest = testSuite.test("Create offline", function () {
            var testContext = setupNewTestContext();
            var model = testContext.model;
            var NOTE_STATUS_ENUM = testOptions.NOTE_STATUS_ENUM;

            var newNote = model.createNote("some initial text");
            var errorResponse = {
                type: "Error",
                code: 500,
                message: "Failed to save note with text 'some in...'."
            };
            testContext.lastXMLHttpRequest.load({
                responseStatus: 500,
                responseText: JSON.stringify(errorResponse)
            }, function afterLoad() {
                expect(newNote.getStatus()).toEqual(NOTE_STATUS_ENUM.FAILED_TO_SYNC);
                createNoteFailedTest.success();
            });
        });

        var updateTest = testSuite.test("Update", function () {
            var testContext = setupNewTestContext();
            var model = testContext.model;

            // Create note first.
            var note = model.createNote("some initial text");
            var createXmlHttpRequest = testContext.lastXMLHttpRequest;
            testContext.lastXMLHttpRequest = null; // Request for next update.

            // Update this note with new text.
            // ...before creation is confirmed by server ;)
            model.updateNote(note, "some new text");
            var updateXmlHttpRequest = testContext.lastXMLHttpRequest;
            expect(updateXmlHttpRequest).toBeNull();
                // No update request while not created!

            model.updateNote(note, "some new text 2");

            var createResponse = {
                type: "NoteCreated",
                id: "1"
            };
            createXmlHttpRequest.load({
                responseStatus: 201,
                responseText: JSON.stringify(createResponse)
            }, function afterLoad() {
                // Update is automatically launched after created!
                var updateXmlHttpRequest = testContext.lastXMLHttpRequest;
                expect(updateXmlHttpRequest).toNotBeNull();

                updateXmlHttpRequest.load({
                    responseStatus: 200,
                    responseText: JSON.stringify({
                        type: "NoteUpdated"
                    })
                }, function afterUpdate() {
                    // Update on existing note.
                    model.updateNote(note, "some new text 3");

                    var updateXmlHttpRequest = testContext.lastXMLHttpRequest;
                    expect(updateXmlHttpRequest).toNotBeNull();

                    updateTest.success();
                }); // End load for first update.
            }); // End load for create.
        }); // End update test.

        var deleteTest = testSuite.test("Delete", function () {
            var testContext = setupNewTestContext();
            var model = testContext.model;

            // Create note first.
            var note = model.createNote("some initial text");
            var createXmlHttpRequest = testContext.lastXMLHttpRequest;
            testContext.lastXMLHttpRequest = null; // Reset for next delete.
            expect(model.getNotes().getList()[0].getClientId()).toEqual(note.getClientId());

            model.deleteNote(note);
            expect(testContext.lastXMLHttpRequest).toBeNull(); // Wait for create to occur.
            expect(model.getNotes().getList().length).toEqual(0);

            var createResponse = {
                type: "NoteCreated",
                id: "1"
            };
            createXmlHttpRequest.load({
                responseStatus: 201,
                responseText: JSON.stringify(createResponse)
            }, function afterLoad() {
                // Delete is automatically sent after created!
                var deleteXmlHttpRequest = testContext.lastXMLHttpRequest;
                expect(deleteXmlHttpRequest).toNotBeNull();

                deleteXmlHttpRequest.load({
                    responseStatus: 200,
                    responseText: JSON.stringify({
                        type: "NoteDeleted"
                    })
                }, function afterDelete() {
                    deleteTest.success();
                }); // End load for delete.
            }); // End load for create.
        });

        testSuite.end();

        testSuite.teardown();

        return testSuite;
    };

    Notes.test.testScripts.push(modelTestScript);
})(Notes);
