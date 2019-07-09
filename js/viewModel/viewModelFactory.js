"use strict";

(function (Notes) {
    Notes.viewModel.viewModelFactory = function (options) {
        var that = {};

        var setInterval = options.setInterval;
        var clearInterval = options.clearInterval;

        var model = options.model;
        var APP_STATUS_ENUM = options.APP_STATUS_ENUM;

        var createApplicationStatusViewModel =
            options.createApplicationStatusViewModel;

        that.create = function (name) {
            var viewModelOptions = null;
            var viewModel = null;

            switch (name) {
                case "ApplicationStatus":
                    viewModelOptions = {
                        setInterval: setInterval,
                        clearInterval: clearInterval,
                        model: model,
                        APP_STATUS_ENUM: APP_STATUS_ENUM
                    };
                    viewModel = createApplicationStatusViewModel(
                        viewModelOptions);
                    break;
                default:
                    throw new Error(
                        "ViewModelFactory: Missing case for view model: " +
                            name);
                    break;
            }

            return viewModel;
        };

        return that;
    };
})(Notes);
