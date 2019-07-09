"use strict";

(function (Notes) {
    var hasCssClass = Notes.view.utilities.hasCssClass;
    var toggleBetweenTexts = Notes.view.utilities.toggleBetweenTexts;
    var toggleCssClass = Notes.view.utilities.toggleCssClass;

    Notes.designSystem.setupFadeInAnimationExample = function () {
        var playElement = document.getElementById("play-animation-example-1");
        var targetElement = document.getElementById("animation-example-1");

        playElement.onclick = function () {
            toggleCssClass(targetElement, "fade-in-and-scale");

            toggleCssClass(targetElement, "play");
            toggleBetweenTexts(playElement, "Play", "Reset");
        };
    };

    Notes.designSystem.setupFadeOutAnimationExample = function () {
        var playElement = document.getElementById("play-animation-example-2");
        var targetElement = document.getElementById("animation-example-2");
        var item2Element = findChildNodeWithCssClass(targetElement, "item-2");

        playElement.onclick = function () {
            toggleCssClass(item2Element, "fade-out-and-collapse");

            toggleCssClass(targetElement, "play");
            toggleBetweenTexts(playElement, "Play", "Reset");
        };
    };

    Notes.designSystem.setupCrossFadeAnimationExample = function () {
        var playElement = document.getElementById("play-animation-example-3");
        var targetElement = document.getElementById("animation-example-3");
        var item2Element = findChildNodeWithCssClass(targetElement, "item-2");
        var item2OldText;
        playElement.onclick = function () {
            if (hasCssClass(targetElement, "play")) {
                Notes.view.animations.crossFadeText(item2Element, item2OldText);
            } else {
                item2OldText = item2Element.textContent;
                Notes.view.animations.crossFadeText(item2Element, "New text");
            }
            toggleCssClass(targetElement, "play");
            toggleBetweenTexts(playElement, "Play", "Reset");
        };
    };

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
})(Notes);
