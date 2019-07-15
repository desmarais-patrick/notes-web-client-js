"use strict";

(function (Notes) {
    Notes.designSystem.setupEditorSection = function (designSystemOptions) {    
        var model = designSystemOptions.createModel();
        var dateUtilities = designSystemOptions.createDateUtilities();
        var viewModelFactory = designSystemOptions.createViewModelFactory(
            model, dateUtilities);
        var viewModel = viewModelFactory.create("Editor");

        var viewUtilities = designSystemOptions.createViewUtilities();
        var exampleRootNode = viewUtilities.traversal.findWithId(
            "initial-editor-example");
        var viewFactory = designSystemOptions.createViewFactory();
        var viewOptions = {
            rootNode: exampleRootNode,
            viewFactory: viewFactory,
            viewModel: viewModel,
            viewUtilities: viewUtilities,
        };
        var view = viewFactory.create("Editor",
            viewOptions);
        view.render();
    };
})(Notes);
