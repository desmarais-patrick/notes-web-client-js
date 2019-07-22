"use strict";

(function (Notes) {
    var UPDATE_TYPES = {
        SINGLE_ADD: "Single addition",
        SINGLE_DELETE: "Single deletion",
        MANY_UPDATES: "Many updates",
        NO_UPDATE: "No update"
    }; // Hopefully, nobody modifies this object. :s

    Notes.utilities.orderedSet = function() {
        var that = {};

        var idsList = [];
        var objectList = [];
        var objectMap = {};

        // TODO Review implementation to optimize common use cases:
        //       - Single add at index 0.
        //       - Remove add at index X.
        //      This implementation runs with complexity: 3*mn+n   :s
        that.update = function (newIdsList, mutators) {
            var differenceAB = difference(idsList, newIdsList);
            var differenceBA = difference(newIdsList, idsList);
            var intersection = intersect(idsList, newIdsList);

            var newObjectMap = {};

            differenceAB.forEach(function (id) {
                // Delete items not found in new list.
                var object = objectMap[id];
                mutators.delete(id, object);
            });

            differenceBA.forEach(function (id) {
                // Create items not found in current list.
                var object = mutators.create(id);
                newObjectMap[id] = object;
            });

            intersection.forEach(function (id) {
                // Keep items found in both list.
                var object = objectMap[id];
                newObjectMap[id] = object;
            });

            idsList = [];
            objectList = [];
            newIdsList.forEach(function (id) {
                idsList.push(id);
                var object = newObjectMap[id];
                objectList.push(object);
            });
            objectMap = newObjectMap;

            if (differenceAB.length === 1 && differenceBA.length === 0) {
                return {
                    type: UPDATE_TYPES.SINGLE_DELETE,
                    id: differenceAB[0]
                };
            } else if (differenceBA.length === 1 && differenceAB.length === 0) {
                return {
                    type: UPDATE_TYPES.SINGLE_ADD,
                    id: differenceBA[0]
                };
            } else if (differenceAB.length === 0 && differenceBA.length === 0) {
                return {
                    type: UPDATE_TYPES.NO_UPDATE
                };
            }

            return {
                type: UPDATE_TYPES.MANY_UPDATES
            };
        };

        var difference = function (idsListA, idsListB) {
            var diff = [];
            idsListA.forEach(function (id) {
                var indexB = idsListB.indexOf(id);
                if (indexB === -1) {
                    diff.push(id);
                }
            });
            return diff;
        };

        var intersect = function (idsListA, idsListB) {
            var intersection = [];
            idsListA.forEach(function (id) {
                var indexB = idsListB.indexOf(id);
                if (indexB !== -1) {
                    intersection.push(id);
                }
            });
            return intersection;
        };

        that.getIndexOfId = function (id) {
            return idsList.indexOf(id);
        };

        that.getIds = function () {
            return shallowCopy(idsList);
        };

        that.getObjects = function () {
            return shallowCopy(objectList);
        };

        that.getObjectById = function (id) {
            return objectMap[id];
        };

        var shallowCopy = function (list) {
            var copy = [];
            list.forEach(function (item) {
                copy.push(item);
            });
            return copy;
        };

        return that;
    };
    Notes.utilities.orderedSet.UPDATE_TYPES = UPDATE_TYPES;
})(Notes);
