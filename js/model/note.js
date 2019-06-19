"use strict";

(function (Notes) {
    Notes.model.note = function(id, text, date) {
        var that = {};

        var id = id || null;
        var text = text || "";
        var date = date || new Date();

        // Uniquely identifiable.
        that.getId = function () { return id; };

        that.getText = function () { return text; };
        that.setText = function (newText) {
            text = newText;
        };

        that.getDate = function () { return date; }

        // Comparable from newest to oldest.
        that.compare = function (otherNote) {
            var otherTime = otherNote.getDate().getTime();
            var thisTime = this.getDate().getTime();
            if (thisTime < otherTime) {
                return -1;
            } else if (thisTime > otherTime) {
                return 1;
            } else {
                return 0;
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
})(Notes);
