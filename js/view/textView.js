"use strict";

(function (Notes) {
    Notes.view.textView = function (options) {
        var that = {};

        var animations = options.animations;

        var rootNode = options.rootNode;
        var viewModel = options.viewModel;

        var text = null;

        that.render = function () {
            var text = viewModel.getText();
            updateText(text);

            viewModel.setChangeListener(updateText);
        };

        var updateText = function (newText) {
            if (newText !== text) {
                animations.crossFadeText(rootNode, newText);
                text = newText;
            }
        };
        
        that.destroy = function () {
            viewModel.setChangeListener(null);
        };

        return that;
    };
})(Notes);
