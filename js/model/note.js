"use strict";

(function (Notes) {
    var STATUS_ENUM = {
        FAILED_TO_LOAD: "Failed to load",
        LOADING: "Loading",
        READY: "Ready"
    }; // (!) Hopefully, nobody changes that object. :s

    Notes.model.note = function(options) {
        var that = {};

        var events = options.events;

        // Specifying clientId through options, meant for cloning.
        var clientId = options.clientId || ++Notes.model.note.clientId;

        var id = options.id || null;
        var text = options.text || null;
        var date = options.date || null;
        var time = options.date ? date.getTime() : null;
        var status = options.status || null;

        var changeTextTopic = "change Notes[" + clientId + "].Text";
        var changeDateTopic = "change Notes[" + clientId + "].Date";
        var changeStatusTopic = "change Notes[" + clientId + "].Status";

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
            var newTime = (newDate === null) ? null : newDate.getTime();
            if (newTime !== time) {
                date = (newDate === null) ? null : new Date(newDate);
                time = newTime;
                var eventDate = (newDate === null) ? null : new Date(newDate);
                events.dispatch(changeDateTopic, "new date", 
                    {newDate: eventDate});
            }
        }

        that.getStatus = function () { return status; };
        that.setStatus = function (newStatus) {
            if (isEnumValue(newStatus) === false) {
                throw new Error("Implementation error! " + 
                newStatus + " is not value part of STATUS_ENUM.");
            }

            if (status !== newStatus) {
                status = newStatus;
                events.dispatch(changeStatusTopic, "new status",
                    {newStatus: newStatus});
            }
        }

        var isEnumValue = function (value) {
            var key = Object.keys(STATUS_ENUM).find(function (key, index, array) {
                return (value === array[key]);
            });
            return (key !== null);
        };

        that.compare = function (otherNote) {
            var otherTime = otherNote.getTime();
            if (time < otherTime) {
                return 1; // This is older, so after.
            } else if (time > otherTime) {
                return -1; // This is newer, so before.
            } else if (time === null && otherTime !== null) {
                return 1; // Leave null values at the end.
            } else if (time !== null && otherTime === null) {
                return -1; // Leave null values at the end.
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
    Notes.model.note.STATUS_ENUM = STATUS_ENUM;
    Notes.model.note.clientId = 0;
})(Notes);
