"use strict";

(function (Notes) {
    Notes.model.note = function(id, text, date) {
        var that = {};

        var id = id || null;
        var text = text || "";
        var date = date || new Date();

        that.getId = function () { return id; };

        that.getText = function () { return text; };
        that.setText = function (newText) {
            text = newText;
        };

        that.getDate = function () { return date; }

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
