"use strict";

(function (Notes) {
    Notes.view.applicationStatusView = function (options) {
        var that = {};

        var animations = options.animations;
        var viewModel = options.viewModel;
        var rootNode = options.rootNode;
        var viewUtilities = options.viewUtilities;

        var messageNode = viewUtilities.traversal.findWithCssClass(rootNode,
            "app-status-text");
        
        that.render = function () {
            var statusText = viewModel.getText();
            updateStatusText(statusText);

            viewModel.setAppStatusChangeListener(updateStatusText);
        }

        var updateStatusText = function (newText) {
            animations.crossFadeText(messageNode, newText);
        };
        
        that.destroy = function () {};

        return that;
    };
})(Notes);