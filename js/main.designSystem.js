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
        Notes.designSystem.setupFadeInAnimationExample();
        Notes.designSystem.setupFadeOutAnimationExample();
        Notes.designSystem.setupCrossFadeAnimationExample();
    };
})(Notes);
