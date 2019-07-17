"use strict";

(function (Notes) {
    Notes.designSystem.setupAnimationSection = function (createAppOptions) {
        var appOptions = createAppOptions();
        var viewUtilities = appOptions.viewUtilities;
        setupFadeInAnimationExample(viewUtilities);
        setupFadeOutAnimationExample(viewUtilities);
        setupCrossFadeAnimationExample(viewUtilities, appOptions.animations);
    };

    var setupFadeInAnimationExample = function (utils) {
        var playElement = utils.traversal.findWithId(
            "play-animation-example-1");
        var targetElement = utils.traversal.findWithId("animation-example-1");

        utils.button.registerClick(playElement, function () {
            utils.css.toggleClass(targetElement, "fade-in-and-scale");

            utils.css.toggleClass(targetElement, "play");
            utils.text.toggleBetween(playElement, "Play", "Reset");
        });
    };

    var setupFadeOutAnimationExample = function (utils) {
        var playElement = utils.traversal.findWithId("play-animation-example-2");
        var targetElement = utils.traversal.findWithId("animation-example-2");
        var item2Element = utils.traversal.findWithCssClass(targetElement,
            "item-2");

        utils.button.registerClick(playElement, function () {
            utils.css.toggleClass(item2Element, "fade-out-and-collapse");

            utils.css.toggleClass(targetElement, "play");
            utils.text.toggleBetween(playElement, "Play", "Reset");
        });
    };

    var setupCrossFadeAnimationExample = function (utils, animations) {
        var playElement = utils.traversal.findWithId("play-animation-example-3");
        var targetElement = utils.traversal.findWithId("animation-example-3");
        var item2Element = utils.traversal.findWithCssClass(targetElement, 
            "item-2");

        var item2InitialText = utils.text.get(item2Element);
        utils.button.registerClick(playElement, function () {
            if (utils.css.hasClass(targetElement, "play")) {
                animations.crossFadeText(item2Element, item2InitialText);
            } else {
                animations.crossFadeText(item2Element, "New text");
            }
            utils.css.toggleClass(targetElement, "play");
            utils.text.toggleBetween(playElement, "Play", "Reset");
        });
    };
})(Notes);
