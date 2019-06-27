"use strict";

(function (Notes) {
    Notes.model.note = function(options) {
        var that = {};

        var clientId = options.clientId || ++Notes.model.note.clientId;
        var id = options.id || null;
        var text = options.text || "";
        var date = options.date || new Date();
        var time = date.getTime();

        that.getClientId = function () { return clientId; };

        that.getId = function () { return id; };

        that.getText = function () { return text; };
        that.setText = function (newText) {
            text = newText;
        };

        that.getDate = function () { return date; };
        that.getTime = function () { return time; };

        that.compare = function (otherNote) {
            var otherTime = otherNote.getTime();
            if (time < otherTime) {
                return 1; // This is older, so after.
            } else if (time > otherTime) {
                return -1; // This is newer, so before.
            } else {
                return 0; // Equal!
            }
        };

        that.toString = function () {
            return JSON.stringify({
                id: id,
                text: text,
                date: date.toISOString()
            });
        }

        return that;
    };
    Notes.model.note.clientId = 0;
})(Notes);
