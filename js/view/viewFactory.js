"use strict";

(function (Notes) {
    Notes.view.viewFactory = function (options) {
        var that = {};

        var createApplicationStatusView = options.createApplicationStatusView;
        var createNoteDateView = options.createNoteDateView;

        that.create = function (name, options) {
            var view = null;

            switch (name) {
                case "ApplicationStatus":
                    view = createApplicationStatusView(options);
                    break;
                case "NoteDate":
                    view = createNoteDateView(options);
                    break;
                default:
                    throw new Error("ViewFactory: Missing case for view: " +
                        name);
            }

            return view;
        };

        return that;
    };
})(Notes);
