"use strict";

(function (Notes) {
    var noteListTestScript = function (options) {
        var expect = options.expect;
        var testSuiteBuilder = options.testSuiteBuilder;

        var testSuite = testSuiteBuilder.createTestSuite("[Model] NoteList");

        testSuite.setup();

        var createNote = Notes.model.note;
        var createNoteList = Notes.model.noteList;
        var testOptions = {
            NOTE_LIST_STATUS_ENUM: Notes.model.noteList.NOTE_LIST_STATUS_ENUM
        };

        testSuite.start();

        var emptyTest = testSuite.test("Empty", function () {
            var NOTE_LIST_STATUS_ENUM = testOptions.NOTE_LIST_STATUS_ENUM;
            var noteList = createNoteList();
            try {
                expect(noteList.getList().length).toEqual(0);
                expect(noteList.hasMore()).toEqual(true);
                expect(noteList.getStatus()).toEqual(NOTE_LIST_STATUS_ENUM.EMPTY);
                emptyTest.success();
            } catch (expectError) {
                emptyTest.fail(expectError.stack.toString());
            }
        });

        var insertManyTest = testSuite.test("InsertMany", function () {
            var noteList = createNoteList();

            var note1 = createNote("1", "some text 1", new Date());
            var note2 = createNote("2", "some text 2", new Date());
            var note3 = createNote("3", "some text 3", new Date());
            var newNotes = [note3, note2, note1];

            noteList.insertMany(newNotes);

            try {
                var list = noteList.getList();
                expect(list.length).toEqual(3);
                expect(list[0].getId()).toEqual("3");
                insertManyTest.success();
            } catch (expectError) {
                insertManyTest.fail(expectError.stack.toString());
            }
        });

        var insertOneTest = testSuite.test("InsertOne", function () {
            var noteList = createNoteList();

            var note1 = createNote("1", "some text 1", new Date("2019-01-01"));
            var note2 = createNote("2", "some text 2", new Date("2019-01-02"));
            var note3 = createNote("3", "some text 3", new Date("2019-01-03"));
            var newNotes = [note3, note2, note1];
            noteList.insertMany(newNotes);

            var note4 = createNote("4", "some text 4", new Date("2019-01-04"));
            noteList.insertOne(note4);

            try {
                var list = noteList.getList();
                expect(list.length).toEqual(4);
                expect(list[0].getId()).toEqual("4");
                insertOneTest.success();
            } catch (expectError) {
                insertOneTest.fail(expectError.stack.toString());
            }
        });

        var deleteTest = testSuite.test("Delete", function () {
            var noteList = createNoteList();

            var note1 = createNote("1", "some text 1", new Date("2019-01-01"));
            var note2 = createNote("2", "some text 2", new Date("2019-01-02"));
            var note3 = createNote("3", "some text 3", new Date("2019-01-03"));
            var newNotes = [note3, note2, note1];
            noteList.insertMany(newNotes);

            noteList.delete("3");

            try {
                var list = noteList.getList();
                expect(list.length).toEqual(2);
                expect(list[0].getId()).toEqual("2");
                deleteTest.success();
            } catch (expectError) {
                deleteTest.fail(expectError.stack.toString());
            }
        });

        var updateTest = testSuite.test("Update", function () {
            var noteList = createNoteList();

            var note1 = createNote("1", "some text 1", new Date("2019-01-01"));
            var note2 = createNote("2", "some text 2", new Date("2019-01-02"));
            var note3 = createNote("3", "some text 3", new Date("2019-01-03"));
            var newNotes = [note3, note2, note1];
            noteList.insertMany(newNotes);

            var updatedNote = createNote("3", "some new text 3", new Date("2019-01-03"));
            noteList.update(updatedNote);

            try {
                var list = noteList.getList();
                expect(list.length).toEqual(3);
                expect(list[0].getId()).toEqual("3");
                expect(list[0].getText()).toEqual("some new text 3");
                updateTest.success();
            } catch (expectError) {
                updateTest.fail(expectError.stack.toString());
            }
        });

        // InsertMany
        // Insert One
        // Delete
        // Update

        testSuite.end();

        testSuite.teardown();

        return testSuite;
    };

    Notes.test.testScripts.push(noteListTestScript);
})(Notes);
