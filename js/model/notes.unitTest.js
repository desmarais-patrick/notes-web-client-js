"use strict";

(function (Notes) {
    var notesTestScript = function (options) {
        var expect = options.expect;
        var testSuiteBuilder = options.testSuiteBuilder;

        var testSuite = testSuiteBuilder.createTestSuite("[Model] Notes");

        testSuite.setup();

        var createEvents = Notes.model.events;
        var createNote = Notes.model.note;
        var createNotes = Notes.model.notes;
        var testOptions = {
            STATUS_ENUM: Notes.model.notes.STATUS_ENUM
        };

        testSuite.start();

        var emptyTest = testSuite.test("Empty", function () {
            var STATUS_ENUM = testOptions.STATUS_ENUM;
            var notes = createNotes({
                events: createEvents(),
                list: null,
                hasMore: null,
                status: null
            });
            try {
                expect(notes.getList().length).toEqual(0);
                expect(notes.hasMore()).toEqual(false);
                expect(notes.getStatus()).toEqual(STATUS_ENUM.READY);
                emptyTest.success();
            } catch (expectError) {
                emptyTest.fail(expectError.stack.toString());
            }
        });

        var insertManyTest = testSuite.test("InsertMany", function () {
            var notes = createNotes({
                events: createEvents(),
                list: null,
                hasMore: null,
                status: null
            });

            var note1 = createNote({
                clientId: null,
                id: "1",
                text: "some text 1",
                date: new Date("2019-01-01")
            });
            var note2 = createNote({
                clientId: null,
                id: "2",
                text: "some text 2",
                date: new Date("2019-01-02")
            });
            var note3 = createNote({
                clientId: null,
                id: "3",
                text: "some text 3",
                date: new Date("2019-01-03")
            });
            var newNotes = [note3, note2, note1];

            notes.insertMany(newNotes);

            try {
                var list = notes.getList();
                expect(list.length).toEqual(3);
                expect(list[0].getId()).toEqual("3");
                insertManyTest.success();
            } catch (expectError) {
                insertManyTest.fail(expectError.stack.toString());
            }
        });

        var insertOneTest = testSuite.test("InsertOne", function () {
            var notes = createNotes({
                events: createEvents(),
                list: null,
                hasMore: null,
                status: null
            });

            var note1 = createNote({
                clientId: null,
                id: "1",
                text: "some text 1",
                date: new Date("2019-01-01")
            });
            var note2 = createNote({
                clientId: null,
                id: "2",
                text: "some text 2",
                date: new Date("2019-01-02")
            });
            var note3 = createNote({
                clientId: null,
                id: "3",
                text: "some text 3",
                date: new Date("2019-01-03")
            });
            var newNotes = [note2, note3, note1];
            notes.insertMany(newNotes);

            var note4 = createNote({
                clientId: null,
                id: "4",
                text: "some text 4",
                date: new Date("2019-01-04")
            });
            notes.insertOne(note4);

            try {
                var list = notes.getList();
                expect(list.length).toEqual(4);
                expect(list[0].getId()).toEqual("4");
                insertOneTest.success();
            } catch (expectError) {
                insertOneTest.fail(expectError.stack.toString());
            }
        });

        var deleteTest = testSuite.test("Delete", function () {
            var notes = createNotes({
                events: createEvents(),
                list: null,
                hasMore: null,
                status: null
            });

            var note1 = createNote({
                clientId: null,
                id: "1",
                text: "some text 1",
                date: new Date("2019-01-01")
            });
            var note2 = createNote({
                clientId: null,
                id: "2",
                text: "some text 2",
                date: new Date("2019-01-02")
            });
            var note3 = createNote({
                clientId: null,
                id: "3",
                text: "some text 3",
                date: new Date("2019-01-03")
            });
            var newNotes = [note3, note2, note1];
            notes.insertMany(newNotes);

            var note3ClientId = note3.getClientId();
            notes.delete(note3ClientId);

            try {
                var list = notes.getList();
                expect(list.length).toEqual(2);
                expect(list[0].getId()).toEqual("2");
                deleteTest.success();
            } catch (expectError) {
                deleteTest.fail(expectError.stack.toString());
            }
        });

        var updateTest = testSuite.test("Update", function () {
            var notes = createNotes({
                events: createEvents(),
                list: null,
                hasMore: null,
                status: null
            });

            var note1 = createNote({
                clientId: null,
                id: "1",
                text: "some text 1",
                date: new Date("2019-01-01")
            });
            var note2 = createNote({
                clientId: null,
                id: "2",
                text: "some text 2",
                date: new Date("2019-01-02")
            });
            var note3 = createNote({
                clientId: null,
                id: "3",
                text: "some text 3",
                date: new Date("2019-01-03")
            });
            var newNotes = [note3, note2, note1];
            notes.insertMany(newNotes);

            var updatedNote = createNote({
                clientId: null,
                id: "3",
                text: "some new text 3",
                date: new Date("2019-01-03")
            });
            notes.update(updatedNote);

            try {
                var list = notes.getList();
                expect(list.length).toEqual(3);
                expect(list[0].getId()).toEqual("3");
                expect(list[0].getText()).toEqual("some new text 3");
                updateTest.success();
            } catch (expectError) {
                updateTest.fail(expectError.stack.toString());
            }
        });

        var eventsTest = testSuite.test("Events", function () {
            var events = createEvents();
            var notes = createNotes({
                events: events,
                list: null,
                hasMore: null,
                status: null
            });
            var STATUS_ENUM = testOptions.STATUS_ENUM;

            // A new list is dispatched!
            eventIterator = events.listen("change Notes.List");
            var note = createNote({
                clientId: null,
                id: "1",
                text: "some text 1",
                date: new Date("2019-01-01")
            });
            notes.insertMany([note]);
            expect(eventIterator.next().options.newList[0])
                .toEqual(note.getClientId());

            var newNote = createNote({
                clientId: null,
                id: "99",
                text: "some text 99",
                date: new Date("2019-01-25")
            });
            notes.insertOne(newNote);
            expect(eventIterator.next().options.newList[0])
                .toEqual(newNote.getClientId());

            // A new hasMore is dispatched.
            var eventIterator = events.listen("change Notes.HasMore");
            notes.setHasMore(true);
            expect(eventIterator.next().options.newHasMore)
                .toEqual(true);


            // A new status is dispatched!
            var eventIterator = events.listen("change Notes.Status");
            notes.setStatus(STATUS_ENUM.LOADING);
            expect(eventIterator.next().options.newStatus)
                .toEqual(STATUS_ENUM.LOADING);

            eventsTest.success();
        });

        testSuite.end();

        testSuite.teardown();

        return testSuite;
    };

    Notes.test.testScripts.push(notesTestScript);
})(Notes);
