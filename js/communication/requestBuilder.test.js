// TODO How to run this test?
// TODO How to not upload this file?

(function (Notes) {
    var test = function (testSuiteBuilder) {
        var testSuite = testSuiteBuilder.createTestSuite("RequestBuilder");
        // DELETE request
        // GET request
        // GET request with query params
        // POST request with body
        // PUT request with body

        // Check method matches
        // Check url compound
        // Check body is added
        // Mock has checks?
        // Skip these checks since obvious and trivial.
        // Tests only as documentation for how to use methods!

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
        var configuration = {
            name: "test",
            apiServerBaseUrl: "http://someBaseUrl/"
        };

        var requestBuilder = new Notes.communication.RequestBuilder({
            XMLHttpRequest: XMLHttpRequestMock,
            configuration: configuration
        });

        testSuite.start();

        // Test     DELETE request.
        var deleteTest = testSuite.addTest("DELETE request");
        requestBuilder.delete("/notes/1")
            .send(function (err, response) {
                // Err is null.
                // Response is a json.
                deleteTest.success();
            });


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

        testSuite.end();
    }

    Notes.tests.push(test);

})(Notes.communication.request);
