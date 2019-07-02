(function (Notes) {
    Notes.communication.request = function(options) {
        var that = {};

        var XMLHttpRequest = options.XMLHttpRequest;
        var requestTimeoutInMillis = options.requestTimeoutInMillis;

        var method = options.method;
        var baseUrl = options.baseUrl;
        var path = options.path;
        var body = options.body;

        var queryParams = null;

        that.addQueryParameter = function (key, value) {
            if (!queryParams) {
                queryParams = {};
            }
    
            queryParams[key] = value;
            return that;
        };

        that.send = function (callback) {
            var request = new XMLHttpRequest();

            if (method === null) {
                throw new Error("Missing method for request");
            }
            var url = _buildUrl();
            request.open(method, url);
            request.onload = function () {
                var status = request.status;
                var responseContent = request.responseText;

                var SUCCESS_RESPONSE_STATUSES = [200, 201];
                if (SUCCESS_RESPONSE_STATUSES.indexOf(status) === -1) {
                    var error = new Error(
                        "Request received error (or unknown) response status for " + 
                        method + " " + url + ". " +
                        "Response status was: " + status + ". " +
                        "(Expected " + SUCCESS_RESPONSE_STATUSES.toString() + ") " + 
                        "Response content was: " + responseContent + ".");
                    callback(error);
                    return;
                }

                try {
                    // Expecting JSON.
                    var responseContentAsJson = JSON.parse(responseContent);
                } catch (err) {
                    var error = new Error(
                        "Request failed to parse response for " + 
                        method + " " + url + "." +
                        "Response was: " + responseContent);
                    callback(error);
                    return;
                }

                callback(null, responseContentAsJson);
            };

            request.timeout = requestTimeoutInMillis;
            request.ontimeout = function () {
                var error = new Error(
                    "Request didn't receive response under " + 
                    requestTimeoutInMillis + "ms " +
                    "for " + url + "."
                );
                callback(error);
            };

            // TODO Or maybe it throws! :s
            request.onerror = function (err) {
                var error = new Error("Request for '" + method + " " + url + 
                    "' completed with error: " + err.stack);
                callback(error);
            };

            request.send(body);
        };

        var _buildUrl = function () {
            if (path === null) {
                throw new Error("Missing path for request");
            }
    
            var url = baseUrl + path + _buildQueryParameterString();
            return url;
        }

        var _buildQueryParameterString = function () {
            if (queryParams === null) {
                return "";
            }

            var queryParamTuples = [];
            Object.keys(queryParams).forEach(function (key) {
                var tuple = key + "=" + queryParams[key];
                queryParamTuples.push(tuple);
            });

            return "?" + queryParamTuples.join("&");
        }

        return that;
    };
})(Notes);
