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

        var noteClientIds = [];
        var items = [];
        var listChangeListeners = [];

        var eventIterator = model.listen("change Notes.List");
        var eventCheckTimeoutId = null;

        // Member functions.
        var initialize = function () {
            listenToModelEvents();
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
                notifyNoteAdded(listItemViewModel, index);
            });
        };

        var removeOldItemsInPlace = function (oldItemIds) {
            oldItemIds.forEach(function (id) {
                var index = noteClientIds.indexOf(id);
                var listItemViewModel = listItemViewModels[index];
                deleteItemViewModel(listItemViewModel);

                items.splice(index, 1);
                notifyNoteRemoved(listItemViewModel, index);
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
                deleteItemViewModel(viewModel);
            }

            newNoteClientIds.forEach(function (id, index) {
                if (noteClientIds[index] !== id) {
                    items[index].setNoteClientId(id);
                }
            });

            notifyNoteChanges(items);
        };

        var createItemViewModel = function (noteClientId) {
            var itemViewModel = viewModelFactory.create("ListItem");
            itemViewModel.setNoteClientId(noteClientId);
            itemViewModel.onEditNote(relayEditNote);
            itemViewModel.onIsSelected(updateSelection);
            itemViewModel.onDeleteNote(notifyViewAndRelay);
            return itemViewModel;
        };

        var deleteItemViewModel = function (itemViewModel) {
            itemViewModel.offNoteUnselected(onNoteUnselected);
            itemViewModel.offNoteSelected(onNoteSelected);
            itemViewModel.offEditNote(relayEditNote);
            itemViewModel.setNoteClientId(null);
        };

        that.destroy = function () {
            stopListeningToModelEvents();
        };

        var stopListeningToModelEvents = function () {
            if (eventCheckTimeoutId !== null) {
                clearTimeout(eventCheckTimeoutId);
                eventCheckTimeoutId = null;
            }
        };

        // TODO Update publish-subscribe behaviour.
        that.onChange = function (newListenerCallback) {
            listChangeListeners.push(newListenerCallback);
        };
        that.offChange = function (listenerCallback) {
            var index = listChangeListeners.indexOf(listenerCallback);

            if (index === -1) {
                throw new Error("[ListViewModel]" + 
                    " List change listener has never been registered.");
            }

            listChangeListeners.splice(index, 1);
        };
        var notifyChange = function (newNoteClientIds) {
            listChangeListeners.forEach(function (listenerCallback) {
                listenerCallback(newNoteClientIds);
            });
        };


        // Initialization.
        initialize();


        // TODO Move these functions in the member functions.
        var relayEditNote = function (noteClientId) {
            notifyEditNoteListeners(noteClientId);
        };

        var editNoteListeners = [];
        that.onEditNote = function (newListenerCallback) {
            editNoteListeners.push(newListenerCallback);
        };
        that.offEditNote = function () {
            var index = editNoteListeners.indexOf(listenerCallback);

            if (index === -1) {
                throw new Error("[ListViewModel]" + 
                    " Edit note listener has never been registered.");
            }

            editNoteListeners.splice(index, 1);
        };
        var notifyEditNoteListeners = function (noteClientId) {
            editNoteListeners.forEach(function (listenerCallback) {
                listenerCallback(noteClientId);
            });
        };

        var selectedNoteItemId = null;
        that.onNoteSelected = function (newSelectedNoteClientId) {
            var listItemViewModel;

            if (selectedNoteItemId !== null) {
                // Unselect previous selection.
                listItemViewModel = getListItemViewModel(selectedNoteItemId);
                listItemViewModel.unSelect();
            }

            selectedNoteItemId = newSelectedNoteClientId;
        };
        that.onNoteUnselected = function () {
            selectedNoteItemId = null;
        };

        var getListItemViewModel = function (noteClientId) {
            var index = noteClientIds.indexOf(noteClientId);

            if (index === -1) {
                throw new Error("[ListViewMode] Unable to un-select note " +
                    noteClientId);
            }

            return listItemViewModels[index];
        };

        return that;
    };
})(Notes);
