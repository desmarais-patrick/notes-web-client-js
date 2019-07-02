"use strict";

(function (Notes) {
    Notes.model.cache = function () {
        var that = {};

        var notesById = {};

        that.save = function (note) {
            var id = note.getId();
            notesById[id] = note;
        };

        that.get = function (id) {
            var note = notesById[id];
            if (typeof note === "undefined") {
                return null;
            }
            return note;
        };

        return that;
    };
})(Notes);
