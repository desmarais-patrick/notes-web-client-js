"use strict";

(function (Notes) {
    Notes.test.mocks.localStorageMock = function () {
        var that = {};

        var storage = {};

        that.setItem = function (key, value) {
            storage[key] = value;
        };

        that.getItem = function (key) {
            return storage[key];
        };

        return that;
    };
})(Notes);
