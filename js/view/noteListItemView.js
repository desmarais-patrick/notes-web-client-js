"use strict";

(function (Notes) {
    Notes.view.noteListItemView = function(options) {
        var that = {};

        var viewUtilities = options.viewUtilities;
        var viewFactory = options.viewFactory;

        var rootNode = options.rootNode;
        var viewModel = options.viewModel;

        var editRootNode = viewUtilities.traversal.findWithCssSelector(
            rootNode, "list-item-edit-action button");
        var editView = viewFactory.create("EditNoteAction", {
            rootNode: editRootNode,
            viewModel: viewModel
        });

        var deleteRootNode = viewUtilities.traversal.findWithCssSelector(
            rootNode, "list-item-delete-action button");
        var deleteView = viewFactory.create("DeleteNoteAction", {
            rootNode: deleteRootNode,
            viewModel: viewModel
        });

        // Create the inner div elements to support sub-views.
        // Create the sub views.

        that.render = function () {
            editView.render();
            deleteView.render();
            // Display text start.
            // Display date.
            // Display lines count.
            // Unselected by default.
            // Prepare action views for edit and delete.
            // Register to click event.
            // Listen to any changes in the viewModel.
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
            editView.destroy();
            deleteView.destroy();
            // Stop listening to changes in viewModel.
            // Unregister click.
            // Destroy all sub-views.
            // Remove all elements created.
        };

        return that;
    };
})(Notes);
