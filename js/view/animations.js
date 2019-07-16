"use strict";

(function (Notes) {
    var FADE_OUT_CSS_CLASS = "fade-out";
    var FADE_IN_CSS_CLASS = "fade-in";
    var FADE_TIMING_MS = 400;

    Notes.view.animations = function (options) {
        var that = {};

        var viewUtilities = options.viewUtilities;
        var setTimeout = options.setTimeout;

        that.crossFadeText = function (element, newText) {
            this.crossFade(element, function () {
                viewUtilities.text.set(element, newText);
            });
        };

        that.crossFade = function (element, middleOperation) {
            viewUtilities.css.addClass(element, FADE_OUT_CSS_CLASS);

            // TODO Replace with animations events instead of timeout.
            setTimeout(function () {
                middleOperation();
                viewUtilities.css.addClass(element, FADE_IN_CSS_CLASS);
                viewUtilities.css.removeClass(element, FADE_OUT_CSS_CLASS);

                setTimeout(function () {
                    viewUtilities.css.removeClass(element, FADE_IN_CSS_CLASS);
                }, FADE_TIMING_MS);
            }, FADE_TIMING_MS);
        };

        return that;
    };
})(Notes);
