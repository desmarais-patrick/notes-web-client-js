"use strict";

(function (Notes) {
    Notes.model.events = function() {
        var that = {};

        var eventsByTopic = {};
        
        that.dispatch = function (topic, name, options) {
            var event = {
                name: name,
                options: options
            };
            if (eventsByTopic.hasOwnProperty(topic)) {
                var topicEvents = eventsByTopic[topic];
                topicEvents.push(event);
            } else {
                eventsByTopic[topic] = [event];
            }
        };

        that.listen = function (topic) {
            var topicEvents;
            if (eventsByTopic.hasOwnProperty(topic)) {
                topicEvents = eventsByTopic[topic];
            } else {
                topicEvents = [];
                eventsByTopic[topic] = topicEvents;
            }
            return iterator(topicEvents);
        };

        var iterator = function (events) {
            var that = {};
            var i = -1;
            that.get = function () {
                if (i < 0) {
                    return null;
                }
                return events[i];
            };
            that.hasNext = function () {
                return events.length > i + 1;
            };
            that.next = function () {
                if (this.hasNext() === false) {
                    return null;
                }
                return events[++i];
            };
            return that;
        };

        return that;
    };
})(Notes);
