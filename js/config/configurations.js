"use strict";

(function (Notes) {
    var DEV_CONF_NAME = "development";
    var UNIT_TEST_CONF_NAME = "unit-test";
    var LIVE_TEST_CONF_NAME = "live-test";
    var PROD_CONF_NAME = "production";

    var DEV_API_SERVER_BASE_URL = "http://localhost:8080";
    var PROD_API_SERVER_BASE_URL = "https://PUT_API_SERVER_BASE_URL_HERE";
    var TEST_API_SERVER_BASE_URL = "http://someFakeBaseUrl";

    Notes.config.configurations = {
        "Development": {
            name: DEV_CONF_NAME,
            apiServerBaseUrl: DEV_API_SERVER_BASE_URL,
            printDebugErrors: true
        },

        "UnitTest": {
            name: UNIT_TEST_CONF_NAME,
            apiServerBaseUrl: TEST_API_SERVER_BASE_URL,
            printDebugErrors: true
        },
        "LiveTest": {
            name: LIVE_TEST_CONF_NAME,
            apiServerBaseUrl: DEV_API_SERVER_BASE_URL,
            printDebugErrors: true
        },

        "Production": {
            name: PROD_CONF_NAME,
            apiServerBaseUrl: PROD_API_SERVER_BASE_URL,
            printDebugErrors: false
        }
    };
})(Notes);
