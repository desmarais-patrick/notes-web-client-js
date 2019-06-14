"use strict";

(function (Notes) {
    var requestBuilderTestScript = function (options) {
        var expect = options.expect;
        var testSuiteBuilder = options.testSuiteBuilder;

        var testSuite = testSuiteBuilder.createTestSuite("RequestBuilder (LiveTest)");

        testSuite.setup();

        var XMLHttpRequest = window.XMLHttpRequest;
        var configuration = testSuite.configuration;

        var requestBuilderFactory = function (timeoutInMillis) {
            return Notes.communication.requestBuilder({
                XMLHttpRequest: XMLHttpRequest,
                requestTimeoutInMillis: timeoutInMillis,
    
                request: Notes.communication.request,
                baseUrl: configuration.apiServerBaseUrl
            });
        };
        var requestBuilder = requestBuilderFactory(30000);
        var impatientRequestBuilder = requestBuilderFactory(10);

        testSuite.start();

        var scenario1Test = testSuite.test("CRUD", function () {
            // List empty or not.
            requestBuilder.get("/notes")
                .addQueryParameter("limit", 10)
                .addQueryParameter("offset", 0)
                .send(function (err, response) {
                    try {
                        expect(err).toBeNull();
                        expect(response).toBeObject();
                    } catch (expectError) {
                        scenario1Test.fail(expectError.stack.toString());
                        return;
                    }

                    createOne();
                });
            
            var createOne = function () {
                var date = new Date();
                var note = {text: "someText", date: date.toISOString()};
                var noteAsString = JSON.stringify(note);
                requestBuilder.post("/notes", noteAsString)
                    .send(function (err, response) {
                        try {
                            expect(err).toBeNull();
                            expect(response).toBeObject();
                        } catch (expectError) {
                            scenario1Test.fail(expectError.stack.toString());
                            return;
                        }
    
                        listAtLeastOne();
                    });
            };
            
            var listAtLeastOne = function () {
                requestBuilder.get("/notes")
                    .addQueryParameter("limit", 10)
                    .addQueryParameter("offset", 0)
                    .send(function (err, response) {
                        try {
                            expect(err).toBeNull();
                            expect(response).toBeObject();
                            expect(response.items.length).toBeGreaterThan(0);
                        } catch (expectError) {
                            scenario1Test.fail(expectError.stack.toString());
                            return;
                        }
    
                        var lastOne = response.items[response.items.length];
                        getTheOne(lastOne.id);
                    });
            };

            var getTheOne = function (id) {
                requestBuilder.get("/notes/" + id)
                    .send(function (err, response) {
                        try {
                            expect(err).toBeNull();
                            expect(response).toBeObject();
                            expect(response.id).toEqual(id);
                        } catch (expectError) {
                            scenario1Test.fail(expectError.stack.toString());
                            return;
                        }

                        var newText = "New text at " + (new Date()).toISOString();
                        response.text = newText;
                        updateTheOne(id, response);
                    });
            };

            var updateTheOne = function (id, updatedNote) {
                var noteAsString = JSON.stringify(updatedNote);
                requestBuilder.put("/notes/" + id, noteAsString)
                    .send(function (err, response) {
                        try {
                            expect(err).toBeNull();
                            expect(response).toBeObject();
                        } catch (expectError) {
                            scenario1Test.fail(expectError.stack.toString());
                            return;
                        }

                        deleteTheOne(id);
                    });
            };

            var deleteTheOne = function (id) {
                requestBuilder.delete("/notes/" + id)
                    .send(function (err, response) {
                        try {
                            expect(err).toBeNull();
                            expect(response).toBeObject();
                        } catch (expectError) {
                            scenario1Test.fail(expectError.stack.toString());
                            return;
                        }

                        scenario1Test.success();
                    });
            };
        });

        /*


        // 404
        // 400
        // timeout
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
        });*/

        testSuite.end();

        testSuite.teardown();

        return testSuite;
    };
    Notes.test.testScripts.push(requestBuilderTestScript);
})(Notes);
