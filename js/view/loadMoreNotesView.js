"use strict";

(function (Notes) {
    var HIDE_CSS_CLASS = "note-list-actions-hidden";

    Notes.view.loadMoreNotesView = function (options) {
        var that = {};

        var animations = options.animations;
        var viewUtilities = options.viewUtilities;

        var rootNode = options.rootNode;
        var viewModel = options.viewModel;

        var buttonNode = null;
        var messageNode = null;

        that.render = function () {
            updateRootVisibility();
            viewModel.setVisibilityChangeListener(updateRootVisibility);

            createHtmlNodes();
            viewUtilities.button.onClick(buttonNode, onClicked);

            updateButtonEnabledState();
            viewModel.setStateChangeListener(updateButtonEnabledState);

            updateMessageText();
            viewModel.setMessageChangeListener(updateMessageText);
        };

        that.destroy = function () {
            viewModel.setMessageChangeListener(null);
            viewModel.setStateChangeListener(null);
            viewUtilities.button.offClick(buttonNode, onClicked);
            removeHtmlNodes();
            viewModel.setVisibilityChangeListener(null);
        };

        var updateRootVisibility = function () {
            var isVisible = viewModel.isVisible();
            var hasHideCssClass =
                (viewUtilities.css.hasClass(rootNode, HIDE_CSS_CLASS) === true);
            if (isVisible && hasHideCssClass) {
                viewUtilities.css.removeClass(rootNode, HIDE_CSS_CLASS);
            } else if (!isVisible && !hasHideCssClass) {
                viewUtilities.css.addClass(rootNode, HIDE_CSS_CLASS);
            }
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

        var updateButtonEnabledState = function () {
            var isEnabled = viewModel.isEnabled();
            if (isEnabled) {
                viewUtilities.button.enable(buttonNode);
            } else {
                viewUtilities.button.disable(buttonNode);
            }
            // TODO Show progress bar upon state change.
        };

        var onClicked = function () {
            viewModel.requestMoreNotes();
        };

        var updateMessageText = function () {
            var message = viewModel.getMessage();
            if (message.length === 0) {
                removeMessage();
            } else {
                showMessage(message);
            }
        };

        var showMessage = function (message) {
            if (messageNode === null) {
                messageNode = viewUtilities.html.createElement("p", {
                    cssClass: "note-list-actions-load-error"
                });
                viewUtilities.html.append(rootNode, messageNode);
            }
            animations.crossFadeText(messageNode, message);
        };

        var removeMessage = function () {
            if (messageNode !== null) {
                viewUtilities.html.removeChild(rootNode, messageNode);
                messageNode = null;
            }
        };

        return that;
    };
})(Notes);
