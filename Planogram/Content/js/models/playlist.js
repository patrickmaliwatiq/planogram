Planogram.Models.Playlist = Backbone.Model.extend({
    idAttribute: "Id",
    defaults: function() {
      return {
        AccountId: "",
        Attributes: {},
        Devices: [],
        DisplayName: "",
        Id: "",
        Image: null,
        IsSmartPlaylist: false,
        Items: [],
        LastUpdated: "",
        LocalizedContent: {},
        Name: "",
        Rules: [],
        Type: null
      };
    },
});

Planogram.Collections.Playlists = Backbone.Collection.extend({
    model: Planogram.Models.Playlist,
    url: "/api/playlists"
});