"use strict";

(function (Notes) {
    Notes.view.applicationStatusView = function (options) {
        var that = {};

        var viewModel = options.viewModel;
        var rootNode = options.rootNode;
        var viewUtilities = options.viewUtilities;

        var messageNode = viewUtilities.findChildNodeWithCssClass(rootNode,
            "app-status-text");
        
        that.render = function () {
            messageNode.textContent = viewModel.getText();
        }
        viewModel.onAppStatusChange(that.render);
        
        that.destroy = function () {
            viewModel.offAppStatusChange(that.render);
        };

        return that;
    };
})(Notes);