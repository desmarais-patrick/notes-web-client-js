"use strict";

(function (Notes) {

    Notes.view.noteListView = function(options) {
        var that = {};

        var viewUtilities = options.viewUtilities;

        var rootNode = options.rootNode;
        var viewModel = options.viewModel;

        that.render = function () {
            // Create HTML nodes.
            // Render initial items.

            // TODO Subscribe to listItemAdded.
            // TODO Subscribe to listItemRemoved.
            // TODO Subscribe to listChanged.
        };

        var createHtmlNodes = function () {
            // Title: "Notes"
            // Items: NoteListItemView[]
            // Handle hide or display empty message.
            // Load more button.
        };

        that.destroy = function () {
            // ...undo render()
        };

        var removeHtmlNodes = function () {
            // ...undo createHtmlNodes()
        };
        
        // Handle creating and deleting sub-views based on subscriptions.
        // Handle assigning models to views based on viewModel's.
        // Handle simple animations for addition and removal.

        return that;
    };
})(Notes);
