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
            var user = null;
            try {
                user = localStorage.getItem(LOCAL_STORAGE_USER_KEY);
            } catch (err) {
                var message = [
                    "[Model.User]",
                    "Error getting user from LocalStorage",
                    err.stack
                ].join(" ");
                console.log(message);
            }
            return user;
        };

        var saveUserToLocalStorage = function () {
            try {
                localStorage.setItem(LOCAL_STORAGE_USER_KEY, user);
            } catch (err) {
                var message = [
                    "[Model.User]",
                    "Error saving user",
                    ["'", user, "'"].join(""),
                    "to LocalStorage",
                    err.stack
                ].join(" ");
                console.log(message);
            }
            return user;
        };

        var name = getUserFromLocalStorage();
        if (name === null) {
            name = userUtilities.generateUser();
            saveUserToLocalStorage(name);
        }

        return that;
    };
})(Notes);
