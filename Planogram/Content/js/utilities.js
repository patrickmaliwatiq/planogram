Planogram.Utilities.redirect = function (page) {
    try {
        window.location.href = page;
    } catch (error) {
        // This will prevent a bug in IE from producing a JavaScript error
    }
};

Planogram.Utilities.makeApiCall = function (relativeUrl, method, data, success, error) {
    "use strict";
    return $.ajax({
        type: method,
        url: Planogram.Utilities.createApiUrl(relativeUrl),
        data: (method.toLowerCase() == 'get') ? data : JSON.stringify(data),
        accepts: 'application/json',
        contentType: 'application/json',
        dataType: "json",
        success: success,
        error: error,
        statusCode: {
            401: function (jqXHR, textStatus, errorThrown) {
            },
            400: function (jqXHR, textStatus, errorThrown) {
            },
            500: function (jqXHR, textStatus, errorThrown) {
            },
            503: function () {
               
            }
        }
    });
};

Planogram.Utilities.createApiUrl = function (relativeUrl) {
    "use strict";
    return Planogram.Utilities.appendTimestamp(Planogram.Utilities.getApiBaseUrl() + escape(relativeUrl)); // Timestamp is needed to force Internet Explorer to not cache response
};

Planogram.Utilities.appendTimestamp = function (href) {
    var newTimeStamp = "timestamp=" + Planogram.Utilities.getTimestamp();
    //Does a timestamp currently exist?
    var reg = /timestamp=[0-9]+/;

    if (href.match(new RegExp(reg))) {
        //Replace with new timestamp
        href = href.replace(reg, newTimeStamp);
    } else {
        //Is there any querystring parameters? If there is, append with &.
        href += (href.match(new RegExp(/\?/)) ? "&" : "?") + newTimeStamp;
    }

    return href;
};

Planogram.Utilities.getTimestamp = function () {
    return escape(new Date().getTime());
};

Planogram.Utilities.getApiBaseUrl = function () {
    "use strict";
    var scheme = document.location.protocol;
    var host = document.location.hostname;
    var port = document.location.port;
    return scheme + "//" + host + ":" + port + "/api";
};