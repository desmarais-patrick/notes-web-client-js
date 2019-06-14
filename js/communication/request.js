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

            request.timeout = requestTimeoutInMillis;
            request.ontimeout = function () {
                var error = new Error(
                    "Request didn't receive response under " + 
                    requestTimeoutInMillis + "ms " +
                    "for " + url + "."
                );
                callback(error);
            };

            if (method === null) {
                throw new Error("Missing method for request");
            }
            var url = _buildUrl();
            request.open(method, url);
            request.onload = function () {
                var status = request.status;
                var responseContent = request.responseText;

                if (status !== 200) {
                    var error = new Error(
                        "Request received error response for " + 
                        method + " " + url + ". " +
                        "Response status was: " + status + ". " +
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

                callback(1, responseContentAsJson);
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
            
            var queryParameterString = "?";
            var queryParamKeys = Object.keys(queryParams);
            for (var i = 0; i < queryParamKeys.length; i++) {
                url += key + "=" + this.queryParams[key];
            }

            return queryParameterString;
        }

        return that;
    };
})(Notes);
