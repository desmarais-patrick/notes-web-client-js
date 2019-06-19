"use strict";

(function (Notes) {
    Notes.test.expect = function (value1) {
        var that = {};

        that.toEqual = function (value2) {
            if (value1 !== value2) {
                throw new Error("'" + value1 + "' does NOT equal '" + value2 + "'");
            }
        };

        that.toBeGreaterThan = function (value2) {
            if (value1 <= value2) {
                throw new Error("'" + value1 + "' is NOT greater than '" + value2 + "'");
            }
        }

        that.toBeDefined = function () {
            if (typeof value1 === "undefined") {
                throw new Error("'" + value1 + "' is NOT defined");
            }
        }

        that.toBeNull = function () {
            if (value1 !== null) {
                throw new Error("'" + value1 + "' is NOT null");
            }
        }

        that.toNotBeNull = function () {
            if (value1 === null) {
                throw new Error("'" + value1 + "' is null");
            }
        }

        that.toBeObject = function () {
            if (typeof value1 !== "object") {
                throw new Error("'" + value1 + "' is NOT an object");
            }
        }

        return that;
    };
})(Notes);
