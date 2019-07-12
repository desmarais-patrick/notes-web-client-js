"use strict";

(function (Notes) {
    Notes.view.applicationStatusView = function (options) {
        var that = {};

        var viewModel = options.viewModel;
        var rootNode = options.rootNode;
        var utils = options.utilities;

        var messageNode = utils.findChildNodeWithCssClass(rootNode,
            "app-status-text");
        
        that.render = function () {
            messageNode.textContent = viewModel.getText();
        }

        viewModel.onAppStatusChange(that.render);
        
        return that;
    };
})(Notes);