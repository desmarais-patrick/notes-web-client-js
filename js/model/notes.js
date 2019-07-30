"use strict";

(function (Notes) {
    var STATUS_ENUM = {
        LOADING: "Loading",
        READY: "Ready"
    }; // (!) Hopefully, nobody changes that object. :s

    Notes.model.notes = function notes(options) {
        var that = {};

        var events = options.events;

        var list = options.list || []; // Keep sorted!
        var hasMore = options.hasMore || true; // To avoid unnecessary server requests.
        var status = options.status || STATUS_ENUM.READY;
            // To initialize list and show loading.

        that.getList = function () {
            return list;
        };

        that.insertOne = function (newNote) {
            // Assuming a new note has the most recent date.
            // ...such as when creating a new note.

            // (!) Hopefully, note is NOT already in the list. :s
            list.unshift(newNote);
            list.sort(function (a, b) {
                return a.compare(b);
            });

            events.dispatch("change Notes.List", "note inserted", {
                newList: getClientIds()
            });

            return list.length;
        };

        that.insertMany = function (newNotes) {
            // Assuming added notes have older dates.
            // ...such as when fetching more notes from server.

            // (!) Hopefully, notes are NOT already in the list. :s
            //     Especially in the case client is de-synched with server.
            //     Ex. Two browsers are open and create/delete different notes.
            list = list.concat(newNotes);
            list.sort(function (a, b) {
                return a.compare(b);
            });

            events.dispatch("change Notes.List", "many notes inserted", {
                newList: getClientIds()
            });

            return list.length;
        };

        that.delete = function (targetNoteClientId) {
            // (!) Hopefully, note is already in the list. :s
            var deleteIndex = -1;
            // TODO Find a better way to find an element's index.
            list.find(function (note) {
                deleteIndex++;
                return (note.getClientId() === targetNoteClientId);
            });
            list.splice(deleteIndex, 1);

            events.dispatch("change Notes.List", "one less note", {
                newList: getClientIds()
            });

            return list.length;
        };

        that.update = function (updatedNote) {
            // (!) Hopefully, note is already in the list. :s
            var updatedNoteId = updatedNote.getId();
            for (var i = 0; i < list.length; i++) {
                var note = list[i];
                if (note.getId() === updatedNoteId) {
                    list[i] = updatedNote;

                    events.dispatch("change Notes.List", "updated note", {
                        newList: getClientIds()
                    });
                    break;
                }
            }
        };

        var getClientIds = that.getClientIds = function () {
            var clientIds = [];
            list.forEach(function (note) {
                var clientId = note.getClientId();
                clientIds.push(clientId);
            });
            return clientIds;
        };

        that.hasMore = function () {
            return hasMore;
        };
        that.setHasMore = function (newValue) {
            if (newValue !== hasMore) {
                hasMore = newValue;

                events.dispatch("change Notes.HasMore", "new hasMore", {
                    newHasMore: newValue
                });
            }
        };
        
        that.getStatus = function () {
            return status;
        };
        that.setStatus = function (newStatus) {
            if (isEnumValue(newStatus) === false) {
                throw new Error("Implementation error! " + 
                    newStatus + " is not value part of STATUS_ENUM.");
            }

            if (newStatus !== status) {
                status = newStatus;

                events.dispatch("change Notes.Status", "new status", {
                    newStatus: newStatus
                });
            }
        };

        var isEnumValue = function (value) {
            var key = Object.keys(STATUS_ENUM).find(function (key, index, array) {
                return (value === array[key]);
            });
            return (key !== null);
        };

        return that;
    };
    Notes.model.notes.STATUS_ENUM = STATUS_ENUM;
})(Notes);