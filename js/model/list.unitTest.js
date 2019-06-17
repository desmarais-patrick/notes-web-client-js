"use strict";

(function (Notes) {
    var noteListTestScript = function (options) {
        var expect = options.expect;
        var testSuiteBuilder = options.testSuiteBuilder;

        var testSuite = testSuiteBuilder.createTestSuite("[Model] NoteList");

        testSuite.setup();

        var createNoteList = Notes.model.noteList;

        testSuite.start();

        var updateTest = testSuite.test("Update notes from X", function () {
            var noteList = createNoteList();

            try {
                noteList.updateNotes(["1", "2", "3"], 0);
                expect(noteList.at(0).id).toEqual("1");
                expect(noteList.at(1).id).toEqual("2");
                expect(noteList.at(2).id).toEqual("3");


                noteList.updateNotes(["4", "5", "6"], 3);
                expect(noteList.at(0).id).toEqual("1");
                expect(noteList.at(1).id).toEqual("2");
                expect(noteList.at(4).id).toEqual("5");
                expect(noteList.at(5).id).toEqual("6");


                noteList.updateNotes(["7", "1", "2", "3", "4", "5", "6"], 0);
                expect(noteList.at(0).id).toEqual("7");
                expect(noteList.at(1).id).toEqual("1");
                expect(noteList.at(4).id).toEqual("4");
                expect(noteList.at(5).id).toEqual("5");

                updateTest.success();
            } catch (expectError) {
                updateTest.fail(expectError);
            }
        });

        var createNoteTest = testSuite.test("Create a new note X", function () {
            var noteList = createNoteList();

            try {
                noteList.updateNotes(["1", "2", "3"], 0);
                expect(noteList.at(0).id).toEqual("1");
                expect(noteList.getPosition("1")).toEqual(0);

                noteList.pushNewNote("X");
                expect(noteList.at(0).id).toEqual("X");
                expect(noteList.at(0).position).toEqual(0);
                expect(noteList.get("X").position).toEqual(0);
                expect(noteList.at(1).id).toEqual("1");
                expect(noteList.at(1).position).toEqual(1);
                expect(noteList.get("1").position).toEqual(1);


                noteList.updateNotes(["7", "1", "2", "3", "4", "5", "6"], 0);
                expect(noteList.at(0)).toEqual("7");
                expect(noteList.at(1)).toEqual("1");
                expect(noteList.at(4)).toEqual("4");
                expect(noteList.at(5)).toEqual("5");

                createNoteTest.success();
            } catch (expectError) {
                createNoteTest.fail(expectError);
            }
        });

        testSuite.end();

        testSuite.teardown();

        return testSuite;
    };

    Notes.test.testScripts.push(noteListTestScript);
})(Notes);
