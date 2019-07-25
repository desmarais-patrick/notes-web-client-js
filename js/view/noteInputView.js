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

        var saveThrottleTimeoutId = null;

        that.render = function () {
            viewModel.setBeforeNoteChangeListener(onBeforeNoteChanged);
            viewModel.setAfterNoteChangeListener(onAfterNoteChanged);

            viewUtilities.textarea.onValueChange(textareaElement,
                onValueChanged);
        };

        var onBeforeNoteChanged = function () {
            submitPendingUpdates();
        };

        var onAfterNoteChanged = function (newText) {
            // Replace with new text.
            var text = (newText === null) ? "" : newText;
            animations.crossFade(textareaElement, function () {
                viewUtilities.textarea.setValue(textareaElement, text);
                applyStyleForScrollBar();
            });
        };

        var onValueChanged = function () {
            if (saveThrottleTimeoutId !== null) {
                // Pending update already scheduled.
                return;
            }

            saveThrottleTimeoutId = setTimeout(function () {
                saveText();
                saveThrottleTimeoutId = null;
            }, SAVE_THROTTLE_DELAY_MS);
            applyStyleForScrollBar();
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
            viewModel.setBeforeNoteChangeListener(null);
            viewModel.setAfterNoteChangeListener(null);

            submitPendingUpdates();
            viewUtilities.textarea.offValueChange(textareaElement,
                onValueChanged);
        };

        var submitPendingUpdates = function () {
            if (saveThrottleTimeoutId !== null) {
                clearTimeout(saveThrottleTimeoutId);
                saveText();
                saveThrottleTimeoutId = null;
            }
        };

        var saveText = function () {
            var newText = viewUtilities.textarea.getValue(textareaElement);
            viewModel.saveInputText(newText);
        };

        return that;
    };
})(Notes);
