"use strict";

(function (Notes) {
    Notes.test.htmlLogger = function (options) {
        var that = {};

        var document = options.document;
        var rootNode = document.getElementById(options.rootNodeId);

        that.log = function (message) {
            var preformattedElement = document.createElement("pre");
            preformattedElement.innerText = message;
            rootNode.appendChild(preformattedElement);
        };

        return that;
    };
})(Notes);
