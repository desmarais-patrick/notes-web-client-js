"use strict";

(function (Notes) {
    Notes.model.cache = function () {
        var that = {};

        var notesById = {};
        var notesByClientId = {};

        that.save = function (note) {
            var id = note.getId();
            if (id !== null) {
                // ID can be null, pending creation on server.
                notesById[id] = note;
            }

            var clientId = note.getClientId();
            notesByClientId[clientId] = note;
        };

        that.getById = function (id) {
            var note = notesById[id];
            if (typeof note === "undefined") {
                return null;
            }
            return note;
        };

        that.getByClientId = function (clientId) {
            var note = notesByClientId[clientId];
            if (typeof note === "undefined") {
                return null;
            }
            return note;
        };

        return that;
    };
})(Notes);
