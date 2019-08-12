"use strict";

(function (Notes) {
    var LOCAL_STORAGE_USER_KEY = "user";

    Notes.model.user = function (options) {
        var that = {};

        var userUtilities = options.userUtilities;
        var localStorage = options.localStorage;

        that.getName = function () {
            return name;
        };

        var getUserFromLocalStorage = function () {
            var name = null;
            try {
                name = localStorage.getItem(LOCAL_STORAGE_USER_KEY);
            } catch (err) {
                var message = [
                    "[Model.User]",
                    "Error getting user from LocalStorage",
                    err.stack
                ].join(" ");
                console.log(message);
            }
            return name;
        };

        var saveUserToLocalStorage = function () {
            try {
                localStorage.setItem(LOCAL_STORAGE_USER_KEY, name);
            } catch (err) {
                var message = [
                    "[Model.User]",
                    "Error saving user",
                    ["'", name, "'"].join(""),
                    "to LocalStorage",
                    err.stack
                ].join(" ");
                console.log(message);
            }
        };

        var name = getUserFromLocalStorage();
        if (name === null) {
            name = userUtilities.generateUser();
            saveUserToLocalStorage(name);
        }

        return that;
    };
})(Notes);
