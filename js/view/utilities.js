"use strict";

(function (Notes) {
    // HTML traversal
    var findChildNodeWithCssClass = function (parentElement, cssClass) {
        var nodeList = parentElement.childNodes;
        var node;

        for (var i = 0; i < nodeList.length; i++) {
            node = nodeList[i];
            if (node.className && hasCssClass(node, cssClass)) {
                return node;
            }
        }

        return null;
    };
    var findDocumentNodeWithId = function (id) {
        return document.getElementById(id);
    };

    // Css classes
    var SPACE = " ";

    var addCssClass = function (element, cssClass) {
        element.className += (SPACE + cssClass);
    };

    var hasCssClass = function (element, cssClass) {
        var cssClasses = element.className.split(SPACE);
        return cssClasses.indexOf(cssClass) > -1;
    };

    var removeCssClass = function (element, cssClass) {
        var cssClasses = element.className.split(SPACE);
        var index = cssClasses.indexOf(cssClass);
        if (index === -1) {
            return;
        }

        cssClasses.splice(index, 1);
        element.className = cssClasses.join(SPACE);
    };

    var toggleCssClass = function (element, cssClass) {
        var cssClasses = element.className.split(SPACE);
        var index = cssClasses.indexOf(cssClass);
        if (index === -1) {
            element.className += (SPACE + cssClass);
        } else {
            cssClasses.splice(index, 1);
            element.className = cssClasses.join(SPACE);
        }
    };

    // Text
    var toggleBetweenTexts = function (element, text1, text2) {
        if (element.textContent === text1) {
            element.textContent = text2;
        } else {
            element.textContent = text1;
        }
    };

    Notes.view.utilities = {
        findChildNodeWithCssClass: findChildNodeWithCssClass,
        findDocumentNodeWithId: findDocumentNodeWithId,

        addCssClass: addCssClass,
        hasCssClass: hasCssClass,
        removeCssClass: removeCssClass,
        toggleCssClass: toggleCssClass,

        toggleBetweenTexts: toggleBetweenTexts,
    };
})(Notes);
