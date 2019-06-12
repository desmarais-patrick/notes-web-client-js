(function (Notes) {
    var baseUrl = Notes.configuration.apiServerBaseUrl;

    function Request() {
        this.method = null;
        this.url = null;
        this.queryParams = null;
        this.body = null;
    } // (?) How to do inheritance again in JavaScript?
    // (?) Use class? See about the browser supported?

    Request.prototype.delete = function (path) {
        this.method = "DELETE";
        this.path = path;
        return this;
    }
    Request.prototype.get = function (path) {
        this.method = "GET";
        this.path = path;
        return this;
    }
    Request.prototype.post = function (path, body) {
        this.method = "POST";
        this.path = path;
        this.body = body;
        return this;
    }
    Request.prototype.put = function (path, body) {
        this.method = "PUT";
        this.path = path;
        this.body = body;
        return this;
    }

    Request.prototype.addQueryParameter = function (key, value) {
        if (!this.queryParams) {
            this.queryParams = {};
        }

        this.queryParams[key] = value;
        return this;
    }

    Request.prototype.send = function (callback) {
        if (this.method === null) {
            throw new Error("Missing method for request");
        }
        
        var url = this._buildUrl();

        // TODO Create sub-classes to Request with different implementations for POST, PUT, DELETE, etc.

        // TODO Add browser API to send a request.
        // TODO Inject browser API to allow for unit testing.
        callback(new Error("Request.send is not implemented"), null)
        return;
    }

    Request.prototype._buildUrl = function () {
        if (this.url === null) {
            throw new Error("Missing URL for request");
        }

        var url = baseUrl + this.url;

        if (this.queryParams !== null) {
            url += "?";

            var queryParamKeys = Object.keys(this.queryParams);
            for (var i = 0; i < queryParamKeys.length; i++) {
                url += key + "=" + this.queryParams[key];
            }
        }

        return url;
    }

    if (!Notes.communication) {
        Notes.communication = {};
    }
    Notes.communication.Request = Request;
})(Notes);
