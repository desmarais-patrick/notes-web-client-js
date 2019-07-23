"use strict";

(function (Notes) {
    Notes.view.noteListItemView = function(options) {
        var that = {};

        var viewUtilities = options.viewUtilities;
        var viewFactory = options.viewFactory;

        var rootNode = options.rootNode;
        var viewModel = options.viewModel;

        var actionsInitialized = false;


        var clearRootNode = function () {
            viewUtilities.html.clearChildrenNodes(rootNode);
        };
        clearRootNode();

        // Content nodes.
        var contentNode = viewUtilities.html.createElement("div", {
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
        var textStartView = viewFactory.create("Text", {
            rootNode: textStartNode,
            viewModel: textStartViewModel
        });

        var dateViewModel = viewModel.getDateViewModel();
        var dateView = viewFactory.create("Text", {
            rootNode: dateNode,
            viewModel: dateViewModel
        });

        var linesCountViewModel = viewModel.getLinesCountViewModel();
        var linesCountView = viewFactory.create("Text", {
            rootNode: linesCountNode,
            viewModel: linesCountViewModel
        });

        var editView = null;
        var deleteView = null;

        that.render = function () {
            textStartView.render();
            dateView.render();
            linesCountView.render();

            applySelection();
            viewUtilities.div.onClick(contentNode, toggleSelection);
        };

        var applySelection = function () {
            var isSelected = viewModel.isSelected();
            if (isSelected) {
                that.select()
            } else {
                that.unselect();
            }
        };

        var toggleSelection = function () {
            var isSelected = viewModel.isSelected();
            if (isSelected) {
                that.unselect();
            } else {
                that.select();
            }
        };

        that.select = function () {
            initActions();

            viewUtilities.css.addClass(rootNode, "list-item-selected");
            viewModel.setIsSelected(true);
        };
        that.unselect = function () {
            viewUtilities.css.removeClass(rootNode, "list-item-selected");
            viewModel.setIsSelected(false);
        };

        var initActions = function () {
            if (actionsInitialized) {
                return;
            }

            actionsInitialized = true;

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
        };

        that.show = function () {
            viewUtilities.css.removeClass(rootNode, "list-item-hidden");
        };
        that.hide = function () {
            viewUtilities.css.addClass(rootNode, "list-item-hidden");
        };

        that.destroy = function () {
            // Stop listening to changes in viewModel.

            // Stop listening to HTML events.
            viewUtilities.div.offClick(rootNode, toggleSelection);

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
            clearRootNode();
        };

        return that;
    };
})(Notes);
