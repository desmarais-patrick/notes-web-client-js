(function (Notes) {
    Notes.test.testSuite = function (options) {
        var that = {};

        var test = options.test;

        var logger = options.logger;

        var setTimeout = options.setTimeout;
        var timeoutInMillis = options.timeoutInMillis;
        var clearTimeout = options.clearTimeout;

        that.configuration = options.configuration;

        var name = that.name = options.name;
        var tests = [];
        var isPending = null;

        that.setup = function () {};

        that.start = function () {
            isPending = true;
        };

        that.test = function (name, testToRun) {
            var newTest = test({
                name: name,
                testToRun: testToRun,

                setTimeout: setTimeout,
                timeoutInMillis: timeoutInMillis,
                clearTimeout: clearTimeout
            });
            tests.push(newTest);
            return newTest.run();
        };

        that.isPending = function () {
            return isPending !== null && isPending;
        }
        
        that.end = function () {
            var anyPendingTests = tests.find(function (test) {
                return test.isPending();
            });
            if (!anyPendingTests) {
                endTestSuite();
                return;
            }

            // One last timeout.
            setTimeout(function () {
                endTestSuite();
            }, timeoutInMillis);
        };
        var endTestSuite = function () {
            isPending = false;
            logger.log(that.toString());
        };

        that.toString = function () {
            var testsAsStrings = [];
            tests.forEach(function (test) {
                testsAsStrings.push(test.toString());
            });
    
            var testsAsOneString;
            if (testsAsStrings.length === 0) {
                testsAsOneString = "No tests :("
            } else {
                testsAsOneString = testsAsStrings.join("\n");
            }
    
            return "Testing " + name + "\n\n" + testsAsOneString + "\n\n";
        };
        
        that.teardown = function () {};

        return that;
    };
})(Notes);
