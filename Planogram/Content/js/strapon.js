window.Planogram = {};

Planogram.App = {};

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
        "jquery"
    ], function () {
    });