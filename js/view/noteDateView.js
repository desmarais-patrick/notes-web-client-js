"use strict";

(function (Notes) {
    Notes.view.noteDateView = function (options) {
        var that = {};

        var rootNode = options.rootNode;
        var viewModel = options.viewModel;

        that.render = function () {
            viewModel.onDateChange(updateDateText);
        };

        var updateDateText = function (newDateText) {
            rootNode.textContent = newDateText;
        };

        that.destroy = function () {
            viewModel.offDateChange(updateDateText);
        };

        return that;
    };
})(Notes);
