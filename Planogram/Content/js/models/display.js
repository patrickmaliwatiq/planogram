Planogram.Models.Display = Backbone.Model.extend({
    idAttribute: "Id",
    defaults: function () {
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
    set: function (attributes, options) {
        Backbone.Model.prototype.set.call(this, attributes, options);
        if (options.forceChange) {
            this.trigger("change");
        }
    }
});

Planogram.Collections.Displays = Backbone.Collection.extend({
    model: Planogram.Models.Display,
    fetch: function() {
        this.reset([
            new Planogram.Models.Display({Id: "libdog-display", Name: "Libdog's Display", PlaylistIds: ["xxx"]}),
            new Planogram.Models.Display({Id: "pat-display", Name: "Pat's Display"}),
            new Planogram.Models.Display({Id: "someones-display", Name: "Someone's Display"})
        ]);
    }
});