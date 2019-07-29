"use strict";

(function (Notes) {
    var TEXT_CHECK_INTERVAL_MS = 1000;

    Notes.viewModel.noteLinesCountViewModel = function(options) {
        var that = {};

        // Member variables.
        var setTimeout = options.setTimeout;
        var clearTimeout = options.clearTimeout;
        var textCheckTimeoutId = null;
        var textChangeEventIterator = null;

        var model = options.model;

        var linesCount = null;
        var changeListenerCallback = null;

        // Member functions.
        that.initialize = function () {};

        that.destroy = function () {
            stopListeningForModelEvents();
        };

        that.getText = function () {
            if (linesCount === null) {
                return "";
            }

            if (linesCount < 2) {
                return "";
            }

            if (linesCount < 3) {
                return "(1 more line)";
            }

            return "(" + (linesCount - 1) + " more lines)";
        };

        that.setNoteClientId = function (newNoteClientId) {
            stopListeningForModelEvents();

            var newText;

            if (newNoteClientId === null) {
                newText = null;
            } else {
                startListeningForModelEvents(newNoteClientId);
                fastForwardModelEvents();

                var newNote = model.getNoteByClientId(newNoteClientId);
                newText = newNote.getText();
            }

            updateLinesCount(newText);
        };

        var startListeningForModelEvents = function (clientId) {
            var eventName = "change Notes[" + clientId + "].Text";
            textChangeEventIterator = model.listen(eventName);
            listenToModelEvents(eventName);
        };
        
        var listenToModelEvents = function (eventName) {
            textCheckTimeoutId = setTimeout(function () {
                if (textChangeEventIterator.hasNext()) {
                    var event = textChangeEventIterator.next();
                    updateLinesCount(event.options.newText);
                }
                listenToModelEvents(eventName);
            }, TEXT_CHECK_INTERVAL_MS);
        };

        var fastForwardModelEvents = function () {
            var lastEvent = null;
            while (textChangeEventIterator.hasNext()) {
                lastEvent = textChangeEventIterator.next();
            }

            if (lastEvent === null) {
                return;
            }

            updateLinesCount(lastEvent.options.newText);
        };

        var stopListeningForModelEvents = function () {
            if (textCheckTimeoutId !== null) {
                clearTimeout(textCheckTimeoutId);
            }
            textChangeEventIterator = null;
        };

        var updateLinesCount = function (newText) {
            var oldLinesCount = linesCount;

            if (newText === null) {
                linesCount = 0;
            } else {
                var lines = newText.split("\n");
                linesCount = lines.length;
            }

            if (oldLinesCount !== linesCount &&
                    changeListenerCallback !== null) {

                var text = that.getText();
                changeListenerCallback(text);
            }
        };

        that.setChangeListener = function (newListenerCallback) {
            changeListenerCallback = newListenerCallback;
        };

        return that;
    };
})(Notes);
