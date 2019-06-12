(function (Notes) {
    function TestSuiteBuilder(options) {
        this.TestSuite = options.TestSuite;
        this.testSuiteOptions = {
            Test: options.Test,
            timeoutInMillis: options.timeoutInMillis,
            logger: options.logger,
            setInterval: options.setInterval,
            clearInterval: options.clearInterval
        };
    }

    TestSuiteBuilder.prototype.createTestSuite = function (name) {
        return new this.TestSuite(this.testSuiteOptions, name);
    }

    if (!Notes.test) {
        Notes.test = {};
    }
    Notes.test.TestSuiteBuilder = TestSuiteBuilder;
})(Notes);
