"use strict";

(function (Notes) {
    Notes.utilities.dateUtilities = function() {
        var that = {};

        var FORMATS = Notes.utilities.dateUtilities.FORMATS;

        that.format = function (date) {
            if (date === null) {
                return "";
            }

            var year = date.getUTCFullYear();
            var monthIndex = date.getUTCMonth() + 1;
            var month = padNumberWithFrontZero(monthIndex);
            var dayOfMonth = padNumberWithFrontZero(date.getUTCDate());
            var datePart = [year, month, dayOfMonth].join("-");

            var hours = date.getUTCHours() % 12;
            var minutes = padNumberWithFrontZero(date.getUTCMinutes());
            var timePart = [hours, minutes].join(":");

            var dayPart = date.getUTCHours() >= 12 ? "PM" : "AM";

            return [datePart, timePart, dayPart].join(" ");
        };

        var padNumberWithFrontZero = function (num) {
            return num < 10 ? "0" + num : "" + num;
        };

        return that;
    };
    Notes.utilities.dateUtilities.FORMATS = {
        FORMAT_O1: "long format",
    };
})(Notes);
