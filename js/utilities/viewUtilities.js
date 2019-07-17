"use strict";

(function (Notes) {
    Notes.utilities.viewUtilities = function (options) {
        var document = options.document;

        var viewUtilities = {};

        viewUtilities.traversal = {};

        viewUtilities.traversal.findWithId = function (id) {
            return document.getElementById(id);
        };

        viewUtilities.traversal.findWithCssClass = function (parentElement,
            cssClass) {

            var nodeList = parentElement.childNodes;
            var node;
    
            // Only goes one level deep!
            for (var i = 0; i < nodeList.length; i++) {
                node = nodeList[i];
                if (node.className && viewUtilities.css.hasClass(node, cssClass)) {
                    return node;
                }
            }
    
            return null;
        };

        viewUtilities.traversal.findWithCssSelector = function (parentElement,
            cssSelector) {

            return parentElement.querySelector(cssSelector);
        };

        viewUtilities.css = {};

        var SPACE = " ";

        viewUtilities.css.addClass = function (element, cssClass) {
            element.className += (SPACE + cssClass);
        };
        viewUtilities.css.addClassOnce = function (element, cssClass) {
            if (this.hasClass(element, cssClass)) {
                return;
            }
            this.addClass(element, cssClass);
        };

        viewUtilities.css.hasClass = function (element, cssClass) {
            var cssClasses = element.className.split(SPACE);
            return cssClasses.indexOf(cssClass) > -1;
        };

        viewUtilities.css.removeClass = function (element, cssClass) {
            var cssClasses = element.className.split(SPACE);
            var index = cssClasses.indexOf(cssClass);
            if (index === -1) {
                return;
            }
    
            cssClasses.splice(index, 1);
            element.className = cssClasses.join(SPACE);
        };

        viewUtilities.css.toggleClass = function (element, cssClass) {
            var cssClasses = element.className.split(SPACE);
            var index = cssClasses.indexOf(cssClass);
            if (index === -1) {
                element.className += (SPACE + cssClass);
            } else {
                cssClasses.splice(index, 1);
                element.className = cssClasses.join(SPACE);
            }
        };

        viewUtilities.button = {};

        viewUtilities.button.onClick = function (element, callback) {
            element.addEventListener("click", callback);
        };
        viewUtilities.button.offClick = function (element, callback) {
            element.removeEventListener("click", callback);
        };

        viewUtilities.text = {};

        viewUtilities.text.toggleBetween = function (element, text1, text2) {
            if (element.textContent === text1) {
                element.textContent = text2;
            } else {
                element.textContent = text1;
            }
        };

        viewUtilities.text.get = function (element) {
            return element.textContent;
        };
        viewUtilities.text.set = function (element, newText) {
            element.textContent = newText;
        };

        viewUtilities.textarea = {};

        viewUtilities.textarea.getValue = function (element) {
            return element.value;
        };
        viewUtilities.textarea.setValue = function (element, newValue) {
            element.value = newValue;
        };
        viewUtilities.textarea.onValueChange = function (element, callback) {
            element.addEventListener("input", callback);
        };
        viewUtilities.textarea.offValueChange = function (element, callback) {
            element.removeEventListener("input", callback);
        };
        viewUtilities.textarea.hasScrollBar = function (element) {
            return (element.scrollHeight > element.clientHeight);
        };

        return viewUtilities;
    };
})(Notes);
