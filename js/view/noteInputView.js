"use strict";

(function (Notes) {
    var TEXTAREA_CSS_CLASS = "editor-input-textarea";

    Notes.view.noteInputView = function (options) {
        var that = {};

        var animations = options.animations;
        var traversal = options.viewUtilities.traversal;

        var rootNode = options.rootNode;
        var viewModel = options.viewModel;

        var textareaElement = traversal.findWithCssClass(rootNode,
            TEXTAREA_CSS_CLASS);

        that.render = function () {
            viewModel.onNoteChange(setInputText);
        };

        var setInputText = function (newNote) {
            var newText = (newNote === null) ? "" : newNote.getText();
            animations.crossFade(textareaElement, function () {
                textareaElement.value = newText;
            });
        };

        that.destroy = function () {
            viewModel.offNoteChange(setInputText);
        };

        return that;
    };
})(Notes);
