"use strict";

(function (Notes) {
    var NOTE_LIST_STATUS_ENUM = {
        EMPTY: "Empty",
        LOADING_MORE: "LoadingMore",
        READY: "Ready"
    }; // (!) Hopefully, nobody changes that object. :s

    Notes.model.noteList = function () {
        var that = {};

        var list = []; // Sorted list to return fast.
        var hasMore = true; // To avoid unnecessary server requests.
        var status = NOTE_LIST_STATUS_ENUM.EMPTY;
            // To initialize list and show loading.

        // TODO Add changeListener or readyListener here!
        //      Or put this logic in Model.

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
            return list.length;
        };

        that.insertMany = function (notes) {
            // Assuming added notes have older dates.
            // ...such as when fetching more notes from server.

            // (!) Hopefully, notes are NOT already in the list. :s
            //     Especially in the case client is de-synched with server.
            //     Ex. Two browsers are open and create/delete different notes.
            list = list.concat(notes);
            list.sort(function (a, b) {
                return a.compare(b);
            });
            return list.length;
        };

        that.delete = function (targetNoteId) {
            // (!) Hopefully, note is already in the list. :s
            var deleteIndex = -1;
            // TODO Find a better way to find an element's index.
            list.find(function (note) {
                deleteIndex++;
                return (note.getId() === targetNoteId);
            });
            list.splice(deleteIndex, 1);
            return list.length;
        };

        that.update = function (updatedNote) {
            // (!) Hopefully, note is already in the list. :s
            var updatedNoteId = updatedNote.getId();
            for (var i = 0; i < list.length; i++) {
                var note = list[i];
                if (note.getId() === updatedNoteId) {
                    list[i] = updatedNote;
                    break;
                }
            }
        }

        that.hasMore = function () {
            return hasMore;
        };
        that.setHasMore = function (newValue) {
            hasMore = newValue;
        };
        
        that.getStatus = function () {
            return status;
        };
        that.setStatus = function (newStatus) {
            // (!) Hopefully, it's one of APP_STATUS_ENUM. :s
            status = newStatus;
        };

        return that;
    };
    Notes.model.noteList.NOTE_LIST_STATUS_ENUM = NOTE_LIST_STATUS_ENUM;
})(Notes);