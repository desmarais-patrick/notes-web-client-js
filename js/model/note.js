"use strict";

(function (Notes) {
    Notes.model.note = function(options) {
        var that = {};

        var events = options.events;

        // Specifying clientId through options, meant for cloning.
        var clientId = options.clientId || ++Notes.model.note.clientId;

        var id = options.id || null;
        var text = options.text || "";
        var date = options.date || new Date();
        var time = date.getTime();

        var changeTextTopic = "change Notes[" + clientId + "].Text";
        var changeDateTopic = "change Notes[" + clientId + "].Date";

        that.getClientId = function () { return clientId; };

        that.getId = function () { return id; };

        that.getText = function () { return text; };
        that.setText = function (newText) {
            if (newText !== text) {
                text = newText;
                events.dispatch(changeTextTopic, "new text", 
                    {newText: newText});
            }
        };

        that.getDate = function () { return date; };
        that.getTime = function () { return time; };
        that.setDate = function (newDate) {
            var newTime = newDate.getTime();
            if (newTime !== time) {
                date = new Date(newDate);
                time = newTime;
                events.dispatch(changeDateTopic, "new date", 
                    {newDate: new Date(newDate)});
            }
        }

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
