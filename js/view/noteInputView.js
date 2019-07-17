"use strict";

(function (Notes) {
    var INPUT_OVERFLOWS_CSS_CLASS = "input-overflows";
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
            viewModel.onReplaceNote(onNoteReplaced);
            viewUtilities.textarea.onValueChange(textareaElement,
                onValueChanged);
        };

        var onNoteReplaced = function (newNote) {
            var newText = (newNote === null) ? "" : newNote.getText();
            animations.crossFade(textareaElement, function () {
                viewUtilities.textarea.setValue(textareaElement, newText);
                applyStyleForScrollBar();
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
            applyStyleForScrollBar();
        };
        var saveText = function () {
            var newText = viewUtilities.textarea.getValue(textareaElement);
            viewModel.saveText(newText);
        };

        var applyStyleForScrollBar = function () {
            if (viewUtilities.textarea.hasScrollBar(textareaElement)) {
                viewUtilities.css.addClassOnce(textareaElement,
                    INPUT_OVERFLOWS_CSS_CLASS);
            } else {
                viewUtilities.css.removeClass(textareaElement,
                    INPUT_OVERFLOWS_CSS_CLASS);
            }
        };

        that.destroy = function () {
            viewModel.offReplaceNote(onNoteReplaced);

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
