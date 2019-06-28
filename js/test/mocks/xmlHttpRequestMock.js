"use strict";

(function (Notes) {
    Notes.test.mocks.xmlHttpRequestMock = function (options) {
        var responseStatus = options.responseStatus;
        var responseText = options.responseText;

        var expectedMethod = options.expectedMethod;
        var expectedUrl = options.expectedUrl;
        var expectedBody = options.expectedBody;

        function XMLHttpRequestMock() {
            this.onload = null;
        }
        XMLHttpRequestMock.prototype.open = function (method, url) {
            if (expectedMethod && expectedMethod !== method) {
                throw new Error("Method " + method + " does NOT match " + expectedMethod);
            }
            if (expectedUrl && expectedUrl !== url) {
                throw new Error("URL " + url + " does NOT match " + expectedUrl);
            }
        };
        XMLHttpRequestMock.prototype.send = function (body) {
            if (expectedBody && expectedBody !== body) {
                throw new Error("Body " + body + " does NOT match " + expectedBody);
            }

            var that = this;
            setTimeout(function () {
                that.status = responseStatus;
                that.responseText = responseText;
                that.onload();
            }, 0);
        };
        return XMLHttpRequestMock;
    };
    Notes.test.mocks.xmlHttpRequestMock2 = function (sendCallback) {
        function XMLHttpRequestMock() {
            this.onload = null;
        }
        XMLHttpRequestMock.prototype.open = function (method, url) { };
        XMLHttpRequestMock.prototype.send = function (body) {
            sendCallback(this);
        };
        XMLHttpRequestMock.prototype.load = function (options, callback) {
            var that = this;
            setTimeout(function () {
                that.status = options.responseStatus;
                that.responseText = options.responseText;
                that.onload();
                callback();
            }, 0);
        };
        return XMLHttpRequestMock;
    };
})(Notes);
