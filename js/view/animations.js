"use strict";

(function (Notes) {
    // TODO Try to inject utilities instead of directly addressing them.
    var crossFadeText = function (element, newText) {
        Notes.view.utilities.addCssClass(element, "fade-out");

        // TODO Replace with animations events instead of timeout.
        setTimeout(function () {
            element.textContent = newText;
            Notes.view.utilities.addCssClass(element, "fade-in");
            Notes.view.utilities.removeCssClass(element, "fade-out");

            setTimeout(function () {
                Notes.view.utilities.removeCssClass(element, "fade-in");
            }, 400);
        }, 400);
    };

    Notes.view.animations = {
        crossFadeText: crossFadeText
    };
})(Notes);
