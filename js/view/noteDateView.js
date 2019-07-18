"use strict";

(function (Notes) {
    Notes.view.noteDateView = function (options) {
        var that = {};

        var animations = options.animations;

        var rootNode = options.rootNode;
        var viewModel = options.viewModel;

        that.render = function () {
            viewModel.onChange(updateDateText);
        };

        var updateDateText = function (newDateText) {
            animations.crossFadeText(rootNode, newDateText);
        };

        that.destroy = function () {
            viewModel.offChange(updateDateText);
        };

        return that;
    };
})(Notes);
