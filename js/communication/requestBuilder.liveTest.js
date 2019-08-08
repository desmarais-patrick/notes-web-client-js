"use strict";

(function (Notes) {
    var requestBuilderTestScript = function (options) {
        var expect = options.expect;
        var testSuiteBuilder = options.testSuiteBuilder;

        var testSuite = testSuiteBuilder.createTestSuite("RequestBuilder (LiveTest)");

        testSuite.setup();

        var XMLHttpRequest = window.XMLHttpRequest;
        var configuration = testSuite.configuration;
        var requestBuilder = Notes.communication.requestBuilder({
            XMLHttpRequest: XMLHttpRequest,
            requestTimeoutInMillis: 30000,

            request: Notes.communication.request,
            baseUrl: configuration.apiServerBaseUrl
        });

        var dateUtilities = Notes.utilities.dateUtilities();
        var userUtilities = Notes.utilities.userUtilities({
            dateUtilities: dateUtilities,
            Date: window.Date,
            Math: window.Math
        });
        var user = userUtilities.generateUser();

        testSuite.start();

        var scenario1Test = testSuite.test("CRUD", function () {
            // List empty or not.
            requestBuilder.get("/notes")
                .addQueryParameter("limit", 10)
                .addQueryParameter("offset", 0)
                .setHeader("Notes-User", user)
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
                    .setHeader("Notes-User", user)
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
                    .setHeader("Notes-User", user)
                    .send(function (err, response) {
                        try {
                            expect(err).toBeNull();
                            expect(response).toBeObject();
                            expect(response.items.length).toBeGreaterThan(0);
                        } catch (expectError) {
                            scenario1Test.fail(expectError.stack.toString());
                            return;
                        }
    
                        var lastOnesIndex = response.items.length - 1;
                        var lastOne = response.items[lastOnesIndex];
                        getTheOne(lastOne.id);
                    });
            };

            var getTheOne = function (id) {
                requestBuilder.get("/notes/" + id)
                    .setHeader("Notes-User", user)
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
                    .setHeader("Notes-User", user)
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
                    .setHeader("Notes-User", user)
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

        var scenario2Test = testSuite.test("Invalid URL", function () {
            requestBuilder.get("/invalid-url")
                .setHeader("Notes-User", user)
                .send(function (err, response) {
                    try {
                        expect(err).toNotBeNull();
                        scenario2Test.success();
                    } catch (expectError) {
                        scenario2Test.fail(expectError.stack.toString());
                    }
                });
        });

        // TODO Unit test without header.

        testSuite.end();

        testSuite.teardown();

        return testSuite;
    };
    Notes.test.testScripts.push(requestBuilderTestScript);
})(Notes);
