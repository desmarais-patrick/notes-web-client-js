"use strict";

(function (Notes) {
    Notes.utilities.dateUtilities = function () {
        var that = {};

        that.format = function (date) {
            if (date === null) {
                return "";
            }

            var year = date.getFullYear();
            var monthIndex = date.getMonth() + 1;
            var month = padNumberWithFrontZero(monthIndex);
            var dayOfMonth = padNumberWithFrontZero(date.getDate());
            var datePart = [year, month, dayOfMonth].join("-");

            var hours = date.getHours();
            var minutes = padNumberWithFrontZero(date.getMinutes());
            var timePart = [hours % 12, minutes].join(":");

            var dayPart = hours >= 12 ? "PM" : "AM";

            return [datePart, timePart, dayPart].join(" ");
        };

        var padNumberWithFrontZero = function (num) {
            return num < 10 ? "0" + num : "" + num;
        };

        return that;
    };
})(Notes);
