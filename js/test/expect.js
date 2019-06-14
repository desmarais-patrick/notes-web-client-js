"use strict";

(function (Notes) {
    Notes.test.expect = function (value1) {
        var that = {};

        that.toEqual = function (value2) {
            if (value1 !== value2) {
                throw new Error("'" + value1 + "' doesn't equal '" + value2 + "'");
            }
        };

        that.toBeNull = function () {
            if (value1 !== null) {
                throw new Error("'" + value1 + "' isn't null");
            }
        }

        that.toBeObject = function () {
            if (typeof value1 !== "object") {
                throw new Error("'" + value1 + "' is not an object");
            }
        }

        return that;
    };
})(Notes);
