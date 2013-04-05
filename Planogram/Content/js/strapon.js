window.Planogram = {};

Planogram.App = {};
Planogram.Views = {};
Planogram.Models = {};
Planogram.Collections = {};
Planogram.Constants = {};
Planogram.Utilities = {};

//IE8 is missing console... :/
if (typeof console === "undefined" || typeof console.log === "undefined") {
    console = {
        log: function () { }
    };
}

Bootstrap.waitCallbackFunction = function (callback) {
    $(document).ready(callback);
};

Bootstrap.load([
        "jquery",
        "jquery.ui",
        "bootstrap.tab",
        "backbone",
        "@/Content/js/constants.js",
        "@/Content/js/utilities.js"
    ], function () {
    });