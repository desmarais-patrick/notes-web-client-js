"use strict";

(function (Notes) {
    Notes.communication.requestBuilder = function (options) {
        var that = {};

        var request = options.request;
        var baseUrl = options.baseUrl;

        that.delete = function (path) {
            return request({
                method: "DELETE",
                baseUrl: baseUrl,
                path: path,
                body: null
            });
        };
    
        that.get = function (path) {
            return request({
                method: "GET",
                baseUrl: baseUrl,
                path: path,
                body: null
            });
        };

        that.post = function (path, body) {
            return request({
                method: "POST",
                baseUrl: baseUrl,
                path: path,
                body: body
            });
        }

        that.put = function (path, body) {
            return request({
                method: "PUT",
                baseUrl: baseUrl,
                path: path,
                body: body
            });
        }

        return that;
    };
})(Notes);
