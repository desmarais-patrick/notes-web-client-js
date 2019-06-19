"use strict";

(function (Notes) {
    var sortedLinkedList = function(options) {
        var that = {};

        var createNode = options.createNode;

        var root = null;
        var objectsById = {};

        that.toArray = function () {
            if (root === null) {
                return [];
            }

            return [root.getObject()];
        };

        that.insertOne = function (object) {
            var node = createNode(object, null);
            root = node;
        };

        that.insertObjectsAt = function (arrayOfObjects, at) {

        };

        var filterOutExistingObject = function (arrayOfObjects) {
            var newObjects = [];
            var objectId = null;
            var i;
            for (i = 0; i < arrayOfObjects.length; i++) {
                objectId = arrayOfObjects[i].getId();
                if (!objectId) {

                }
            }
        }

        var id = id || null;
        var text = text || "";
        var date = date || new Date();

        that.getId = function () { return id; };

        that.getText = function () { return text; };
        that.setText = function (newText) {
            text = newText;
        };

        that.getDate = function () { return date; }

        that.toString = function () {
            return JSON.stringify({
                id: id,
                text: text,
                date: date.toISOString()
            });
        }

        return that;
    };

    Notes.model.core.sortedLinkedList = sortedLinkedList;
})(Notes);
