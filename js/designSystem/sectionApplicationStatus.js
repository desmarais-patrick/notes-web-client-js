"use strict";

(function (Notes) {
    Notes.designSystem.setupApplicationStatusInitialExample = function (options) {
        var view = setupApplicationStatusView(options);
        view.render();
    };
    Notes.designSystem.setupApplicationStatusWorkingExample = function (options) {
        var view = setupApplicationStatusView(options);
        view.render();

        var model = options.model;
        var app = model.getApp();
        app.setStatus(Notes.model.app.STATUS_ENUM.WORKING);
    };
    Notes.designSystem.setupApplicationStatusReadyExample = function (options) {
        var view = setupApplicationStatusView(options);
        view.render();
        
        var model = options.model;
        var app = model.getApp();
        app.setStatus(Notes.model.app.STATUS_ENUM.WORKING);
        app.setStatus(Notes.model.app.STATUS_ENUM.READY);
    };

    var setupApplicationStatusView = function (options) {
        var viewModelFactory = options.viewModelFactory;
        var viewModel = viewModelFactory.create("ApplicationStatus");

        var utilities = options.utilities;
        var nodeId = options.nodeId;
        var rootNode = utilities.findDocumentNodeWithId(nodeId);

        var viewFactory = options.viewFactory;
        var view = viewFactory.create("ApplicationStatus", {
            viewModel: viewModel,
            rootNode: rootNode,
            utilities: utilities
        });
        
        return view;
    };
})(Notes);
