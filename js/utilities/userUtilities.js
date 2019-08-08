"use strict";

(function (Notes) {
    var firstNames = [
        "Alisha", "Beatrice", "Christian", "Danica", "Eezu", "Fred",
        "Guillaume", "Herman", "Iain", "Jason", "Karely", "Lloyd",
        "Martin", "Naomi", "Omar", "Patrick", "Qureshi", "Rowena",
        "Stephanie", "Teresa", "Uma", "Veronica", "Warren", "Xavier",
        "Yannick", "Zachary"
    ];
    var firstNamesLength = firstNames.length;

    var lastNames = [
        "Almeida", "Birks", "Colaco", "Desmarais", "Emran", "Fen",
        "Grande", "Hollowaychuk", "Ip", "Jackson", "Ko", "Lim", 
        "Moujabber", "Next", "Om", "Patterson", "Quartier", "Rotenberg",
        "Soprano", "Tan", "Ulrich", "Vyas", "Wichita", "X", "Yves", "Zoro"
    ];
    var lastNamesLength = lastNames.length;

    Notes.utilities.userUtilities = function (options) {
        var that = {};

        var dateUtilities = options.dateUtilities;
        var Date = options.Date;
        var Math = options.Math;

        that.generateUser = function () {
            var index = randomIndex(firstNamesLength);
            var firstName = firstNames[index];

            index = randomIndex(lastNamesLength);
            var lastName = lastNames[index];

            var date = dateUtilities.format(new Date());

            return [firstName, " ", lastName, " ", "(", date, ")"].join("");
        };

        var randomIndex = function (max) {
            var index = Math.random() * max;
            return Math.floor(index);
        };

        return that;
    };
})(Notes);
