"use strict";

(function (Notes) {
    Notes.model.changeEventableBehaviour = function(options) {
        var that = {};

        var changeEventBuilder = options.changeEventBuilder;

        that.addBehaviourTo = function (options) {
            var host = options.host;
            var name = options.name;

            var changeEventListeners = [];
    
            host.addChangeEventListener = function (listenerCallback) {
                if (changeEventListeners.indexOf(listenerCallback) !== -1) {
                    throw new Error("Implementation error!" + 
                        "Listener already added for change events on " + name);
                }
    
                changeEventListeners.push(listenerCallback);
    
                // Give initial value to listener.
                notifyListeners([listenerCallback]);
            };
    
            host.notifyChange = function () {
                notifyListeners(changeEventListeners);
            };
    
            var notifyListeners = function (listenerCallbacks) {
                var changeEvent = changeEventBuilder.createChangeEvent(host);
                listenerCallbacks.forEach(function (listenerCallback) {
                    listenerCallback(changeEvent);
                });
            };
    
            host.removeChangeEventListener = function (listenerCallback) {
                var index = changeEventListeners.indexOf(listenerCallback);
                if (index === -1) {
                    throw new Error("Implementation error!" + 
                        "Listener never registered for change events on " + name);
                }
    
                changeEventListeners.splice(index, 1);
            };
        };

        return that;
    };
})(Notes);
