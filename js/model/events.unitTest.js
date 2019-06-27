"use strict";

(function (Notes) {
    var eventsTestScript = function (options) {
        var expect = options.expect;
        var testSuiteBuilder = options.testSuiteBuilder;

        var testSuite = testSuiteBuilder.createTestSuite("[Model] Events");

        testSuite.setup();

        var createEvents = Notes.model.events;

        testSuite.start();

        var test1 = testSuite.test("Dispatch and listen", function () {
            var events = createEvents();

            // Dispatch.
            events.dispatch("a topic", "an event", {someKey: "some value"});

            // Listen.
            var iterator = events.listen("a topic");
            expect(iterator.get()).toBeNull();
            expect(iterator.hasNext()).toEqual(true);
            expect(iterator.next()).toNotBeNull();
            expect(iterator.get().name).toEqual("an event");
            expect(iterator.get().options).toNotBeNull();
            expect(iterator.get().options.someKey).toEqual("some value");

            test1.success();
        });

        var test2 = testSuite.test("Listen and dispatch", function () {
            var events = createEvents();

            // Listen.
            var iterator = events.listen("a topic");
            expect(iterator.get()).toBeNull();
            expect(iterator.hasNext()).toEqual(false);

            // Dispatch.
            events.dispatch("a topic", "an event", {someKey: "some value"});

            // Listen.
            expect(iterator.hasNext()).toEqual(true);
            expect(iterator.next()).toNotBeNull();
            expect(iterator.get().name).toEqual("an event");
            expect(iterator.get().options).toNotBeNull();
            expect(iterator.get().options.someKey).toEqual("some value");

            test2.success();
        });

        var test3 = testSuite.test("Replay events", function () {
            var events = createEvents();

            // Listen.
            var iterator = events.listen("a topic");
            expect(iterator.get()).toBeNull();
            expect(iterator.hasNext()).toEqual(false);

            // Dispatch.
            events.dispatch("a topic", "an event 1", {someKey: "some value 1"});
            events.dispatch("a topic", "an event 2", {someKey: "some value 2"});
            events.dispatch("a topic", "an event 3", {someKey: "some value 3"});

            // Listen.
            expect(iterator.next().options.someKey).toEqual("some value 1");
            expect(iterator.next().options.someKey).toEqual("some value 2");
            expect(iterator.next().options.someKey).toEqual("some value 3");

            test3.success();
        });

        testSuite.end();

        testSuite.teardown();

        return testSuite;
    };

    Notes.test.testScripts.push(eventsTestScript);
})(Notes);
