"use strict";

(function (Notes) {
    var DEV_CONF_NAME = "development";
    var PROD_CONF_NAME = "production";
    var TEST_CONF_NAME = "test";

    var DEV_API_SERVER_BASE_URL = "http://localhost:8080/";
    var PROD_API_SERVER_BASE_URL = "https://PUT_API_SERVER_BASE_URL_HERE/";
    var TEST_API_SERVER_BASE_URL = "http://someBaseUrl/";

    var configurations = {
        "Development": {
            name: DEV_CONF_NAME,
            apiServerBaseUrl: DEV_API_SERVER_BASE_URL,
            printDebugErrors: true
        },
        "Production": {
            name: PROD_CONF_NAME,
            apiServerBaseUrl: PROD_API_SERVER_BASE_URL,
            printDebugErrors: false
        },
        "Test": {
            name: TEST_CONF_NAME,
            apiServerBaseUrl: TEST_API_SERVER_BASE_URL,
            printDebugErrors: true
        }
    };

    Notes.config.configurations = configurations;
})(Notes);
