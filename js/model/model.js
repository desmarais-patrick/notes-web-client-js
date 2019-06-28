"use strict";

(function (Notes) {
    Notes.model.model = function (options) {
        var that = {};

        // Create event dispatch.
        // Create cache for individual notes.
        // Create app.
        // Create noteList.
        // Receive request builder instance.

        // Expose a few methods:
        // Get app...model.getApp(); ==> App
        // Get note list...model.getNotes(); ==> NoteList
        // Request more notes...model.requestMoreNotes(callback?); ...events "change Notes.Status (noteList)", "change Notes.List (noteList)"
        // Get note X...model.requestNote(x, callback?); => Note ...events "change Notes.x.Status Notes.x.Text (note)" -- Status: NotFound, Error, Loading, Ready
        // Create note with text...model.createNote(text); => Note ...events "change Notes.x.BackendId" (use our own client IDs to avoid waiting on backend ID)
        // Update note X with newText...model.updateNote(x, newText); => Note ...events "change Notes.x.Text"
        // Delete note X...model.deleteNote(x); ...events "change Notes.x (null)", "change Notes.List" "change App.Status"
        // listen(topic); => EventIterator.

        // I'll need a refreshNotes() with communication after delete and creation to confirm synchronicity.

        var events = options.createEvents();
        var requestBuilder = options.requestBuilder;

        var app = options.createApp({
            events: events,
            status: null
        });

        var NOTES_STATUS_ENUM = options.NOTES_STATUS_ENUM;
        var notes = options.createNotes({
            events: events,
            status: null,
            list: []
        });
        var createNote = options.createNote;

        that.getApp = function () {
            return app;
        };

        that.getNotes = function () {
            return notes;
        };

        that.requestMoreNotes = function (optionalCallback) {
            notes.setStatus(NOTES_STATUS_ENUM.LOADING);
            requestBuilder.get("/notes")
                .addQueryParameter("limit", 10)
                .addQueryParameter("offset", 0)
                .send(function (err, response) {
                    if (err) {
                        notes.setStatus(NOTES_STATUS_ENUM.READY);

                        if (optionalCallback) {
                            var message = "Unable to request more notes. ";
                            message += "Cause: ";
                            message += err.stack;
                            var newError = new Error(message);
                            optionalCallback(newError);
                        }
                        return;
                    }

                    var newNotes = parseNotesResponse(response);
                    notes.insertMany(newNotes);
                    notes.setStatus(NOTES_STATUS_ENUM.READY);

                    if (optionalCallback) {
                        optionalCallback(null, notes);
                    }
                });
        };

        var parseNotesResponse = function (response) {
            var items = response.items;
            var newNotes = [];
            items.forEach(function (item) {
                var date = new Date(item.date);
                var note = createNote({
                    events: events,
                    id: item.id,
                    text: item.text,
                    date: date
                });
                newNotes.push(note);
            });
            return newNotes;
        };

        that.listen = function listen(topic) {
            return events.listen(topic);
        };

        return that;
    };
})(Notes);
