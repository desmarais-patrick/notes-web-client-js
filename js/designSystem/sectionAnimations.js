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
})(Notes);
