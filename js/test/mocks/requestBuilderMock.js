"use strict";

(function (Notes) {
    Notes.test.mocks.requestBuilderMock = function () {
        var that = {};

        // DELETE
        that.delete = null;
        that.setNextDeleteResponseAsOfflineError = function () {
            that.delete = function () {
                return requestMock(new Error("[RequestBuilderMock] Offline!"),
                    null);
            };
            return that;
        };
    
        // GET
        that.get = null;
        that.setNextGetResponseAsOfflineError = function () {
            that.get = function () {
                return requestMock(new Error("[RequestBuilderMock] Offline!"),
                    null);
            };
            return that;
        };

        // POST
        that.post = null;
        that.setNextPostResponseAsNoteCreatedWithId = function (id) {
            that.post = function () {
                return requestMock(null, {
                    type: "NoteCreated",
                    id: id
                });
            };
            return that;
        };
        that.setNextPostResponseAsOfflineError = function () {
            that.post = function () {
                return requestMock(new Error("[RequestBuilderMock] Offline!"),
                    null);
            };
            return that;
        };

        // PUT
        that.put = null;
        that.setNextPutResponseAsOfflineError = function () {
            that.put = function () {
                return requestMock(new Error("[RequestBuilderMock] Offline!"),
                    null);
            };
            return that;
        };

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
