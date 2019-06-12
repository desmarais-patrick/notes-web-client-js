"use strict";

var Notes = {};

(function (Notes) {
    // Configuration.
    var DEV_CONF_NAME = "development";
    var PROD_CONF_NAME = "production";

    var DEV_API_SERVER_BASE_URL = "http://localhost:8080/";
    var PROD_API_SERVER_BASE_URL = "https://PUT_API_SERVER_BASE_URL_HERE/";

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
        }
    };

    var chosenConfiguration = configurations["Development"];
    // TODO Load configuration with ApplicationFileResourceLoader class.
    // TODO Error handling and error toast.
    // (?) Is the script order respected when "async" property is used in HTML?


    // Main entry point for the application.
    function main() {
        // Instantiate classes.
        console.log("Hello from Notes app!");
        console.log("Mode:", chosenConfiguration.name);
    }

    main();
})(Notes);
