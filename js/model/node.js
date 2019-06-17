"use strict";

(function (Notes) {
    Notes.model.node = function(options) {
        var that = {};

        this.id = options.id;
        this.position = options.position;
        this.next = options.next || null;

        return that;
    };
})(Notes);