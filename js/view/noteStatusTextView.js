"use strict";

(function (Notes) {
    Notes.view.noteStatusTextView = function (options) {
        var that = {};

        var animations = options.animations;

        var rootNode = options.rootNode;
        var viewModel = options.viewModel;

        that.render = function () {
            viewModel.onChange(updateStatusText);
        };

        var updateStatusText = function (newStatus) {
            var newStatusText = newStatus.text;
            animations.crossFadeText(rootNode, newStatusText);
        };

        that.destroy = function () {
            viewModel.offChange(updateStatusText);
        };

        return that;
    };
})(Notes);
