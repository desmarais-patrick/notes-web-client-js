"use strict";

(function (Notes) {
    var TEXT_CHECK_INTERVAL_MS = 1000;

    Notes.viewModel.noteTextStartViewModel = function(options) {
        var that = {};

        var setTimeout = options.setTimeout;
        var clearTimeout = options.clearTimeout;
        var textCheckTimeoutId = null;
        var textChangeEventIterator = null;

        var model = options.model;

        var changeListeners = [];
        var textStart = null;

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
            }

            var newTextStart = findTextStart(newText);
            textStart = newTextStart;

            if (oldTextStart !== textStart) {
                notifyChange();
            }
        };

        var findTextStart = function (text) {
            var index = text.indexOf("\n");
            if (index === -1) {
                return text;
            }

            var textStart = text.substring(0, index);
            if (textStart.length !== 0) {
                return textStart;
            }

            var remainingText = text.substring(index, text.length);
            return findTextStart(remainingText);
        };

        that.onChange = function (newListenerCallback) {
            changeListeners.push(newListenerCallback);
        };

        that.offChange = function (listenerCallback) {
            var index = changeListeners.indexOf(listenerCallback);

            if (index === -1) {
                throw new Error("[NoteTextStartViewModel]" + 
                    " Change listener has never been registered.");
            }

            changeListeners.splice(index, 1);
        };

        var notifyChange = function () {
            var text = that.getText();
            changeListeners.forEach(function (listener) {
                listener(text);
            });
        };

        return that;
    };
})(Notes);
