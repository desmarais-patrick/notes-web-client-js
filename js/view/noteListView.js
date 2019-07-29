"use strict";

(function (Notes) {
    var EMPTY_CSS_CLASS = "note-list-content-empty";

    Notes.view.noteListView = function(options) {
        var that = {};

        var viewUtilities = options.viewUtilities;

        var rootNode = options.rootNode;
        var viewModel = options.viewModel;

        var contentNode = null;
        var itemViewsAndNodes = [];

        that.render = function () {
            createHtmlNodes();
            renderItems();

            // TODO Subscribe to listItemAdded.
            // TODO Subscribe to listItemRemoved.
            // TODO Subscribe to listChanged.
        };

        var createHtmlNodes = function () {
            var title = viewUtilities.html.createElement("h2", {
                cssClass: "note-list-title",
                text: "Notes"
            });

            var content = viewUtilities.html.createElement("div", {
                cssClass: "note-list-content"
            });

            var actions = viewUtilities.html.createElement("div", {
                cssClass: "note-list-actions"
            });

            var loadAction = viewUtilities.html.createElement("button", {
                cssClass: "button-default note-list-actions-load-more",
                type: "button",
                text: "Load more notes"
            });

            viewUtilities.html.append(actions, loadAction);
            viewUtilities.html.appendMany(rootNode, [title, content, actions]);

            contentNode = content;
        };

        var renderItems = function () {
            var itemViewModels = viewModel.getItemViewModels();

            // Check for empty case.
            if (itemViewModels.length === 0) {
                showEmptyMessage();
                return;
            } else if (
                viewUtilities.css.hasClass(contentNode, EMPTY_CSS_CLASS)) {

                viewUtilities.css.removeClass(contentNode, EMPTY_CSS_CLASS);
            }

            // Add new items from start.
            if (itemViewsAndNodes.length === 0) {
                var newItemNodes = [];
                itemViewModels.forEach(function (itemViewModel) {
                    var itemAndView = createAndRenderItem(itemViewModel);
                    itemViewsAndNodes.push(itemAndView);
                    newItemNodes.push(itemAndView.node);
                });
                viewUtilities.html.appendMany(contentNode, newItemNodes);
                return;
            }

            // Remove extra items.
            var itemViewAndNode;
            while (itemViewsAndNodes.length > itemViewModels.length) {
                itemViewAndNode = itemViewsAndNodes.pop();
                destroyAndClearItem(itemViewAndNode);
            }

            // Add missing items.
            var itemViewModel;
            var itemAndView;
            while (itemViewsAndNodes.length < itemViewModels.length) {
                itemViewModel = itemViewModels[itemViewsAndNodes.length];
                itemAndView = createAndRenderItem(itemViewModel);
                itemViewsAndNodes.push(itemAndView);
                viewUtilities.html.append(contentNode, itemAndView.node);
            }

            // Reset view models on each view.
            for (var i = 0; i < itemViewsAndNodes.length; i++) {
                itemViewModel = itemViewModels[i];
                itemAndView = itemViewsAndNodes[i];
                itemAndView.view.setViewModel(itemViewModel);
            }
        };

        var showEmptyMessage = function () {
            clearContent();

            viewUtilities.css.addClass(contentNode, EMPTY_CSS_CLASS);

            var emptyNode = viewUtilities.html.createElement("p", {
                text: "Start typing in the editor to create a note. ;)"
            });
            viewUtilities.html.append(contentNode, emptyNode);
        };

        var createAndRenderItem = function (itemViewModel) {
            var itemRootNode = viewUtilities.html.createElement("div", {
                cssClass: "list-item"
            });
            var itemView = viewFactory.create("NoteListItem", {
                rootNode: itemRootNode,
                viewModel: itemViewModel
            });
            itemView.render();

            return {
                view: itemView,
                node: itemRootNode
            };
        };

        var clearContent = function () {
            var itemViewAndNode;
            while (itemViewsAndNodes.length !== 0) {
                itemViewAndNode = itemViewsAndNodes.pop();
                destroyAndClearItem(itemViewAndNode);
            }
        };

        var destroyAndClearItem = function (itemViewAndNode) {
            itemViewAndNode.view.destroy();
            viewUtilities.html.removeChild(contentNode,
                itemViewAndNode.node);
        };

        that.destroy = function () {
            // ...undo render()
        };

        var removeHtmlNodes = function () {
            // ...undo createHtmlNodes()
        };
        
        // Handle creating and deleting sub-views based on subscriptions.
        // Handle simple animations for addition and removal.

        return that;
    };
})(Notes);
