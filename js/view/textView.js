"use strict";

(function (Notes) {
    Notes.view.textView = function (options) {
        var that = {};

        var animations = options.animations;

        var rootNode = options.rootNode;
        var viewModel = options.viewModel;

        that.render = function () {
            viewModel.setChangeListener(updateText);
        };

        var updateText = function (newText) {
            animations.crossFadeText(rootNode, newText);
        };
        
        that.destroy = function () {
            viewModel.setChangeListener(null);
        };

        return that;
    };
})(Notes);
