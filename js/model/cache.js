"use strict";

(function (Notes) {
    Notes.model.cache = function () {
        var that = {};

        var notesById = {};
        var list = [];

        // get list as ordered array
        // push node
        // set node at position
        // get node at position
        // remove node at position

        // cannot add same id twice (1)
        // insert/delete node in linked list (2)
        // notify of positions changed (3) ==> they ask for array and see new positions.
        // cannot have two nodes with same position at the end of each update

        that.updateNotes = function (noteIds, from) {
            for (var i = 0, j = from; i < noteIds.length; i++, j++) {
                notes[j] = noteIds[i];
            }
        };

        that.at = function (index) {
            if (notes.length <= index) {
                return null;
            }
            return notes[index];
        }

        that.push = function () {
            
        }

        return that;
    };
})(Notes);
