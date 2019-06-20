"use strict";

(function (Notes) {
    Notes.model.cache = function (options) {
        var that = {};

        that.app = options.app;
        that.notesById = {};
        that.noteList = options.noteList;

        return that;
    };
})(Notes);
