"use strict";

(function (Notes) {
    Notes.designSystem.setupListItemsSection = function (createAppOptions) {
        var appOptions;
        var exampleRootNode;
        var viewUtilities;

        appOptions = createAppOptions();
        viewUtilities = appOptions.viewUtilities;
        exampleRootNode = viewUtilities.traversal
            .findWithId("listItems-initial-example");
        setupInitialExample(appOptions, exampleRootNode);

        appOptions = createAppOptions();
        viewUtilities = appOptions.viewUtilities;
        exampleRootNode = viewUtilities.traversal
            .findWithId("listItems-hover-example");
        setupHoverExample(appOptions, exampleRootNode);

        appOptions = createAppOptions();
        viewUtilities = appOptions.viewUtilities;
        exampleRootNode = viewUtilities.traversal
            .findWithId("listItems-selected-example");
        setupSelectedExample(appOptions, exampleRootNode);

        appOptions = createAppOptions();
        viewUtilities = appOptions.viewUtilities;
        exampleRootNode = viewUtilities.traversal
            .findWithId("listItems-hide-example");
        setupHideExample(appOptions, exampleRootNode);
    };

    var setupInitialExample = function (appOptions, rootNode) {
        var viewModel = appOptions.viewModelFactory.create("NoteListItem");
        viewModel.initialize();
        var view = appOptions.viewFactory.create("NoteListItem", {
            rootNode: rootNode,
            viewModel: viewModel,
        });
        view.render();

        // Create note that will be displayed in editor.
        appOptions.requestBuilderMock
            .setNextPostResponseAsNoteCreatedWithId(1);
        var note = appOptions.model.createNote(
            "TED talk, Shawn Achor, Happiness");
        var noteClientId = note.getClientId();
        viewModel.setNoteClientId(noteClientId);
    };

    var setupHoverExample = function (appOptions, rootNode) {
        var viewModel = appOptions.viewModelFactory.create("NoteListItem");
        viewModel.initialize();
        var view = appOptions.viewFactory.create("NoteListItem", {
            rootNode: rootNode,
            viewModel: viewModel,
        });
        view.render();

        // Create note that will be displayed in editor.
        appOptions.requestBuilderMock
            .setNextPostResponseAsNoteCreatedWithId(1);
        var note = appOptions.model.createNote(
            "New coffee place to try near Concordia University, " + 
            "next to the Museum of Fine Arts and bus stop for " +
            "\n" + 
            "2100 rue Sherbrooke Ouest\n" + 
            "Montréal, Québec\n" + 
            "\n" + 
            "\n");
        var noteClientId = note.getClientId();
        viewModel.setNoteClientId(noteClientId);

        // Force the hover style.
        var viewUtilities = appOptions.viewUtilities;
        var contentNode = viewUtilities.traversal.findWithCssClass(rootNode, 
            "list-item-content");
        appOptions.viewUtilities.css.addClass(contentNode,
            "list-item-content-hover");
    };

    var setupSelectedExample = function (appOptions, rootNode) {
        var viewModel = appOptions.viewModelFactory.create("NoteListItem");
        viewModel.initialize();
        var view = appOptions.viewFactory.create("NoteListItem", {
            rootNode: rootNode,
            viewModel: viewModel,
        });

        // Force the selection.
        viewModel.setIsSelected(true);

        view.render();

        // Create note that will be displayed in editor.
        appOptions.requestBuilderMock
            .setNextPostResponseAsNoteCreatedWithId(1);
        var note = appOptions.model.createNote(
            "Link to Notes app on Github:\n" + 
            "https://github.com/desmarais-patrick/notes\n");
        var noteClientId = note.getClientId();
        viewModel.setNoteClientId(noteClientId);
    };

    var setupHideExample = function (appOptions, rootNode) {
        var viewModel = appOptions.viewModelFactory.create("NoteListItem");
        viewModel.initialize();
        var view = appOptions.viewFactory.create("NoteListItem", {
            rootNode: rootNode,
            viewModel: viewModel,
        });
        view.render();

        // Create note that will be displayed in editor.
        appOptions.requestBuilderMock
            .setNextPostResponseAsOfflineError()
            .setNextDeleteResponseAsOfflineError();
        var note = appOptions.model.createNote(
            "Don't forget to bring your work laptop for tomorrow 😉! #work" + 
            "\n");
        var noteClientId = note.getClientId();
        viewModel.setNoteClientId(noteClientId);

        // Hook the hide button.
        var viewUtilities = appOptions.viewUtilities;
        var hideButtonNode = viewUtilities.traversal.findWithId(
            "listItems-selected-example-button");
        viewUtilities.text.set(hideButtonNode, "Hide");
        viewUtilities.button.onClick(hideButtonNode, function () {
            viewUtilities.css.toggleClass(rootNode, "list-item-hidden");
            viewUtilities.text.toggleBetween(hideButtonNode, "Hide", "Show");
        });

        // TODO Create buttons to trigger different scenarios on the list item.
        //       - Delete
        //       - Edited text
        //       - Update to new note
        //       - Destroy
        //       - Select, unselect
        
    };
})(Notes);
