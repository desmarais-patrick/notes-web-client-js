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
})(Notes);
