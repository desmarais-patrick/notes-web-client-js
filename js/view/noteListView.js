"use strict";

(function (Notes) {

    // TODO Add to design system.
    Notes.view.noteListView = function(options) {
        var that = {};

        var viewUtilities = options.viewUtilities;

        var rootNode = options.rootNode;
        var viewModel = options.viewModel;

        that.render = function () {
            // TODO Subscribe to listItemAdded.
            // TODO Subscribe to listItemRemoved.
            // TODO Subscribe to listChanged.
        };

        that.destroy = function () {
            // Unsubscribe...
        };
        
        // Handle creating and deleting sub-views based on subscriptions.
        // Handle assigning models to views based on viewModel's.
        // Handle simple animations for addition and removal.

        return that;
    };
})(Notes);
