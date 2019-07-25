"use strict";

(function (Notes) {
    var LIST_CHANGE_CHECK_TIMEOUT_MS = 300;

    // TODO Add to design system.
    // TODO Add unit tests for list logic.
    Notes.viewModel.noteListViewModel = function (options) {
        var that = {};

        // Member variables.
        var setTimeout = options.setTimeout;
        var clearTimeout = options.clearTimeout;

        var model = options.model;

        var viewModelEvents = options.viewModelEvents;

        var noteClientIds = [];
        var items = [];

        var changeListenerCallback = null;
        var noteAddedListenerCallback = null;
        var noteRemovedListenerCallback = null;

        var eventIterator = model.listen("change Notes.List");
        var eventCheckTimeoutId = null;

        // Member functions.
        that.initialize = function () {
            listenToModelEvents();

            viewModelEvents.on("DeleteNote", onDeleteNote);
            viewModelEvents.on("SelectNote", onSelectNote);
        };

        that.destroy = function () {
            stopListeningToModelEvents();

            viewModelEvents.off("DeleteNote", onDeleteNote);
            viewModelEvents.off("SelectNote", onSelectNote);
        };
        
        var listenToModelEvents = function () {
            eventCheckTimeoutId = setTimeout(function () {
                // Fast-forward to latest list change event.
                var event = null;
                while (eventIterator.hasNext()) {
                    event = eventIterator.next();
                }

                if (event === null) {
                    return;
                }

                var newNoteClientIds = event.options.newList;
                refreshList(newNoteClientIds);

                listenToModelEvents();
            }, LIST_CHANGE_CHECK_TIMEOUT_MS);
        };

        var refreshList = function (newNoteClientIds) {
            var currentLength = noteClientIds.length;
            var newLength = newNoteClientIds.length;

            if (newLength > currentLength) {
                var differenceSets = listUtilities.difference(newNoteClientIds, 
                    noteClientIds);
                if (listUtilities.isEqual(differenceSets.rest, noteClientIds)) {
                    addNewItemsInPlace(differenceSets.result, newNoteClientIds);
                } else {
                    applyBroadItemChanges(newNoteClientIds);
                }
            } else if (currentLength > newLength) {
                var differenceSets = listUtilities.difference(noteClientIds, 
                    newNoteClientIds);
                if (listUtilities.isEqual(differenceSets.rest, newNoteClientIds)) {
                    removeOldItemsInPlace(differenceSets.result, newNoteClientIds);
                } else {
                    applyBroadItemChanges(newNoteClientIds);
                }
            } else if (currentLength === newLength) {
                if (listUtilities.isEqual(noteClientIds, newNoteClientIds)) {
                    // No change.
                    return;
                }

                applyBroadItemChanges(newNoteClientIds);
            }

            noteClientIds = newNoteClientIds;
        };

        var addNewItemsInPlace = function (newItemIds, referenceList) {
            newItemIds.forEach(function (id) {
                var listItemViewModel = createItemViewModel(id);
                var index = referenceList.indexOf(id);
                items.splice(index, 0, listItemViewModel);

                if (noteAddedListenerCallback !== null) {
                    noteAddedListenerCallback(listItemViewModel, index);
                }
            });
        };

        var removeOldItemsInPlace = function (oldItemIds) {
            oldItemIds.forEach(function (id) {
                var index = noteClientIds.indexOf(id);
                var listItemViewModel = listItemViewModels[index];
                removeItemViewModel(listItemViewModel);

                items.splice(index, 1);

                if (noteRemovedListenerCallback !== null) {
                    noteRemovedListenerCallback(listItemViewModel, index);
                }
            });
        };

        var applyBroadItemChanges = function (newNoteClientIds) {
            var id;
            var viewModel;
            while (noteClientIds.length < newNoteClientIds.length) {
                id = newNoteClientIds[noteClientIds.length];
                noteClientIds.push(id);

                viewModel = createItemViewModel(id);
                items.push(viewModel);
            }
            while (noteClientIds.length > newNoteClientIds.length) {
                id = noteClientIds.pop();
                viewModel = items.pop();
                removeItemViewModel(viewModel);
            }

            newNoteClientIds.forEach(function (id, index) {
                if (noteClientIds[index] !== id) {
                    items[index].setNoteClientId(id);
                }
            });

            if (changeListenerCallback !== null) {
                changeListenerCallback(items);
            }
        };

        var createItemViewModel = function (noteClientId) {
            var itemViewModel = viewModelFactory.create("ListItem");
            itemViewModel.setNoteClientId(noteClientId);
            return itemViewModel;
        };

        var removeItemViewModel = function (itemViewModel) {
            itemViewModel.setNoteClientId(null);
        };

        var stopListeningToModelEvents = function () {
            if (eventCheckTimeoutId !== null) {
                clearTimeout(eventCheckTimeoutId);
                eventCheckTimeoutId = null;
            }
        };

        that.setChangeListener = function (newListenerCallback) {
            changeListenerCallback = newListenerCallback;
        };

        that.setNoteAddedListener = function (newListenerCallback) {
            noteAddedListenerCallback = newListenerCallback;
        };

        that.setNoteRemovedListener = function (newListenerCallback) {
            noteRemovedListenerCallback = newListenerCallback;
        };

        var onSelectNote = function (noteClientId) {
            var index = noteClientIds.indexOf(noteClientId);
            items.forEach(function (itemViewModel, itemIndex) {
                if (itemIndex !== index) {
                    itemViewModel.setIsSelected(false);
                }
            });
        };

        var onDeleteNote = function () {
            var newNoteClientIds = model.getNoteClientIds();
            refreshList(newNoteClientIds);
        };

        var getItemViewModels = function () {
            return items;
        };

        return that;
    };
})(Notes);
