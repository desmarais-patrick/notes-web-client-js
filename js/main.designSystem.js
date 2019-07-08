"use strict";

(function () {

    document.onreadystatechange = function () {
        if (document.readyState === "complete") {
            main();
            document.onreadystatechange = null; // Render only once.
        }
    };

    var main = function () {
        // Animations
        setupFadeInAnimationExample();
    };

    var setupFadeInAnimationExample = function () {
        var playElement = document.getElementById("play-animation-example-1");
        var targetElement = document.getElementById("animation-example-1");

        playElement.onclick = function () {
            var targetClassName = targetElement.className;
            var classNames = targetClassName.split(" ");
            var fadeInClassNameIndex = classNames.indexOf("fade-in");
            if (fadeInClassNameIndex === -1) {
                targetElement.className += " fade-in";
                playElement.textContent = "Reset";
            } else {
                classNames.splice(fadeInClassNameIndex, 1);
                targetElement.className = classNames.join(" ");
                playElement.textContent = "Play";
            }
        };
    };
})(Notes);
