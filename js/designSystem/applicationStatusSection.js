"use strict";

(function (Notes) {
    Notes.designSystem.setupApplicationStatusSection = function (
        createAppOptions) {

        var appOptions;
        var exampleRootNode;

        appOptions = createAppOptions();
        exampleRootNode = appOptions.viewUtilities.traversal
            .findWithId("example-app-status-initial");
        setupInitialExample(appOptions, exampleRootNode);

        appOptions = createAppOptions();
        exampleRootNode = appOptions.viewUtilities.traversal
            .findWithId("example-app-status-working");
        setupWorkingExample(appOptions, exampleRootNode);

        appOptions = createAppOptions();
        exampleRootNode = appOptions.viewUtilities.traversal
            .findWithId("example-app-status-ready");
        setupReadyExample(appOptions, exampleRootNode);
    };

    var setupInitialExample = function (appOptions, rootNode) {
        var viewModel = appOptions.viewModelFactory.create("ApplicationStatus");
        var view = appOptions.viewFactory.create("ApplicationStatus", {
            viewModel: viewModel,
            rootNode: rootNode,
        });
        view.render();

        // Leave initial.
    };

    var setupWorkingExample = function (appOptions, rootNode) {
        var viewModel = appOptions.viewModelFactory.create("ApplicationStatus");
        viewModel.initialize();
        var view = appOptions.viewFactory.create("ApplicationStatus", {
            viewModel: viewModel,
            rootNode: rootNode,
        });
        view.render();

        // Update application status to: working.
        var model = appOptions.model;
        var app = model.getApp();
        app.setStatus(Notes.model.app.STATUS_ENUM.WORKING);
    };

    var setupReadyExample = function (appOptions, rootNode) {
        var viewModel = appOptions.viewModelFactory.create("ApplicationStatus");
        viewModel.initialize();
        var view = appOptions.viewFactory.create("ApplicationStatus", {
            viewModel: viewModel,
            rootNode: rootNode,
        });
        view.render();
        
        // Update application status to: ready.
        var model = appOptions.model;
        var app = model.getApp();
        app.setStatus(Notes.model.app.STATUS_ENUM.WORKING);
        app.setStatus(Notes.model.app.STATUS_ENUM.READY);
    };
})(Notes);
