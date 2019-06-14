"use strict";

(function (Notes) {
    var requestTestScript = function (options) {
        var expect = options.expect;
        var testSuiteBuilder = options.testSuiteBuilder;
        var xmlHttpRequestMock = options.xmlHttpRequestMock;

        var testSuite = testSuiteBuilder.createTestSuite("Request");

        testSuite.setup();

        testSuite.start();

        var queryParamsTest = testSuite.test("Request with query parameters", function () {
            var baseUrl = "http://someUrl";
            var path = "/a/path";
            var expectedUrl = baseUrl + path + "?someKey1=someValue1&someKey2=someValue2";
            var SuccessXMLHttpRequestMock = xmlHttpRequestMock({
                responseStatus: 200,
                responseText: '{"someProperty":"someJson"}',
    
                expectedUrl: expectedUrl
            });
            Notes.communication.request({
                XMLHttpRequest: SuccessXMLHttpRequestMock,
                requestTimeoutInMillis: 2000,
                method: "SOME_METHOD",
                baseUrl: baseUrl,
                path: path,
                body: null
            })
                .addQueryParameter("someKey1", "someValue1")
                .addQueryParameter("someKey2", "someValue2")
                .send(function (err, response) {
                    try {
                        expect(err).toBeNull();
                        expect(response).toBeObject();
                        queryParamsTest.success();
                    } catch (expectError) {
                        queryParamsTest.fail(expectError.stack.toString());
                    }
                });
        });

        // TODO Test for timeout ==> It returns an error!
        // TODO Test for error ==> It bubbles up the error!

        testSuite.end();

        testSuite.teardown();
    };

    Notes.test.testScripts.push(requestTestScript);
})(Notes);
