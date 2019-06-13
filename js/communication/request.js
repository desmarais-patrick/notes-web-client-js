(function (Notes) {
    Notes.communication.request = function(options) {
        var that = {};

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
            if (method === null) {
                throw new Error("Missing method for request");
            }

            if (path === null) {
                throw new Error("Missing path for request");
            }
            
            var url = _buildUrl();
    
            // TODO Create sub-classes to Request with different implementations for POST, PUT, DELETE, etc.
    
            // TODO Add browser API to send a request.
            // TODO Inject browser API to allow for unit testing.
            callback(new Error("Request.send [not implemented]"), null);

            if (body === null) {
                // Send empty.
            } else {
                // Send with body.
            }
            return;
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
