"use strict";

(function (Notes) {
    Notes.model.changeEvent = function(options) {
        var that = {};

        var source = options.source;

        that.getSource = function () {
            return source;
        };

        return that;
    };
})(Notes);
