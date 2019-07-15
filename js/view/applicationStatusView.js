"use strict";

(function (Notes) {
    Notes.view.applicationStatusView = function (options) {
        var that = {};

        var viewModel = options.viewModel;
        var rootNode = options.rootNode;
        var viewUtilities = options.viewUtilities;

        var messageNode = viewUtilities.traversal.findWithCssClass(rootNode,
            "app-status-text");
        
        that.render = function () {
            var statusText = viewModel.getText();
            updateStatusText(statusText);

            viewModel.onAppStatusChange(updateStatusText);
        }

        var updateStatusText = function (newText) {
            viewUtilities.text.set(messageNode, newText);
        };
        
        that.destroy = function () {
            viewModel.offAppStatusChange(updateStatusText);
        };

        return that;
    };
})(Notes);