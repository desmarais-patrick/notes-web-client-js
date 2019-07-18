"use strict";

(function (Notes) {
    Notes.view.listItemView = function(options) {
        var that = {};

        var viewUtilities = options.viewUtilities;

        var rootNode = options.rootNode;
        var viewModel = options.viewModel;

        // Create the inner div elements to support sub-views.
        // Create the sub views.

        that.render = function () {
            // Display text start.
            // Display date.
            // Display lines count.
            // Unselected by default.
            // Prepare action views for edit and delete.
            // Register to click event.
            // Listen to any changes in the viewModel.
        };

        var onDelete = function () {
            // Bubble up this event for list to remove element with a nice animation.
        };
        var onEdit = function () {
            // Bubble up this event for app to scroll to editor.
        };
        var onSelect = function () {
            // Bubble up this event for list to unselect any other element.
        };

        var onClicked = function () {
            // Toggle between selected and unselected.
        };
        that.select = function () {
            // To help list control what is being selected.
        };
        that.unselect = function () {
            // To help list control what is being selected.
        };

        that.destroy = function () {
            // Stop listening to changes in viewModel.
            // Unregister click.
            // Destroy all sub-views.
            // Remove all elements created.
        };

        return that;
    };
})(Notes);
