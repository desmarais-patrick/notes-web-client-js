"use strict";

(function (Notes) {
    Notes.view.noteStatusView = function (options) {
        var that = {};

        var animations = options.animations;

        var rootNode = options.rootNode;
        var viewModel = options.viewModel;

        that.render = function () {
            viewModel.onChange(updateStatusText);
        };

        var updateStatusText = function (newStatusText) {
            animations.crossFadeText(rootNode, newStatusText);
        };

        that.destroy = function () {
            viewModel.offChange(updateStatusText);
        };

        return that;
    };
})(Notes);
