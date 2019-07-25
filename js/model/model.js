"use strict";

(function (Notes) {
    Notes.model.model = function (options) {
        var that = {};

        var events = options.createEvents();
        var cache = options.createCache();

        var requestBuilder = options.requestBuilder;
        var setTimeout = options.setTimeout;

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

        var NOTE_STATUS_ENUM = options.NOTE_STATUS_ENUM;
        var createNote = options.createNote;

        that.getApp = function () {
            return app;
        };

        that.getNotes = function () {
            return notes;
        };

        that.getNoteClientIds = function () {
            var noteClientIds = [];
            notes.forEach(function (note) {
                var clientId = note.getClientId();
                noteClientIds.push(clientId);
            });
            return noteClientIds;
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
                            optionalCallback(newError, null);
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
                    date: date,
                    status: NOTE_STATUS_ENUM.READY
                });
                newNotes.push(note);
                cache.save(note);
            });
            return newNotes;
        };

        that.getNote = function (id) {
            return cache.getById(id);
        };

        that.getNoteByClientId = function (clientId) {
            return cache.getByClientId(clientId);
        };

        that.requestNote = function (id, optionalCallback) {
            var note = cache.getById(id);
            if (note !== null) {
                if (optionalCallback) {
                    setTimeout(function () {
                        optionalCallback(null, note);
                    }, 0);
                }

                return note;
            }

            note = createNote({
                events: events,
                id: id,
                text: null,
                date: null,
                status: NOTE_STATUS_ENUM.LOADING
            });
            cache.save(note);

            requestBuilder.get("/notes/" + id)
                .send(function (err, response) {
                    if (err) {
                        note.setStatus(NOTE_STATUS_ENUM.FAILED_TO_LOAD);

                        if (optionalCallback) {
                            var message = "Failed to request note '" + id + "' ";
                            message += "Cause: ";
                            message += err.stack;
                            var newError = new Error(message);
                            optionalCallback(newError, null);
                        }
                        return;
                    }

                    parseNoteResponse(note, response);
                    note.setStatus(NOTE_STATUS_ENUM.READY);

                    if (optionalCallback) {
                        optionalCallback(null, note);
                    }
                });

            return note;
        };

        var parseNoteResponse = function (note, response) {
            note.setText(response.text);

            var date = new Date(response.date);
            note.setDate(date);
        };

        that.createNote = function (text, optionalCallback) {
            var date = new Date();
            var note = createNote({
                events: events,
                id: null,
                text: text,
                date: date,
                status: NOTE_STATUS_ENUM.LOADING
            });
            cache.save(note);
            notes.insertOne(note);

            var body = JSON.stringify({
                text: text,
                date: date.toISOString()
            });
            requestBuilder.post("/notes", body)
                .send(function (err, response) {
                    if (err) {
                        note.setStatus(NOTE_STATUS_ENUM.FAILED_TO_SYNC);
                        if (optionalCallback) {
                            optionalCallback(err, null);
                        }
                        return;
                    }

                    note.setId(response.id);
                    note.setStatus(NOTE_STATUS_ENUM.READY);
                    cache.save(note);

                    if (optionalCallback) {
                        optionalCallback(null, note);
                    }

                    saveAnyPendingUpdate(note);
                });

            return note;
        };

        that.updateNote = function (note, newText) {
            note.setText(newText);
            note.setIsSynchronized(false);

            if (note.getId() === null ||
                    note.getStatus() === NOTE_STATUS_ENUM.LOADING) {
                return;
            }

            saveAnyPendingUpdate(note);
        };

        that.deleteNote = function (note) {
            note.setIsDeleted(true);
            note.setIsSynchronized(false);

            var noteClientId = note.getClientId();
            notes.delete(noteClientId);

            if (note.getId() === null ||
                    note.getStatus() === NOTE_STATUS_ENUM.LOADING) {
                note.setIsSynchronized(false);
                return;
            }

            saveAnyPendingUpdate(note);
        };

        var saveAnyPendingUpdate = function (note) {
            if (note.isSynchronized()) {
                return;
            }

            note.setIsSynchronized(true);

            if (note.isDeleted()) {
                requestBuilder.delete("/notes/" + note.getId())
                .send(function (err) {
                    if (err) {
                        note.setIsSynchronized(false);
                        note.setStatus(NOTE_STATUS_ENUM.FAILED_TO_SYNC);
                        return;
                    }

                    note.setStatus(NOTE_STATUS_ENUM.READY);
                });
                return;
            }

            var date = note.getDate();
            date = (date === null) ? null : date.toISOString();
            var body = {
                text: note.getText(),
                date: date
            };

            requestBuilder.put("/notes/" + note.getId(), body)
                .send(function (err) {
                    if (err) {
                        note.setIsSynchronized(false);
                        note.setStatus(NOTE_STATUS_ENUM.FAILED_TO_SYNC);
                        return;
                    }

                    note.setStatus(NOTE_STATUS_ENUM.READY);
                    saveAnyPendingUpdate(note);
                });
        };

        that.listen = function listen(topic) {
            return events.listen(topic);
        };

        return that;
    };
})(Notes);
