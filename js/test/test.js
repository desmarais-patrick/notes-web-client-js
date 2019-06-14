(function (Notes) {
    Notes.test.test = function (options) {
        var that = {};

        var name = options.name;
        var testToRun = options.testToRun;

        var setTimeout = options.setTimeout;
        var timeoutInMillis = options.timeoutInMillis;
        var clearTimeout = options.clearTimeout;
        var timeoutId = null;

        var UNKNOWN_STATUS = "[unknown]";
        var PENDING_STATUS = "[pending]";
        var FAILED_STATUS = "[✘ failed]";
        var SUCCESS_STATUS = "︎︎︎[✔ success]";
        var TIMEOUT_STATUS = "[⚑ timeout]";

        var status = UNKNOWN_STATUS;
        var messages = [];
        var startTime = null;
        var stopTime = null;

        that.run = function () {
            startTime = new Date();
            status = PENDING_STATUS;
            timeoutId = setTimeout(function () {
                that.timeout();
            }, timeoutInMillis);
            setTimeout(function () {
                try {
                    testToRun();
                } catch (err) {
                    that.addMessage(err.stack);
                    that.fail(err);
                }
            }, 0);
            return that;
        }

        that.addMessage = function (message) {
            messages.push(message);
            return that;
        };

        that.isPending = function () {
            return (status === PENDING_STATUS);
        }

        that.fail = function (message) {
            clearTimeout(timeoutId);
            that.addMessage(message);
            status = FAILED_STATUS;
            stopTime = new Date();
        };

        that.success = function () {
            clearTimeout(timeoutId);
            status = SUCCESS_STATUS;
            stopTime = new Date();
        };

        that.timeout = function () {
            status = TIMEOUT_STATUS;
            stopTime = new Date();
        };

        that.toString = function () {
            var duration = stopTime.getTime() - startTime.getTime();
            var formattedDuration = duration > 1000 ?
                (duration / 1000) + "s" : 
                duration + "ms";
            return name + " " + status + " " + messages.join(", ") + " " +
                "(" + formattedDuration + ")";
        };

        return that;
    };
})(Notes)
