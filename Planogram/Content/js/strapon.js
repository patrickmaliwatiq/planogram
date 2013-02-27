window.local = true;

window.Planogram = {};

Planogram.App = {};
Planogram.Views = {};
Planogram.ViewModels = {};

//IE8 is missing console... :/
if (typeof console === "undefined" || typeof console.log === "undefined") {
    console = {
        log: function () { }
    };
}

Bootstrap.waitCallbackFunction = function (callback) {
    $(document).ready(callback);
};

var loadArray = [];
if (window.local) {
    loadArray = [
        { url: "Content/js/local/jquery/1.7.2/jquery.min.js" },
        { url: "Content/js/local/jquery.ui/1.8.18/jquery.ui.min.js" },
        { url: "Content/js/local/underscore/1.4.2/underscore.min.js" },
        { url: "Content/js/local/backbone/0.9.2/backbone.min.js" }
    ];
} else {
    loadArray = [
        "jquery",
        "jquery.ui",
        "backbone"
    ];
}
Bootstrap.load(loadArray, function () {
    });