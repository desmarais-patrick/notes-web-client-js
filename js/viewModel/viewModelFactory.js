"use strict";

(function (Notes) {
    Notes.viewModel.viewModelFactory = function (options) {
        var that = {};

        var setTimeout = options.setTimeout;
        var clearTimeout = options.clearTimeout;

        var dateUtilities = options.dateUtilities;
        var listUtilities = options.listUtilities;

        var model = options.model;
        var APP_STATUS_ENUM = options.APP_STATUS_ENUM;
        var NOTE_STATUS_ENUM = options.NOTE_STATUS_ENUM;
        
        var viewModelEvents = options.viewModelEvents;

        var createAppViewModel = options.createAppViewModel;
        var createApplicationStatusViewModel =
            options.createApplicationStatusViewModel;
        var createBackToTopViewModel = options.createBackToTopViewModel;
        var createEditorViewModel = options.createEditorViewModel;
        var createNoteDateViewModel = options.createNoteDateViewModel;
        var createNoteInputViewModel = options.createNoteInputViewModel;
        var createNoteLinesCountViewModel =
            options.createNoteLinesCountViewModel;
        var createNoteListItemViewModel = options.createNoteListItemViewModel;
        var createNoteListViewModel = options.createNoteListViewModel;
        var createNoteStatusViewModel = options.createNoteStatusViewModel;
        var createNoteTextStartViewModel = options.createNoteTextStartViewModel;

        var viewModelOptions = {
            setTimeout: setTimeout,
            clearTimeout: clearTimeout,
    
            dateUtilities: dateUtilities,
            listUtilities: listUtilities,
    
            model: model,
            APP_STATUS_ENUM: APP_STATUS_ENUM,
            NOTE_STATUS_ENUM: NOTE_STATUS_ENUM,

            viewModelEvents: viewModelEvents,

            viewModelFactory: that,
        };

        that.create = function (name) {
            switch (name) {
                case "App":
                    return createAppViewModel(viewModelOptions);
                case "ApplicationStatus":
                    return createApplicationStatusViewModel(viewModelOptions);
                case "BackToTop":
                    return createBackToTopViewModel(viewModelOptions);
                case "Editor":
                    return createEditorViewModel(viewModelOptions);
                case "NoteDate":
                    return createNoteDateViewModel(viewModelOptions);
                case "NoteInput":
                    return createNoteInputViewModel(viewModelOptions);
                case "NoteLinesCount":
                    return createNoteLinesCountViewModel(viewModelOptions);
                case "NoteList":
                    return createNoteListViewModel(viewModelOptions);
                case "NoteListItem":
                    return createNoteListItemViewModel(viewModelOptions);
                case "NoteStatus":
                    return createNoteStatusViewModel(viewModelOptions);
                case "NoteTextStart":
                    return createNoteTextStartViewModel(viewModelOptions);
                default:
                    throw new Error(
                        "ViewModelFactory: Missing case for view model: " +
                            name);
            }
        };

        return that;
    };
})(Notes);
