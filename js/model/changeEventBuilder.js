"use strict";

(function (Notes) {
    Notes.model.changeEventBuilder = function(options) {
        var that = {};

        var createChangeEvent = options.createChangeEvent;

        that.createChangeEvent = function (changeEventSource) {
            return createChangeEvent({
                source: changeEventSource
            });
        };

        return that;
    };
})(Notes);
