"use strict";

(function (Notes) {
    // Setup.
    var chosenConfiguration = Notes.config.configurations["Development"];

    // Instantiate classes.

    // Run 
    console.log("Hello from Notes app!");
    console.log("Mode:", chosenConfiguration.name);

})(Notes);
