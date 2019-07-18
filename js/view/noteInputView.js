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
            // Save any throttled updates.
            savePendingUpdates();

            // Display new text.
            var newText = (newNote === null) ? "" : newNote.getText();
            animations.crossFade(textareaElement, function () {
                viewUtilities.textarea.setValue(textareaElement, newText);
                applyStyleForScrollBar();
            });
        };

        var saveThrottleTimeoutId = null;
        var onValueChanged = function () {
            if (saveThrottleTimeoutId !== null) {
                // Pending updated already scheduled.
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

        that.focus = function () {
            textareaElement.focus();
        };

        that.destroy = function () {
            viewModel.offReplaceNote(onNoteReplaced);

            savePendingUpdates();
            viewUtilities.textarea.offValueChange(textareaElement,
                onValueChanged);
        };

        var savePendingUpdates = function () {
            if (saveThrottleTimeoutId !== null) {
                clearTimeout(saveThrottleTimeoutId);
                saveText();
                saveThrottleTimeoutId = null;
            }
        };

        return that;
    };
})(Notes);
