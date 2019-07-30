"use strict";

(function (Notes) {
    var HIDDEN_CSS_CLASS = "back-to-top-hidden";

    Notes.view.backToTopView = function (options) {
        var that = {};

        var viewUtilities = options.viewUtilities;

        var rootNode = options.rootNode;
        var viewModel = options.viewModel;

        var linkNode = null;

        that.render = function () {
            linkNode = viewUtilities.traversal.findWithCssClass(rootNode,
                "back-to-top-link");

            viewUtilities.text.set(linkNode, "Back to Top ↑");

            var isVisible = viewModel.isVisible();
            updateVisibility(isVisible);

            viewModel.setVisibilityChangeListener(updateVisibility);
        };

        var updateVisibility = function (isVisible) {
            var hasHiddenClass = viewUtilities.css.hasClass(linkNode,
                HIDDEN_CSS_CLASS);
            
            if (isVisible === true && hasHiddenClass === true) {
                viewUtilities.css.removeClass(linkNode, HIDDEN_CSS_CLASS);
            } else if (isVisible === false && hasHiddenClass === false) {
                viewUtilities.css.addClass(linkNode, HIDDEN_CSS_CLASS);
            }
        };

        that.destroy = function () {
            viewModel.setVisibilityChangeListener(null);
        };

        return that;
    };
})(Notes);
