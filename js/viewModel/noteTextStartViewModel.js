"use strict";

(function (Notes) {
    var TEXT_CHECK_INTERVAL_MS = 1000;

    // TODO See if we could reuse logic between this class and NoteLinesCountViewModel.
    Notes.viewModel.noteTextStartViewModel = function(options) {
        var that = {};

        // Member variables.
        var setTimeout = options.setTimeout;
        var clearTimeout = options.clearTimeout;
        var textCheckTimeoutId = null;
        var textChangeEventIterator = null;

        var model = options.model;

        var changeListenerCallback = null;
        var textStart = null;

        // Member functions.
        that.initialize = function () {};

        that.destroy = function () {
            stopListeningForModelEvents();
        };

        that.getText = function () {
            if (textStart === null) {
                return "";
            }

            return textStart;
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

            updateTextStart(newText);
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
                    updateTextStart(event.options.newText);
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

            updateTextStart(lastEvent.options.newText);
        };

        var stopListeningForModelEvents = function () {
            if (textCheckTimeoutId !== null) {
                clearTimeout(textCheckTimeoutId);
            }
            textChangeEventIterator = null;
        };

        var updateTextStart = function (newText) {
            var oldTextStart = textStart;

            if (newText === null) {
                textStart = null;
            } else {
                var newTextStart = findTextStart(newText);
                textStart = newTextStart;
            }

            if (oldTextStart !== textStart &&
                    changeListenerCallback !== null) {

                var text = that.getText();
                changeListenerCallback(text);
            }
        };

        var findTextStart = function (text) {
            var lines = text.split("\n");
            var firstLine = "";
            while (lines.length > 0 && firstLine.length === 0) {
                firstLine = lines.shift();
            }
            return firstLine;
        };

        that.setChangeListener = function (newListenerCallback) {
            changeListenerCallback = newListenerCallback;
        };

        return that;
    };
})(Notes);
