"use strict";

(function (Notes) {
    var EMPTY_CSS_CLASS = "note-list-content-empty";

    Notes.view.noteListView = function(options) {
        var that = {};

        var viewFactory = options.viewFactory;
        var viewUtilities = options.viewUtilities;

        var rootNode = options.rootNode;
        var viewModel = options.viewModel;

        var contentNode = null;
        var itemViewsAndNodes = [];

        that.render = function () {
            createHtmlNodes();
            renderItems();

            viewModel.setNoteAddedListener(onNoteAdded);
            viewModel.setNoteRemovedListener(onNoteRemoved);
            // TODO Set viewModel.setChangeListener() and test.
        };

        that.destroy = function () {
            viewModel.setNoteRemovedListener(null);
            viewModel.setNoteAddedListener(null);

            hideAndDestroyItems();
            removeHtmlNodes();
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

        var removeHtmlNodes = function () {
            contentNode = null;

            viewUtilities.html.clearChildNodes(rootNode);
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
                    var itemViewAndNode = createAndRenderItem(itemViewModel);
                    itemViewsAndNodes.push(itemViewAndNode);
                    newItemNodes.push(itemViewAndNode.node);
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
            var itemViewAndNode;
            while (itemViewsAndNodes.length < itemViewModels.length) {
                itemViewModel = itemViewModels[itemViewsAndNodes.length];
                itemViewAndNode = createAndRenderItem(itemViewModel);
                itemViewsAndNodes.push(itemViewAndNode);
                viewUtilities.html.append(contentNode, itemViewAndNode.node);
            }

            // Reset view models on each view.
            for (var i = 0; i < itemViewsAndNodes.length; i++) {
                itemViewModel = itemViewModels[i];
                itemViewAndNode = itemViewsAndNodes[i];
                itemViewAndNode.view.setViewModel(itemViewModel);
            }
        };

        var showEmptyMessage = function () {
            clearContent();

            // TODO Smooth transition when changing content height.
            viewUtilities.css.addClass(contentNode, EMPTY_CSS_CLASS);

            // TODO Smooth transition when showing text.
            var emptyNode = viewUtilities.html.createElement("p", {
                text: "Start typing in the editor to create a note. ;)"
            });
            viewUtilities.html.append(contentNode, emptyNode);
        };

        var hideEmptyMessage = function () {
            clearContent();

            // TODO Smooth transition.
            var hasEmptyCssClass = viewUtilities.css.hasClass(contentNode,
                EMPTY_CSS_CLASS);
            if (hasEmptyCssClass) {
                viewUtilities.css.removeClass(contentNode,
                    EMPTY_CSS_CLASS);
            }
        };

        var onNoteAdded = function (listItemViewModel, index) {
            if (itemViewsAndNodes.length === 0) {
                hideEmptyMessage();
            }

            var itemViewAndNode = createAndRenderItem(listItemViewModel);
            var nextItemAndView;
            if (index === itemViewsAndNodes.length) {
                itemViewsAndNodes.push(itemViewAndNode);

                // TODO Smooth transition when adding node. 
                viewUtilities.html.append(contentNode, itemViewAndNode.node);
            } else {
                nextItemAndView = itemViewsAndNodes[index];
                itemViewsAndNodes.splice(index, 0, itemViewAndNode);

                // TODO Smooth transition when adding node. 
                viewUtilities.html.insertBefore(contentNode,
                    nextItemAndView.node, itemViewAndNode.node);
            }
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

        var onNoteRemoved = function (listItemViewModel, index) {
            var itemViewAndNode = itemViewsAndNodes[index];
            destroyAndClearItem(itemViewAndNode);

            itemViewsAndNodes.splice(index, 1);

            if (itemViewsAndNodes.length === 0) {
                showEmptyMessage();
            }
        };

        var destroyAndClearItem = function (itemViewAndNode) {
            itemViewAndNode.view.hide();
            itemViewAndNode.view.destroy();

            // TODO Smooth transition when removing node.
            viewUtilities.html.removeChild(contentNode,
                itemViewAndNode.node);
        };

        var hideAndDestroyItems = function () {
            clearContent();
        };

        var clearContent = function () {
            // TODO Smooth transition when clearing content.
            var itemViewAndNode;
            while (itemViewsAndNodes.length !== 0) {
                itemViewAndNode = itemViewsAndNodes.pop();
                destroyAndClearItem(itemViewAndNode);
            }

            viewUtilities.html.clearChildNodes(contentNode);
        };

        return that;
    };
})(Notes);
