"use strict";

(function (Notes) {
    var changeEventableTestScript = function (options) {
        var expect = options.expect;
        var testSuiteBuilder = options.testSuiteBuilder;

        var testSuite = testSuiteBuilder.createTestSuite("[Model] ChangeEventableBehaviour");

        testSuite.setup();

        var createChangeEvent = Notes.model.changeEvent;
        var changeEventBuilder = Notes.model.changeEventBuilder({
            createChangeEvent: createChangeEvent
        });
        var changeEventableBehaviour = Notes.model.changeEventableBehaviour({
            changeEventBuilder: changeEventBuilder
        });

        testSuite.start();

        var changeEventableTest = testSuite.test("Lifecycle and change events", function () {
            var fakeHost = {
                someProperty: "some value",
                triggerChange: function (newValue) {
                    this.someProperty = newValue;
                    this.notifyChange();
                }
            };
            changeEventableBehaviour.addBehaviourTo({
                host: fakeHost,
                name: "Fake Host"
            });

            // Imagine someone wants to listen for change events on fake host.

            var latestSource = null;
            var changeEventListener = function (changeEvent) {
                latestSource = changeEvent.getSource();
            };
            fakeHost.addChangeEventListener(changeEventListener);
            expect(latestSource).toEqual(fakeHost);
            expect(latestSource.someProperty).toEqual("some value");

            // A change occurs.

            latestSource = null;
            fakeHost.triggerChange("some other value");
            expect(latestSource).toEqual(fakeHost);
            expect(latestSource.someProperty).toEqual("some other value");

            // Imagine this someone is no longer interested in changes.

            latestSource = null;
            fakeHost.removeChangeEventListener(changeEventListener);
            fakeHost.triggerChange("some other value again");
            expect(latestSource).toEqual(null);

            changeEventableTest.success();
        });

        testSuite.end();

        testSuite.teardown();

        return testSuite;
    };

    Notes.test.testScripts.push(changeEventableTestScript);
})(Notes);
