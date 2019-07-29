"use strict";

(function (Notes) {
    Notes.view.loadMoreNotesView = function (options) {
        var that = {};

        var animations = options.animations;
        var viewUtilities = options.viewUtilities;

        var rootNode = options.rootNode;
        var viewModel = options.viewModel;

        var buttonNode = null;
        var errorNode = null;

        that.render = function () {
            createHtmlNodes();
            viewUtilities.button.onClick(buttonNode, onClicked);
        };

        that.destroy = function () {
            viewUtilities.button.offClick(buttonNode, onClicked);
            removeHtmlNodes();
        };

        var createHtmlNodes = function () {
            buttonNode = viewUtilities.html.createElement("button", {
                cssClass: "button-default note-list-actions-load-more",
                type: "button",
                text: "Load more notes"
            });

            viewUtilities.html.append(rootNode, buttonNode);
        };

        var removeHtmlNodes = function () {
            viewUtilities.html.clearChildNodes(rootNode);
        };

        var onClicked = function () {
            viewUtilities.button.disable(buttonNode);
            viewModel.requestMoreNotes(onRequestMoreNotesReturn);
        };

        var onRequestMoreNotesReturn = function (error) {
            if (error !== null) {
                var errorMessage =
                    "⚠️ Error occurred while loading more notes.";
                showMessage(errorMessage);
            } else {
                removeMessage();
            }
            viewUtilities.button.enable(buttonNode);
        };

        var showMessage = function (errorMessage) {
            if (errorNode === null) {
                errorNode = viewUtilities.html.createElement("p", {
                    cssClass: "note-list-actions-load-error"
                });
                viewUtilities.html.append(rootNode, errorNode);
            }
            animations.crossFadeText(errorNode, errorMessage);
        };

        var removeMessage = function () {
            if (errorNode !== null) {
                viewUtilities.html.removeChild(rootNode, errorNode);
            }
        }

        return that;
    };
})(Notes);
