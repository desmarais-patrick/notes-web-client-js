"use strict";

(function (Notes) {
    Notes.test.mocks.sortableFakeObject = function(id, numberValue) {
        var that = {};

        that.getId = function () {
            return id;
        }

        that.getNumberValue = function () {
            return numberValue;
        };

        that.compare = function (anotherSortableFakeObject) {
            var otherValue = anotherSortableFakeObject.getNumberValue();
            if (numberValue < otherValue) {
                return -1;
            } else if (numberValue > otherValue) {
                return 1;
            }
            return 0; // Equal!
        }

        return that;
    };
})(Notes);
