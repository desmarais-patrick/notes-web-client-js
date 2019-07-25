"use strict";

(function (Notes) {
    Notes.view.noteListItemView = function(options) {
        var that = {};

        // Member variables.
        var viewUtilities = options.viewUtilities;
        var viewFactory = options.viewFactory;

        var rootNode = options.rootNode;
        var viewModel = options.viewModel;

        var contentNode = null;
        var textStartView = null;
        var dateView = null;
        var linesCountView = null;

        var editView = null;
        var deleteView = null;
        var actionViewsInitialized = false;

        // Member functions.
        that.render = function () {
            initializeContentViewsAndRender();

            viewModel.setSelectedListener(onIsSelectedChange);
            var isSelected = viewModel.isSelected();
            onIsSelectedChange(isSelected);

            viewUtilities.div.onClick(contentNode, onContentClick);
        };

        var initializeContentViewsAndRender = function () {
            contentNode = viewUtilities.html.createElement("div", {
                cssClass: "list-item-content"
            });
            var textStartNode = viewUtilities.html.createElement("div", {
                cssClass: "list-item-content-starting-text"
            });
            var dateNode = viewUtilities.html.createElement("div", {
                cssClass: "list-item-content-date"
            });
            var linesCountNode = viewUtilities.html.createElement("div", {
                cssClass: "list-item-content-lines-count"
            });
            viewUtilities.html.appendMany(contentNode,
                [textStartNode, dateNode, linesCountNode]);
    
            // Attach nodes to root.
            viewUtilities.html.append(rootNode, contentNode);
    
            // Initialize sub views.
            var textStartViewModel = viewModel.getTextStartViewModel();
            textStartView = viewFactory.create("Text", {
                rootNode: textStartNode,
                viewModel: textStartViewModel
            });
    
            var dateViewModel = viewModel.getDateViewModel();
            dateView = viewFactory.create("Text", {
                rootNode: dateNode,
                viewModel: dateViewModel
            });
    
            var linesCountViewModel = viewModel.getLinesCountViewModel();
            linesCountView = viewFactory.create("Text", {
                rootNode: linesCountNode,
                viewModel: linesCountViewModel
            });
            
            textStartView.render();
            dateView.render();
            linesCountView.render();
        };

        var onContentClick = function () {
            viewModel.toggleSelected();
        };

        var onIsSelectedChange = function (isSelected) {
            if (isSelected) {
                if (actionViewsInitialized === false) {
                    initializeAndRenderActionViews();
                }
    
                viewUtilities.css.addClass(rootNode, "list-item-selected");
            } else {
                viewUtilities.css.removeClass(rootNode, "list-item-selected");
            }
        };

        var initializeAndRenderActionViews = function () {
            var actionsNode = viewUtilities.html.createElement("div", {
                cssClass: "list-item-actions"
            });
            var editActionNode = viewUtilities.html.createElement("div", {
                cssClass: "list-item-action list-item-edit-action"
            });
            var editActionButtonNode = viewUtilities.html.createElement("button", {
                cssClass: "button-default",
                type: "button"
            });
            var deleteActionNode = viewUtilities.html.createElement("div", {
                cssClass: "list-item-action list-item-delete-action",
            });
            var deleteActionButtonNode = viewUtilities.html.createElement("button", {
                cssClass: "button-default",
                type: "button"
            });
            viewUtilities.html.appendMany(actionsNode,
                [editActionNode, deleteActionNode]);
            viewUtilities.html.append(editActionNode, editActionButtonNode);
            viewUtilities.html.append(deleteActionNode, deleteActionButtonNode);
            viewUtilities.html.append(rootNode, actionsNode);

            editView = viewFactory.create("EditNoteAction", {
                rootNode: editActionButtonNode,
                viewModel: viewModel
            });

            deleteView = viewFactory.create("DeleteNoteAction", {
                rootNode: deleteActionButtonNode,
                viewModel: viewModel
            });

            editView.render();
            deleteView.render();

            actionViewsInitialized = true;
        };

        // TODO Review use case for show/hide.
        that.show = function () {
            viewUtilities.css.removeClass(rootNode, "list-item-hidden");
        };
        that.hide = function () {
            viewUtilities.css.addClass(rootNode, "list-item-hidden");
        };

        // TODO Complete destroy method after all TODOs are complete in this class.
        that.destroy = function () {
            // Stop listening to changes in viewModel.
            viewModel.setSelectedListener(null);

            // Stop listening to HTML events.
            viewUtilities.div.offClick(contentNode, toggleSelection);

            // Destroy all sub-views.
            textStartView.destroy();
            dateView.destroy();
            linesCountView.destroy();
            if (editView !== null) {
                editView.destroy();
            }
            if (deleteView !== null) {
                deleteView.destroy();
            }

            // Remove all elements created.
            viewUtilities.html.clearChildrenNodes(rootNode);
        };

        return that;
    };
})(Notes);
