"use strict";

(function (Notes) {
    var STATUS_CHECK_INTERVAL_MS = 300;

    Notes.viewModel.listItemViewModel = function (options) {
        var that = {};

        var setInterval = options.setInterval;
        var clearInterval = options.clearInterval;

        var NOTE_STATUS_ENUM = options.NOTE_STATUS_ENUM;

        var currentNote = null;

        var dateViewModel = options.viewModelFactory.create("NoteDate");
        that.getDateViewModel = function () {
            return dateViewModel;
        };

        that.setNote = function (note) {
            currentNote = note;
            dateViewModel.onNoteChanged(note);
        };

        return that;
    };
})(Notes);
