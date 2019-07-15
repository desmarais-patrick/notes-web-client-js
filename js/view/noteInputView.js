"use strict";

(function (Notes) {
    Notes.view.noteInputView = function (options) {
        var that = {};

        var rootNode = options.rootNode;
        var viewModel = options.viewModel;

        // Listen to any note id changes, since this is view driving texts.
        // When note id changes, empty text input with new text (empty or not).

        // TODO How do you know if note's text is latest, 
        //      or what's in this view.

        that.render = function () {
            // onchange (or oninput) update model
            // add throttle to save every 5 or 10 seconds
        };

        that.destroy = function () {
            // offchange (or offinput)
        };

        return that;
    };
})(Notes);
