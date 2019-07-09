"use strict";

(function (Notes) {
    Notes.view.viewFactory = function (options) {
        var that = {};

        var createApplicationStatusView = options.createApplicationStatusView;

        that.create = function (name, options) {
            var view = null;

            switch (name) {
                case "ApplicationStatus":
                    view = createApplicationStatusView(options);
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
