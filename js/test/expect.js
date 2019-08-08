"use strict";

(function (Notes) {
    Notes.test.expect = function (value1) {
        var that = {};

        that.toEqual = function (value2) {
            if (value1 !== value2) {
                throwErrorWithTwoArgs(value1, "to equal", value2);
            }
        };

        that.toNotEqual = function (value2) {
            if (value1 === value2) {
                throwErrorWithTwoArgs(value1, "to NOT equal", value2);
            }
        };

        that.toBeGreaterThan = function (value2) {
            if (value1 <= value2) {
                throwErrorWithTwoArgs(value1, "to be greater than", value2);
            }
        };

        that.toBeSmallerThan = function (value2) {
            if (value1 >= value2) {
                throwErrorWithTwoArgs(value1, "to be smaller than", value2);
            }
        };

        that.toBeDefined = function () {
            if (typeof value1 === "undefined") {
                throwErrorWithOneArg(value1, "to be defined");
            }
        };

        that.toBeNull = function () {
            if (value1 !== null) {
                throwErrorWithOneArg(value1, "to be null");
            }
        };

        that.toNotBeNull = function () {
            if (value1 === null) {
                throwErrorWithOneArg(value1, "to NOT be null");
            }
        };

        that.toBeObject = function () {
            if (typeof value1 !== "object") {
                throwErrorWithOneArg(value1, "to be an object");
            }
        };

        var throwErrorWithOneArg = function (value, reason) {
            var message = [
                "[ASSERTION FAILED] Expected", " ",
                "'", value, "'", " ",
                reason
            ].join("");
            throw new Error(message);
        }

        var throwErrorWithTwoArgs = function (value1, reason, value2) {
            var message = [
                "[ASSERTION FAILED] Expected", " ",
                "'", value1, "'", " ",
                reason, " ",
                "'", value2, "'"
            ].join("");
            throw new Error(message);
        }

        return that;
    };
})(Notes);
