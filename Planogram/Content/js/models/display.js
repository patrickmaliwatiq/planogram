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
        if (options && options.forceChange) {
            this.trigger("change");
        }
    }
});

Planogram.Collections.Displays = Backbone.Collection.extend({
    model: Planogram.Models.Display,
    url: function () {
        return this._fetchUrl;
    },
    initialize: function (options) {
        if (options && options.storeId) {
            this._fetchUrl = "/api/displays/" + options.storeId;
        }
    }
});