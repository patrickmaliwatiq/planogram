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

Planogram.Collections.Displays = Backbone.Collection.extend({
    model: Planogram.Models.Display,
    fetch: function () {
        this.reset([
            new Planogram.Models.Store({ Id: "london-drugs", Name: "London Drugs", AccountId: "account-1"}),
            new Planogram.Models.Store({ Id: "game-stop", Name: "GameStop", AccountId: "account-2"})
        ]);
    }
});