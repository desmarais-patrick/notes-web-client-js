"use strict";

(function (Notes) {
    Notes.test.mocks.requestBuilderMock = function () {
        var that = {};

        // DELETE
        that.delete = null;
    
        // GET
        that.get = null;

        // POST
        that.post = null;
        that.setNextPostResponseAsNoteCreatedWithId = function (id) {
            that.post = function () {
                return requestMock(null, {
                    type: "NoteCreated",
                    id: id
                });
            };
        };
        that.setNextPostResponseAsOfflineError = function () {
            that.post = function () {
                return requestMock(new Error("[RequestBuilderMock] Offline!"),
                    null);
            };
        };

        // PUT
        that.put = null;

        return that;
    };

    var requestMock = function (error, response) {
        var that = {};

        that.addQueryParameter = function () {
            return that;
        };
        that.send = function (callback) {
            setTimeout(function () {
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
