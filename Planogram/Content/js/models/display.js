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
            new Planogram.Models.Display({Id: "browse-display", Name: "Browse Display", Type: Planogram.Constants.DisplayType.Browse, PlaylistIds: ["browse-playlist"]}),
            new Planogram.Models.Display({Id: "adplay-display", Name: "AdPlay Display", Type: Planogram.Constants.DisplayType.AdPlay,}),
            new Planogram.Models.Display({Id: "stream-display", Name: "Stream Display", Type: Planogram.Constants.DisplayType.Stream,})
        ]);
    }
});