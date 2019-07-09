"use strict";

(function (Notes) {
    // Setup.
    var chosenConfiguration = Notes.config.configurations["Development"];

    var reqBuilderOptions = {
        XMLHttpRequest: window.XMLHttpRequest,
        requestTimeoutInMillis: 30000,

        request: Notes.communication.request,
        baseUrl: chosenConfiguration.apiServerBaseUrl
    };
    var requestBuilder = Notes.communication.requestBuilder(reqBuilderOptions);

    var modelOptions = {
        createApp: Notes.model.app,
        createCache: Notes.model.cache,
        createEvents: Notes.model.events,
        createNote: Notes.model.note,
        NOTE_STATUS_ENUM: Notes.model.note.STATUS_ENUM,
        createNotes: Notes.model.notes,
        NOTES_STATUS_ENUM: Notes.model.notes.STATUS_ENUM,
        requestBuilder: requestBuilder,
        setTimeout: window.setTimeout
    };
    var model = Notes.model.model(modelOptions);

    var rootId = "app";
    var pageOptions = {
        document: window.document,
        model: model,
        rootNodeId: rootId
    };
    var page = Notes.view.page(pageOptions);

    // Display page when document is ready.
    var isDocumentReady = function () {
        var state = document.readyState;
        // TODO Review what interactive and complete mean.
        return (state === "interactive" || state === "complete");
    };
    if (isDocumentReady()) {
        page.render();
    } else {
        document.onreadystatechange = function () {
            if (isDocumentReady()) {
                page.render();
                document.onreadystatechange = null; // Render only once.
            }
        };
    }

    // Show has started!
    console.log("Hello from Notes app!");
    console.log("Mode:", chosenConfiguration.name);

})(Notes);
