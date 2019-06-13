(function (Notes) {
    Notes.test.testSuiteBuilder = function (options) {
        var that = {};

        var test = options.test;
        var testSuite = options.testSuite;

        var logger = options.logger;

        var setTimeout = options.setTimeout;
        var timeoutInMillis = options.timeoutInMillis;
        var clearTimeout = options.clearTimeout;

        var configuration = options.configuration;

        that.createTestSuite = function (name) {
            return testSuite({
                test: test,
    
                logger: logger,
    
                setTimeout: setTimeout,
                timeoutInMillis: timeoutInMillis,
                clearTimeout: clearTimeout,

                configuration: configuration,

                name: name
            });
        };

        return that;
    };
})(Notes);
