"use strict";

(function (Notes) {
    Notes.view.page = function(options) {
        var that = {};

        var model = options.model;

        var document = options.document;        
        var rootNodeId = options.rootNodeId;
        var rootNode = null;

        // Create sub-views.
        // viewFactory.createHeader();
        // viewFactory.createEditor();
        // viewFactory.createNoteList();
        // viewFactory.createFooter();

        // Set document listeners to know when to render.
        // Document.on("ready", function () { that.render(); });

        that.render = function () {
            // Attach to HTML elements
            rootNode = document.getElementById(rootNodeId);
            rootNode.innerText = "Hello, World!";
            // Set HTML listeners
        }

        that.destroy = function () {
            // Call destroy on sub-views
            // Remove created HTML nodes
            rootNode.innerText = "";
            rootNode = null;
        };

        return that;
    };
})(Notes);