(function (Notes) {
    function Test(name, timeoutInMillis) {
        this.name = name;
        this.status = "... pending";
        this.messages = [];
        this.startDate = new Date();
        this.durationInSeconds = -1;

        var that = this;
        setTimeout(function () {
            that.timeout();
        }, timeoutInMillis);
    }

    Test.prototype.addMessage = function (message) {
        this.messages.push(message);
        return this;
    }

    Test.prototype.fail = function () {
        this.status = "✘ failed";
        this._computeDuration();
    }

    Test.prototype.success = function () {
        this.status = "︎︎︎✔ success";
        this._computeDuration();
    }

    Test.prototype.timeout = function () {
        this.status = "⚑ timeout";
        this._computeDuration();
    }

    Test.prototype._computeDuration = function () {
        var now = new Date();
        var duration = now.getTime() - this.startDate.getTime();
        var durationInSeconds = Math.ceil(duration / 1000);
        this.durationInSeconds = durationInSeconds;
    }

    Test.prototype.toString = function () {
        return this.name + " " + this.status + " " + 
            this.messages.join(", ") + 
            "(" + this.durationInSeconds.toString() + "s)";
    }


    if (!Notes.test) {
        Notes.test = {};
    }
    Notes.test.Test = Test;
})(Notes)
