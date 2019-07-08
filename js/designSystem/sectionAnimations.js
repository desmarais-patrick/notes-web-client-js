"use strict";

(function (Notes) {
    Notes.designSystem.setupFadeInAnimationExample = function () {
        var playElement = document.getElementById("play-animation-example-1");
        var targetElement = document.getElementById("animation-example-1");

        playElement.onclick = function () {
            var targetClassName = targetElement.className;
            var classNames = targetClassName.split(" ");
            var playClassNameIndex = classNames.indexOf("play");
            if (playClassNameIndex === -1) {
                targetElement.className += " play fade-in";
                playElement.textContent = "Reset";
            } else {
                classNames.splice(playClassNameIndex, 1);
                var fadeInClassNameIndex = classNames.indexOf("fade-in");
                classNames.splice(fadeInClassNameIndex, 1);
                targetElement.className = classNames.join(" ");
                playElement.textContent = "Play";
            }
        };
    };
    Notes.designSystem.setupFadeOutAnimationExample = function () {
        var playElement = document.getElementById("play-animation-example-2");
        var targetElement = document.getElementById("animation-example-2");

        var item2Element;
        targetElement.childNodes.forEach(function (node) {
            if (node.className && /item\-2/.test(node.className)) {
                item2Element = node;
            }
        });

        playElement.onclick = function () {
            var targetClassName = targetElement.className;
            var classNames = targetClassName.split(" ");
            var playClassNameIndex = classNames.indexOf("play");
            if (playClassNameIndex === -1) {
                targetElement.className += " play";
                item2Element.className += " fade-out-and-collapse"
                playElement.textContent = "Reset";
            } else {
                classNames.splice(playClassNameIndex, 1);
                targetElement.className = classNames.join(" ");
                
                var item2ClassNames = item2Element.className.split(" ");
                var index = item2ClassNames.indexOf("fade-out-and-collapse");
                item2ClassNames.splice(index, 1);
                item2Element.className = item2ClassNames.join(" ");

                playElement.textContent = "Play";
            }
        };
    };
})(Notes);
