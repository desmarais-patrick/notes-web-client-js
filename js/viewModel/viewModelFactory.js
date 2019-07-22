"use strict";

(function (Notes) {
    Notes.viewModel.viewModelFactory = function (options) {
        var that = {};

        var setTimeout = options.setTimeout;
        var clearTimeout = options.clearTimeout;

        var dateUtilities = options.dateUtilities;

        var model = options.model;
        var APP_STATUS_ENUM = options.APP_STATUS_ENUM;
        var NOTE_STATUS_ENUM = options.NOTE_STATUS_ENUM;

        var createAppViewModel = options.createAppViewModel;
        var createApplicationStatusViewModel =
            options.createApplicationStatusViewModel;
        var createEditorViewModel = options.createEditorViewModel;
        var createNoteDateViewModel = options.createNoteDateViewModel;
        var createNoteInputViewModel = options.createNoteInputViewModel;
        var createNoteListItemViewModel = options.createNoteListItemViewModel;
        var createNoteListViewModel = options.createNoteListViewModel;
        var createNoteStatusViewModel = options.createNoteStatusViewModel;

        var viewModelOptions = {
            setTimeout: setTimeout,
            clearTimeout: clearTimeout,
    
            dateUtilities: dateUtilities,
    
            model: model,
            APP_STATUS_ENUM: APP_STATUS_ENUM,
            NOTE_STATUS_ENUM: NOTE_STATUS_ENUM,

            viewModelFactory: that,
        };

        that.create = function (name) {
            switch (name) {
                case "App":
                    return createAppViewModel(viewModelOptions);
                case "ApplicationStatus":
                    return createApplicationStatusViewModel(viewModelOptions);
                case "Editor":
                    return createEditorViewModel(viewModelOptions);
                case "NoteDate":
                    return createNoteDateViewModel(viewModelOptions);
                case "NoteInput":
                    return createNoteInputViewModel(viewModelOptions);
                case "NoteList":
                    return createNoteListViewModel(viewModelOptions);
                case "NoteListItem":
                    return createNoteListItemViewModel(viewModelOptions);
                case "NoteStatus":
                    return createNoteStatusViewModel(viewModelOptions);
                default:
                    throw new Error(
                        "ViewModelFactory: Missing case for view model: " +
                            name);
            }
        };

        return that;
    };
})(Notes);
