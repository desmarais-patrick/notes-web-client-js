"use strict";

(function (Notes) {
    Notes.utilities.listUtilities = function () {
        var that = {};

        that.isEqual = function (listA, listB) {
            if (listA.length !== listB.length) {
                return false;
            }

            for (var i = 0; i < listA.length; i++) {
                if (listA[i] !== listB[i]) {
                    return false;
                }
            }

            return true;
        };

        that.difference = function (listA, listB) {
            var result = [];
            var rest = [];

            var itemA;
            for (var i = 0; i < listA.length; i++) {
                itemA = listA[i];
                if (listB.indexOf(itemA) === -1) {
                    result.push(itemA);
                } else {
                    rest.push(itemA);
                }
            }

            return {
                result: result,
                rest: rest
            };
        };

        // Important assumption: all values are unique!
        that.computeChanges = function (listA, listB) {
            var singleAdd = isSingleAddChange(listA, listB);
            if (singleAdd !== false) {
                return [singleAdd];
            }

            var singleRemove = isSingleRemoveChange(listA, listB);
            if (singleRemove !== false) {
                return [singleRemove];
            }

            var changes = findAllChanges(listA, listB);
            return changes;
        };

        var isSingleAddChange = function (listA, listB) {
            if (listB.length !== listA.length + 1) {
                return false;
            }

            var addedValue = null;
            var addedValueIndex = null;
            for (var i = 0; i < listB.length; i++) {
                if (i >= listA.length || listB[i] !== listA[i]) {
                    if (addedValueIndex !== null) {
                        // More than one item mismatch.
                        return false;
                    }
                    addedValue = listB[i];
                    addedValueIndex = i;
                }
            }

            return change(addedValue, null, addedValueIndex);
        };

        var isSingleRemoveChange = function (listA, listB) {
            if (listA.length !== listB.length + 1) {
                return false;
            }

            var removedValue = null;
            var removedValueIndex = null;
            var indexB;
            for (var i = 0; i < listA.length; i++) {
                indexB = (removedValueIndex !== null) ? i - 1 : i;
                if (listA[i] !== listB[indexB]) {
                    if (removedValueIndex !== null) {
                        // More than one item mismatch.
                        return false;
                    }
                    removedValue = listA[i];
                    removedValueIndex = i;
                }
            }

            return change(removedValue, removedValueIndex, null);
        };

        var findAllChanges = function (listA, listB) {
            var copyListA = clone(listA);
            var copyListB = clone(listB);

            var changes = [];

            var indexA = 0;
            var valueA;
            var indexB;
            var copyIndexB;
            var aChange;
            while (copyListA.length !== 0) {
                valueA = copyListA.shift();
                indexB = listB.indexOf(valueA);
                if (indexB === -1) {
                    aChange = change(valueA, indexA, null);
                    changes.push(aChange);
                } else {
                    if (indexA !== indexB) {
                        aChange = change(valueA, indexA, indexB);
                        changes.push(aChange);
                    }

                    copyIndexB = copyListB.indexOf(valueA);
                    copyListB.splice(copyIndexB, 1);
                }

                indexA++;
            }

            copyListB.forEach(function (valueB, indexB) {
                aChange = change(valueB, null, indexB);
                changes.push(aChange);
            });
            
            return changes;
        };

        var clone = function (list) {
            var copy = [];
            list.forEach(function (item) {
                copy.push(item);
            });
            return copy;
        };
        
        return that;
    };

    var change = function (value, from, to) {
        var that = {};

        that.getValue = function () { return value; };
        that.getFromIndex = function () { return from; };
        that.getToIndex = function () { return to; };

        that.isRemoved = function () { return (to === null); };
        that.isAdded = function () { return (from === null); };
        that.isPositionChange = function () { return (to !== from); };

        return that;
    };
})(Notes);
