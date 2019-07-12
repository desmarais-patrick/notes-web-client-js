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

        // Application status
        var appStatusInitialOptions = createAppStatusOptions(
            "example-app-status-initial");
        Notes.designSystem.setupApplicationStatusInitialExample(
            appStatusInitialOptions);
        
        var appStatusWorkingOptions = createAppStatusOptions(
            "example-app-status-working");
        Notes.designSystem.setupApplicationStatusWorkingExample(
            appStatusWorkingOptions);
    
        var appStatusReadyOptions = createAppStatusOptions(
            "example-app-status-ready");
        Notes.designSystem.setupApplicationStatusReadyExample(
            appStatusReadyOptions);
    };

    var createAppStatusOptions = function (nodeId) {
        var model = createModel();
        var viewModelFactory = createViewModelFactory(model);
        var viewFactory = createViewFactory();
        return {
            viewFactory: viewFactory,
            viewModelFactory: viewModelFactory,
            model: model,
            nodeId: nodeId,
            utilities: Notes.view.utilities
        };
    };

    var createModel = function () {
        return Notes.model.model({
            createApp: Notes.model.app,
            createCache: Notes.model.cache,
            createEvents: Notes.model.events,
            createNote: Notes.model.note,
            NOTE_STATUS_ENUM: Notes.model.note.STATUS_ENUM,
            createNotes: Notes.model.notes,
            NOTES_STATUS_ENUM: Notes.model.notes.STATUS_ENUM,
            requestBuilder: null,
            setTimeout: window.setTimeout
        });
    };

    var createViewModelFactory = function (model) {
        return Notes.viewModel.viewModelFactory({
            setInterval: window.setInterval,
            clearInterval: window.clearInterval,
            createApplicationStatusViewModel:
                Notes.viewModel.applicationStatusViewModel,
            APP_STATUS_ENUM: Notes.model.app.STATUS_ENUM,
            model: model,
        });
    };

    var createViewFactory = function () {
        return Notes.view.viewFactory({
            createApplicationStatusView: Notes.view.applicationStatusView
        });
    };
})(Notes);
