
"use strict";

(function (Notes) {
    Notes.model.core.node = function(object, next) {
        var that = {};

        if (object.hasOwnProperty("getId") === false) {
            throw new Error("[Notes.model.core.node] Failed initialization: " + 
                "object must be identifiable (missing `getId()` method)");
        }

        if (object.hasOwnProperty("compare") === false) {
            throw new Error("[Notes.model.core.node] Failed initialization: " + 
                "object must be sortable (missing `compare()` method)");
        }

        that.getId = function () { return object.getId(); };

        that.getNext = function () { return next; };
        that.setNext = function (newNext) {
            next = newNext;
        };

        that.getObject = function () { return object; };
        that.compare = function (node) {
            var otherObject = node.getObject();
            return object.compare(otherObject);
        };

        return that;
    };
})(Notes);
