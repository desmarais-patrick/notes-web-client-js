"use strict";

(function (Notes) {
    Notes.communication.requestBuilder = function (options) {
        var that = {};

        var XMLHttpRequest = options.XMLHttpRequest;

        var request = options.request;

        var baseUrl = options.baseUrl;
        var requestTimeoutInMillis = requestTimeoutInMillis;

        that.delete = function (path) {
            return request({
                XMLHttpRequest: XMLHttpRequest,
                requestTimeoutInMillis: requestTimeoutInMillis,

                method: "DELETE",
                baseUrl: baseUrl,
                path: path,
                body: null
            });
        };
    
        that.get = function (path) {
            return request({
                XMLHttpRequest: XMLHttpRequest,
                requestTimeoutInMillis: requestTimeoutInMillis,

                method: "GET",
                baseUrl: baseUrl,
                path: path,
                body: null
            });
        };

        that.post = function (path, body) {
            return request({
                XMLHttpRequest: XMLHttpRequest,
                requestTimeoutInMillis: requestTimeoutInMillis,

                method: "POST",
                baseUrl: baseUrl,
                path: path,
                body: body
            });
        }

        that.put = function (path, body) {
            return request({
                XMLHttpRequest: XMLHttpRequest,
                requestTimeoutInMillis: requestTimeoutInMillis,

                method: "PUT",
                baseUrl: baseUrl,
                path: path,
                body: body
            });
        }

        return that;
    };
})(Notes);
