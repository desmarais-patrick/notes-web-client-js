"use strict";

(function (Notes) {
    Notes.viewModel.viewModelFactory = function (options) {
        var that = {};

        var setInterval = options.setInterval;
        var clearInterval = options.clearInterval;

        var dateUtilities = options.dateUtilities;

        var model = options.model;
        var APP_STATUS_ENUM = options.APP_STATUS_ENUM;
        var NOTE_STATUS_ENUM = options.NOTE_STATUS_ENUM;

        var createApplicationStatusViewModel =
            options.createApplicationStatusViewModel;
        var createEditorViewModel = options.createEditorViewModel;
        var createListItemViewModel = options.createListItemViewModel;
        var createNoteDateViewModel = options.createNoteDateViewModel;
        var createNoteInputViewModel = options.createNoteInputViewModel;
        var createNoteStatusViewModel = options.createNoteStatusViewModel;

        var viewModelOptions = {
            setInterval: setInterval,
            clearInterval: clearInterval,
    
            dateUtilities: dateUtilities,
    
            model: model,
            APP_STATUS_ENUM: APP_STATUS_ENUM,
            NOTE_STATUS_ENUM: NOTE_STATUS_ENUM,

            viewModelFactory: that,
        };

        that.create = function (name) {
            switch (name) {
                case "ApplicationStatus":
                    return createApplicationStatusViewModel(viewModelOptions);
                case "Editor":
                    return createEditorViewModel(viewModelOptions);
                case "ListItem":
                    return createListItemViewModel(viewModelOptions);
                case "NoteDate":
                    return createNoteDateViewModel(viewModelOptions);
                case "NoteInput":
                    return createNoteInputViewModel(viewModelOptions);
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
