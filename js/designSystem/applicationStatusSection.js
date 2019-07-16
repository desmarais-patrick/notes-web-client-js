"use strict";

(function (Notes) {
    Notes.designSystem.setupApplicationStatusSection = function (
        designSystemOptions) {

        var createAppStatusOptions = function (nodeId) {
            var requestBuilder = designSystemOptions.createRequestBuilderMock();
            var model = designSystemOptions.createModel(requestBuilder);
            var dateUtilities = designSystemOptions.createDateUtilities();
            var viewModelFactory = designSystemOptions.createViewModelFactory(
                model, dateUtilities);
            var viewUtilities = designSystemOptions.createViewUtilities();
            var animations = designSystemOptions.createAnimations(viewUtilities);
            var viewFactory = designSystemOptions.createViewFactory(animations);
            return {
                viewFactory: viewFactory,
                viewModelFactory: viewModelFactory,
                model: model,
                nodeId: nodeId,
                viewUtilities: viewUtilities
            };
        };

        var appStatusInitialOptions = createAppStatusOptions(
            "example-app-status-initial");
        setupApplicationStatusInitialExample(appStatusInitialOptions);

        var appStatusWorkingOptions = createAppStatusOptions(
            "example-app-status-working");
        setupApplicationStatusWorkingExample(appStatusWorkingOptions);
    
        var appStatusReadyOptions = createAppStatusOptions(
            "example-app-status-ready");
        setupApplicationStatusReadyExample(appStatusReadyOptions);
    };

    var setupApplicationStatusInitialExample = function (options) {
        var view = setupApplicationStatusView(options);
        view.render();
    };

    var setupApplicationStatusWorkingExample = function (options) {
        var view = setupApplicationStatusView(options);
        view.render();

        var model = options.model;
        var app = model.getApp();
        app.setStatus(Notes.model.app.STATUS_ENUM.WORKING);
    };

    var setupApplicationStatusReadyExample = function (options) {
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

        var viewUtilities = options.viewUtilities;
        var nodeId = options.nodeId;
        var rootNode = viewUtilities.traversal.findWithId(nodeId);

        var viewFactory = options.viewFactory;
        var view = viewFactory.create("ApplicationStatus", {
            viewModel: viewModel,
            rootNode: rootNode,
            viewUtilities: viewUtilities
        });
        
        return view;
    };
})(Notes);
