(function (Notes) {
    function TestSuite(options, name) {
        this.Test = options.Test;
        this.timeoutInMillis = options.timeoutInMillis;
        this.logger = options.logger;
        this.setInterval = options.setInterval;
        this.clearInterval = options.clearInterval;

        this.name = name;
        this.tests = [];
        this.startDate = null;
        this.durationInMillis = -1;

        this.periodicTestIntervalId = null;
    }

    TestSuite.prototype.setup = function () {
        // Do nothing.
    }

    TestSuite.prototype.start = function () {
        // Do nothing.
    }

    TestSuite.prototype.end = function () {
        var that = this;
        this.periodicTestIntervalId = this.setInterval(function () {
            var anyPendingTests = that.tests.find(function (test) {
                return test.status === "pending";
            });
            if (!anyPendingTests) {
                that.printResults();
                that.clearInterval(that.periodicTestIntervalId);
            }
        }, 1000);
    }

    TestSuite.prototype.addTest = function (name) {
        return new this.Test(name, this.timeoutInMillis);
    }

    TestSuite.prototype.toString = function () {
        var testsAsStrings = [];
        tests.forEach(function (test) {
            testsAsStrings.push(test.toString());
        });

        var testsAsOneString;
        if (testsAsStrings.length === 0) {
            testsAsOneString = "No tests."
        } else {
            testsAsOneString = testsAsStrings.join("\n");
        }

        return "Testing " + name + "\n\n" + testsAsOneString + "\n\n";
    }

    TestSuite.prototype.printResults = function () {
        this.logger.log(this.toString());
    }

    if (!Notes.test) {
        Notes.test = {};
    }
    Notes.test.TestSuite = TestSuite;
})(Notes);
