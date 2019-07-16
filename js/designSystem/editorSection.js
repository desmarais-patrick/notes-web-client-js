"use strict";

(function (Notes) {
    Notes.designSystem.setupEditorSection = function (designSystemOptions) {    
        var initialExample = setupEditorExample("initial-editor-example",
            designSystemOptions);
        initialExample.view.render();

        var oneSentenceExample = setupEditorExample(
            "editor-example-one-sentence", designSystemOptions);
        oneSentenceExample.view.render();
        oneSentenceExample.requestBuilderMock
            .setNextPostResponseAsNoteCreatedWithId(1);
        oneSentenceExample.model.createNote("TED talk, Shawn Achor, Happiness", 
            function () {
                oneSentenceExample.viewModel.setNote(1);
            });
    };

    var setupEditorExample = function (nodeId, designSystemOptions) {
        var example = {};

        var requestBuilderMock = designSystemOptions.createRequestBuilderMock();
        example.requestBuilderMock = requestBuilderMock;

        var model = designSystemOptions.createModel(requestBuilderMock);
        example.model = model;

        var dateUtilities = designSystemOptions.createDateUtilities();
        var viewModelFactory = designSystemOptions.createViewModelFactory(
            model, dateUtilities);
        var viewModel = viewModelFactory.create("Editor");
        example.viewModel = viewModel;

        var viewUtilities = designSystemOptions.createViewUtilities();
        var exampleRootNode = viewUtilities.traversal.findWithId(nodeId);
        var animations = designSystemOptions.createAnimations(viewUtilities);
        var viewFactory = designSystemOptions.createViewFactory(animations);
        var viewOptions = {
            rootNode: exampleRootNode,
            viewFactory: viewFactory,
            viewModel: viewModel,
            viewUtilities: viewUtilities,
        };
        var view = viewFactory.create("Editor", viewOptions);
        example.view = view;

        return example;
    };
})(Notes);
