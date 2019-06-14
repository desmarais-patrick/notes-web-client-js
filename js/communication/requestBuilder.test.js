// TODO How to run this test?
// TODO How to not upload this file?

(function (Notes) {
    var requestBuilderTestScript = function (options) {
        var expect = options.expect;
        var testSuiteBuilder = options.testSuiteBuilder;

        var testSuite = testSuiteBuilder.createTestSuite("RequestBuilder");

        testSuite.setup();

        var XMLHttpRequestMockBuilder = function () {
            function XMLHttpRequestMock() {}
            XMLHttpRequestMock.prototype.open = function (method, url) {};
            XMLHttpRequestMock.prototype.send = function (body) {
                var that = this;
                setTimeout(function () {
                    that.status = 200;
                    that.responseText = '{"someProperty":"someJson"}';
                    that.onload();
                }, 1);
            };
            return XMLHttpRequestMock;
        };
        var configuration = testSuite.configuration;

        var requestBuilder = Notes.communication.requestBuilder({
            XMLHttpRequest: XMLHttpRequestMockBuilder(),
            requestTimeoutInMillis: 30000,

            request: Notes.communication.request,
            baseUrl: configuration.apiServerBaseUrl
        });

        testSuite.start();

        var deleteTest = testSuite.test("DELETE request", function () {
            requestBuilder.delete("/notes/1")
            .send(function (err, response) {
                try {
                    expect(err).toBeNull();
                    expect(response).toBeObject();
                    deleteTest.success();
                } catch (expectError) {
                    deleteTest.fail(expectError.stack.toString());
                }
            });
        });
        
        var getTest = testSuite.test("GET request", function () {
            requestBuilder.get("/notes/1")
            .send(function (err, response) {
                try {
                    expect(err).toBeNull();
                    expect(response).toBeObject();
                    getTest.success();
                } catch (expectError) {
                    getTest.fail(expectError.stack.toString());
                }
            });
        });
        
        /*
        // Test     GET request with parameters.
        requestBuilder.get("/notes")
            .addQueryParameter("limit", 10)
            .addQueryParameter("offset", 0)
            .send(function (err, response) {
                // Err is null.
                // Response is a json.
            });

        var errorRequest = Request.get("serverReturnsBadRequest")
            .send(function (err, response) {
                // Err is not null.
                // Response is null.
            });

        var body = { someKey: "someValue" };
        var postRequest = Request.post("/notes", body)
            .send(function (err, response) {
                // Err is null.
                // Response is a json.
            });
        var putRequest = Request.put("/notes/1", body)
            .send(function (err, response) {
                // Err is null.
                // Response is a json.
            });
            */

        testSuite.end();

        testSuite.teardown();

        return testSuite;
    };

    Notes.test.testScripts.push(requestBuilderTestScript);

})(Notes);
