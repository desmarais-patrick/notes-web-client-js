// TODO How to run this test?
// TODO How to not upload this file?

(function (Notes) {
    var requestBuilderTestScript = function (options) {
        var expect = options.expect;
        var testSuiteBuilder = options.testSuiteBuilder;

        var testSuite = testSuiteBuilder.createTestSuite("RequestBuilder");

        testSuite.setup();

        var XMLHttpRequestMockBuilder = function (options) {
            function XMLHttpRequestMock() {
                this.onload = null;
            }
            XMLHttpRequestMock.prototype.open = function (method, url) {};
            XMLHttpRequestMock.prototype.send = function (body) {
                var that = this;
                setTimeout(function () {
                    that.status = options.responseStatus;
                    that.responseText = options.responseText;
                    that.onload();
                }, 0);
            };
            return XMLHttpRequestMock;
        };
        var RequestMockSuccess = XMLHttpRequestMockBuilder({
            responseStatus: 200,
            responseText: '{"someProperty":"someJson"}'
        });
        var RequestMockError = XMLHttpRequestMockBuilder({
            responseStatus: 500,
            responseText: '{"someError":500}'
        });

        var configuration = testSuite.configuration;

        var requestBuilder = Notes.communication.requestBuilder({
            XMLHttpRequest: RequestMockSuccess,
            requestTimeoutInMillis: 30000,

            request: Notes.communication.request,
            baseUrl: configuration.apiServerBaseUrl
        });
        var errorRequestBuilder = Notes.communication.requestBuilder({
            XMLHttpRequest: RequestMockError,
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

        var getWithParamsTest = testSuite.test("GET request (with parameters)", function () {
            requestBuilder.get("/notes")
                .addQueryParameter("limit", 10)
                .addQueryParameter("offset", 0)
                .send(function (err, response) {
                    try {
                        expect(err).toBeNull();
                        expect(response).toBeObject();
                        getWithParamsTest.success();
                    } catch (expectError) {
                        getWithParamsTest.fail(expectError.stack.toString());
                    }
                });
        });

        var errorTest = testSuite.test("GET request (with server error)", function () {
            errorRequestBuilder.get("serverReturnsBadRequest")
                .send(function (err, response) {
                    try {
                        expect(err).toNotBeNull();
                        errorTest.success();
                    } catch (expectError) {
                        errorTest.fail(expectError.stack.toString());
                    }
                });
        });

        var postBody = JSON.stringify({ someKey: "someValue" });
        var postTest = testSuite.test("POST request", function () {
            requestBuilder.post("/notes", postBody)
                .send(function (err, response) {
                    try {
                        expect(err).toBeNull();
                        expect(response).toBeObject();
                        postTest.success();
                    } catch (expectError) {
                        postTest.fail(expectError.stack.toString());
                    }
                });
        });

        var putBody = JSON.stringify({ id: 1, someKey: "someValue" });
        var putTest = testSuite.test("PUT request", function () {
            requestBuilder.post("/notes/1", putBody)
                .send(function (err, response) {
                    try {
                        expect(err).toBeNull();
                        expect(response).toBeObject();
                        putTest.success();
                    } catch (expectError) {
                        putTest.fail(expectError.stack.toString());
                    }
                });
        });

        testSuite.end();

        testSuite.teardown();

        return testSuite;
    };

    Notes.test.testScripts.push(requestBuilderTestScript);

})(Notes);
