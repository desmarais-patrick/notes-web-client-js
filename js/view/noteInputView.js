"use strict";

(function (Notes) {
    var TEXTAREA_CSS_CLASS = "editor-input-textarea";
    var SAVE_THROTTLE_DELAY_MS = 2000;

    Notes.view.noteInputView = function (options) {
        var that = {};

        var setTimeout = options.setTimeout;
        var clearTimeout = options.clearTimeout;

        var animations = options.animations;
        var viewUtilities = options.viewUtilities;

        var rootNode = options.rootNode;
        var viewModel = options.viewModel;

        var textareaElement = viewUtilities.traversal.findWithCssClass(
            rootNode, TEXTAREA_CSS_CLASS);

        that.render = function () {
            viewModel.onNoteChange(onNoteChanged);
            viewUtilities.textarea.onValueChange(textareaElement,
                onValueChanged);
        };

        var onNoteChanged = function (newNote) {
            var newText = (newNote === null) ? "" : newNote.getText();
            animations.crossFade(textareaElement, function () {
                viewUtilities.textarea.setValue(textareaElement, newText);
            });
        };

        var saveThrottleTimeoutId = null;
        var onValueChanged = function () {
            if (saveThrottleTimeoutId !== null) {
                // Pending save scheduled already.
                return;
            }

            saveThrottleTimeoutId = setTimeout(function () {
                saveText();
                saveThrottleTimeoutId = null;
            }, SAVE_THROTTLE_DELAY_MS);
        };
        var saveText = function () {
            var newText = viewUtilities.textarea.getValue(textareaElement);
            viewModel.saveText(newText);
        };

        that.destroy = function () {
            viewModel.offNoteChange(onNoteChanged);

            if (saveThrottleTimeoutId !== null) {
                clearTimeout(saveThrottleTimeoutId);
                saveText();
            }
            viewUtilities.textarea.offValueChange(textareaElement,
                onValueChanged);
        };

        return that;
    };
})(Notes);
