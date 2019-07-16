"use strict";

(function (Notes) {
    Notes.designSystem.setupEditorSection = function (createAppOptions) {
        var appOptions;
        var exampleRootNode;

        appOptions = createAppOptions();
        exampleRootNode = appOptions.viewUtilities.traversal
            .findWithId("initial-editor-example");
        setupInitialExample(appOptions, exampleRootNode);

        appOptions = createAppOptions();
        exampleRootNode = appOptions.viewUtilities.traversal
            .findWithId("editor-example-one-sentence");
        setupOneSentenceExample(appOptions, exampleRootNode);

        appOptions = createAppOptions();
        exampleRootNode = appOptions.viewUtilities.traversal
            .findWithId("editor-example-many-sentences");
        setupManySentencesExample(appOptions, exampleRootNode);
    };

    var setupInitialExample = function (appOptions, exampleRootNode) {
        var viewModel = appOptions.viewModelFactory.create("Editor");
        var view = appOptions.viewFactory.create("Editor", {
            rootNode: exampleRootNode,
            viewModel: viewModel
        });

        view.render();

        // Leave empty.
    };

    var setupOneSentenceExample = function (appOptions, exampleRootNode) {
        var viewModel = appOptions.viewModelFactory.create("Editor");
        var view = appOptions.viewFactory.create("Editor", {
            rootNode: exampleRootNode,
            viewModel: viewModel
        });

        view.render();

        // Create note that will be displayed in editor.
        appOptions.requestBuilderMock
            .setNextPostResponseAsNoteCreatedWithId(1);
        var note = appOptions.model.createNote(
            "TED talk, Shawn Achor, Happiness");
        var noteClientId = note.getClientId();
        viewModel.setNote(noteClientId);
    };

    var setupManySentencesExample = function (appOptions, exampleRootNode) {
        var viewModel = appOptions.viewModelFactory.create("Editor");
        var view = appOptions.viewFactory.create("Editor", {
            rootNode: exampleRootNode,
            viewModel: viewModel
        });

        view.render();

        // Create note that will be displayed in editor.
        appOptions.requestBuilderMock
            .setNextPostResponseAsOfflineError();
        var note = appOptions.model.createNote(
            "Fit for Life\n" +
            "By Harvey Diamond\n" +
            "\n" +
            "To understand health, understand cancer.\n" +
            "\n" +
            "The different stages of disease:\n" +
            "   * Enervation (less energy)\n" +
            "   * Toxemia (discomfort, even less energy)\n" +
            "   * Irritation (urgent elimination)\n" +
            "   * Inflammation (pain)\n" +
            "   * Ulceration (cells destroyed)\n" +
            "   * Induration (hard tissue bags)\n" +
            "   * Cancer (cells go crazy)\n" +
            "\n" +
            "\n" +
            "Pills the answer? Prevention? Recognize signs?\n" +
            "\n");
        var noteClientId = note.getClientId();
        viewModel.setNote(noteClientId);
    };
})(Notes);
