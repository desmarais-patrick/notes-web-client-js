"use strict";

(function (Notes) {
    Notes.designSystem.setupListSection = function (createAppOptions) {
        var appOptions;
        var exampleRootNode;
        var viewUtilities;

        appOptions = createAppOptions();
        viewUtilities = appOptions.viewUtilities;
        exampleRootNode = viewUtilities.traversal
            .findWithId("list-empty-example");
        setupEmptyExample(appOptions, exampleRootNode);

        appOptions = createAppOptions();
        viewUtilities = appOptions.viewUtilities;
        exampleRootNode = viewUtilities.traversal
            .findWithId("list-oneItem-example");
        setupOneItemExample(appOptions, exampleRootNode);

        appOptions = createAppOptions();
        viewUtilities = appOptions.viewUtilities;
        exampleRootNode = viewUtilities.traversal
            .findWithId("list-manyItems-example");
        setupManyItemsExample(appOptions, exampleRootNode);
    };

    var setupEmptyExample = function (appOptions, rootNode) {
        var viewModel = appOptions.viewModelFactory.create("NoteList");
        viewModel.initialize();
        var view = appOptions.viewFactory.create("NoteList", {
            rootNode: rootNode,
            viewModel: viewModel,
        });
        view.render();

        var viewUtilities = appOptions.viewUtilities;

        var noteIdCounter = 1;
        var addNewNote = function () {
            appOptions.requestBuilderMock
                .setNextPostResponseAsNoteCreatedWithId(noteIdCounter);
            appOptions.model.createNote("A new note " + noteIdCounter);
            noteIdCounter++;
        };
        var deleteRandomNote = function () {
            var notes = appOptions.model.getNotes();
            var notesList = notes.getList();

            var notesListLength = notesList.length;
            if (notesListLength === 0) {
                return;
            }

            var randomIndex = generateRandom(notesListLength);
            var note = notesList[randomIndex];
            appOptions.model.deleteNote(note);
        };

        // Setup GET /notes for load more notes button.
        appOptions.requestBuilderMock
            .setNextGetResponseAsOfflineError();

        // Add new note button.
        var createNewButton = viewUtilities.traversal.findWithId(
            "list-empty-example-button-create-new");
        var noteIdCounter = 1;
        viewUtilities.button.onClick(createNewButton, addNewNote);

        // Setup delete on each list item.
        appOptions.requestBuilderMock
            .setNextDeleteResponseAsOfflineError();

        // Add/remove note button.
        var updateManyButton = viewUtilities.traversal.findWithId(
            "list-empty-example-button-update-many");
        viewUtilities.button.onClick(updateManyButton, function () {
            deleteRandomNote();
            addNewNote();
        });

        // Remove list button.
        var removeListButton = viewUtilities.traversal.findWithId(
            "list-empty-example-button-remove-list");
        viewUtilities.button.onClick(removeListButton, function () {
            view.destroy();
            viewModel.destroy();

            viewUtilities.button.disable(createNewButton);
            viewUtilities.button.disable(updateManyButton);
            viewUtilities.button.disable(removeListButton);
        });
    };

    var generateRandom = function (max) {
        var randomLong = Math.random() * max;
        return Math.floor(randomLong);
    };

    var setupOneItemExample = function (appOptions, rootNode) {
        var viewModel = appOptions.viewModelFactory.create("NoteList");
        viewModel.initialize();
        var view = appOptions.viewFactory.create("NoteList", {
            rootNode: rootNode,
            viewModel: viewModel,
        });
        view.render();

        // Create note that will be displayed in editor.
        appOptions.requestBuilderMock
            .setNextPostResponseAsNoteCreatedWithId(1);
        appOptions.model.createNote(
            "New coffee place to try near Concordia University, " + 
            "next to the Museum of Fine Arts and bus stop for " +
            "\n" + 
            "2100 rue Sherbrooke Ouest\n" + 
            "Montréal, Québec\n" + 
            "\n" + 
            "\n");
    };

    var setupManyItemsExample = function (appOptions, rootNode) {
        var viewModel = appOptions.viewModelFactory.create("NoteList");
        viewModel.initialize();
        var view = appOptions.viewFactory.create("NoteList", {
            rootNode: rootNode,
            viewModel: viewModel,
        });
        view.render();

        // Create note that will be displayed in editor.
        appOptions.requestBuilderMock
            .setNextPostResponseAsNoteCreatedWithId(1);
        appOptions.model.createNote(
            "New coffee place to try near Concordia University, " + 
            "next to the Museum of Fine Arts and bus stop for " +
            "\n" + 
            "2100 rue Sherbrooke Ouest\n" + 
            "Montréal, Québec\n" + 
            "\n" + 
            "\n");
        appOptions.model.createNote(
            "Link to Notes app on Github:\n" + 
            "https://github.com/desmarais-patrick/notes\n");
        appOptions.model.createNote(
            "Don't forget to bring your work laptop for tomorrow 😉! #work" + 
            "\n");
    };

    // TODO Create buttons to trigger different scenarios on list.
    //       - Delete
    //       - Network unavailable
    //       - Sync multiple items
    //       - Destroy
    //       - Select, unselect and go to editor.

})(Notes);
