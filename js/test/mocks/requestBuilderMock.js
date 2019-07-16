"use strict";

(function (Notes) {
    Notes.test.mocks.requestBuilderMock = function () {
        var that = {};

        var nextResponse = null;
        that.setNextResponse = function (response) {
            nextResponse = response;
        };

        that.delete = function (path) {
            var response = nextResponse;
            nextResponse = null;
            return requestMock(response);
        };
    
        that.get = function (path) {
            var response = nextResponse;
            nextResponse = null;
            return requestMock(response);
        };

        var nextPostResponse = null;
        that.setNextPostResponseAsNoteCreatedWithId = function (id) {
            nextPostResponse = {
                type: "NoteCreated",
                id: id
            };
        };
        that.post = function (path, body) {
            var response = nextPostResponse;
            nextPostResponse = null;
            return requestMock(response);
        };

        that.put = function (path, body) {
            var response = nextResponse;
            nextResponse = null;
            return requestMock(response);
        };

        return that;
    };

    var requestMock = function (response) {
        var that = {};

        that.addQueryParameter = function () {
            return that;
        };
        that.send = function (callback) {
            setTimeout(function () {
                var error = null;
                callback(error, response || sampleResponse);
            }, 0);
        };

        return that;
    };

    var sampleResponse = {
        type: "aType",
        someProperty: "someValue"
    };
})(Notes);
