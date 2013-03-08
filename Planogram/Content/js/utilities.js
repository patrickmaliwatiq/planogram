Planogram.Utilities.redirect = function (page) {
    try {
        window.location.href = page;
    } catch (error) {
        // This will prevent a bug in IE from producing a JavaScript error
    }
};