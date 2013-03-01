Planogram.Models.Display = Backbone.Model.extend({
    defaults: function() {
      return {      
        AccountId: "",
        Created: "",
        Id: "",
        LastLoginTime: "",
        Name: "",
        OperatingSystem: null,
        PlaylistIds: [],
        Removed: null,
        SecretKey: "",
        StoreId: "",
        SupportedLocales: [],
        Type: null,
        UserAgent: null
      };
    },
});

Planogram.Collections.Displays = Backbone.Collection.extend({
    model: Planogram.Models.Display,
    fetch: function() {
        this.reset([
            new Planogram.Models.Display({Id: "libdog-display", Name: "Libdog's Display", PlaylistIds: []}),
            new Planogram.Models.Display({Name: "Pat's Display"}),
            new Planogram.Models.Display({Name: "Someone's Display"})
        ]);
    }

});