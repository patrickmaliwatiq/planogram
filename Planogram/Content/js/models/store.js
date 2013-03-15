Planogram.Models.Store = Backbone.Model.extend({
    idAttribute: "Id",
    defaults: function () {
        return {
        "Id": "",
        "AccountId": "",
        "ProvidedId": "",
        "Name": "",
        "Info": {/*
            "Manager": "Catinka Dekker",
            "Region": "Pop Up Retail",
            "District": "BC",
            "Address": "910 Columbia Street West",
            "Phone": "2503743452",
            "Email": "rcss.kamloops@mobileadvisors.ca"
        */},
        "Displays": 0
        };
    }
});

Planogram.Collections.Stores = Backbone.Collection.extend({
    model: Planogram.Models.Store,
    url: "/api/stores"
});