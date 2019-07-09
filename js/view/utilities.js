"use strict";

(function (Notes) {
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
        addCssClass: addCssClass,
        hasCssClass: hasCssClass,
        removeCssClass: removeCssClass,
        toggleBetweenTexts: toggleBetweenTexts,
        toggleCssClass: toggleCssClass,
    };
})(Notes);
