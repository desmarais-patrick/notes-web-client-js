"use strict";

(function (Notes) {
    var EVENT_CHECK_TIMEOUT_MS = 300;

    // TODO Add to design system.
    // TODO Add unit tests for list logic.
    Notes.viewModel.listViewModel = function (options) {
        var that = {};

        var setTimeout = options.setTimeout;
        var clearTimeout = options.clearTimeout;

        var model = options.model;
        var eventIterator = model.listen("change Notes.List");

        listenToModelEvents();

        var eventCheckTimeoutId = null;
        var listenToModelEvents = function () {
            eventCheckTimeoutId = setTimeout(function () {
                that.refreshList();
                listenToModelEvents();
            }, EVENT_CHECK_TIMEOUT_MS);
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

        var noteClientIds = [];
        var listItemViewModels = [];
        that.refreshList = function () {
            // Fast-forward to latest list.
            var event = null;
            while (eventIterator.hasNext()) {
                event = eventIterator.next();
            }

            if (event === null) {
                return;
            }

            var newNoteClientIds = event.options.newList;
            if (isSingleAddition(newNoteClientIds)) {
                update(newNoteClientIds);
                notifyNoteAdded(); // Simple insertion animation.
            } else if (isSingleRemoval(newNoteClientIds)) {
                update(newNoteClientIds);
                notifyNoteRemoved(); // Simple deletion animation.
            } else {
                update(newNoteClientIds);
                notifyListChanged(newNoteClientIds); // Full update animation, fixing number of child nodes and cross-fading notes in, re-selecting item.
            }
        };

        var isSingleAddition = function (newNoteClientIds) {
            if (newNoteClientIds.length !== noteClientIds.length + 1) {
                return false;
            }

            var newIndex = 0;
            var index = 0;
            for (; index < noteClientIds.length; index++, newIndex++) {
                if (noteClientIds[index] !== newNoteClientIds[newIndex]) {
                    newIndex++;
                }
                if (newIndex > index + 1) {
                    // Too many differences or not same order.
                    return false;
                }
            }

            return true;
        };

        var isSingleRemoval = function (newNoteClientIds) {
            if (newNoteClientIds.length !== noteClientIds.length - 1) {
                return false;
            }

            var newIndex = 0;
            var index = 0;
            for (; newIndex < newNoteClientIds.length; index++, newIndex++) {
                if (newNoteClientIds[newIndex] !== noteClientIds[index]) {
                    index++;
                }
                if (index > newIndex + 1) {
                    // Too many differences or not same order.
                    return false;
                }
            }

            return true;
        };

        var update = function (newNoteClientIds) {
            // Create a copy of current identifiers for tracking differences.
            var currentNoteClientIdsCopy = [];
            noteClientIds.forEach(function (clientId) {
                currentNoteClientIdsCopy.push(clientId);
            });

            // Create new view models and re-order existing ones.
            var newNoteClientIdsCopy = [];
            var newListItemViewModels = [];
            newNoteClientIds.forEach(function (clientId) {
                var listItemViewModel;
                var index = currentNoteClientIdsCopy.indexOf(clientId);
                if (index === -1) {
                    // Create new note.
                    listItemViewModel = viewModelFactory.create("ListItem");
                    listItemViewModel.setNoteClientId(clientId);
                    listItemViewModel.onEditNote(relayEditNote);
                    listItemViewModel.onNoteSelected(onNoteSelected);
                    listItemViewModel.onNoteUnselected(onNoteUnselected);
                } else {
                    // Re-order note.
                    currentNoteClientIdsCopy.splice(index, 1);
                    listItemViewModel = listItemViewModels[index];
                }
                newNoteClientIdsCopy.push(clientId);
                newListItemViewModels.push(listItemViewModel);
            });

            // Delete view models that don't exist in new list.
            currentNoteClientIdsCopy.forEach(function (clientId) {
                // Delete note.
                var index = noteClientIds.indexOf(clientId);
                var listItemViewModel = listItemViewModels[index];
                listItemViewModel.offNoteUnselected(onNoteUnselected);
                listItemViewModel.offNoteSelected(onNoteSelected);
                listItemViewModel.offEditNote(relayEditNote);
                listItemViewModel.setNoteClientId(null);

                if (clientId === selectedNoteItemId) {
                    selectedNoteItemId = null;
                }
            });

            noteClientIds = newNoteClientIdsCopy;
            listItemViewModels = newListItemViewModels;
        };

        var listChangeListeners = [];
        that.onListChange = function (newListenerCallback) {
            listChangeListeners.push(newListenerCallback);
        };
        that.offListChange = function (listenerCallback) {
            var index = listChangeListeners.indexOf(listenerCallback);

            if (index === -1) {
                throw new Error("[ListViewModel]" + 
                    " List change listener has never been registered.");
            }

            listChangeListeners.splice(index, 1);
        };
        var notifyListChanged = function (newNoteClientIds) {
            listChangeListeners.forEach(function (listenerCallback) {
                listenerCallback(newNoteClientIds);
            });
        };

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
