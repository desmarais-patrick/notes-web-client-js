// TODO How to run this test?
// TODO How to not upload this file?

(function (Notes) {
    var requestBuilderTestScript = function (testSuiteBuilder) {
        var testSuite = testSuiteBuilder.createTestSuite("RequestBuilder");

        testSuite.setup();

        var XMLHttpRequestMock = function () {
            return {
                onreadystateload: {},
                send: function (body) {
                    setTimeout(function () {
                        // To be completed.
                    }, 1);
                }
            };
        };
        var configuration = testSuite.configuration;

        var requestBuilder = Notes.communication.requestBuilder({
            XMLHttpRequest: XMLHttpRequestMock,

            request: Notes.communication.request,
            baseUrl: configuration.apiServerBaseUrl
        });

        testSuite.start();

        var deleteTest = testSuite.test("DELETE request", function () {
            requestBuilder.delete("/notes/1")
            .send(function (err, response) {
                if (err !== null) {
                    deleteTest.fail(new Error("Expected `err` to be null, instead" + err));
                    return;
                }
                if (typeof response === "object") {
                    deleteTest.fail(new Error("Expected `response` to not be null"));
                    return;
                }
                deleteTest.success();
            });
        });
        
/*

        // Test     GET request.
        requestBuilder.get("/notes/1")
            .send(function (err, response) {
                // Err is null.
                // Response is a json.
            });
        
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
