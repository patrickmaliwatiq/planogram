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
    fetch: function() {
        this.reset([
            new Planogram.Models.Playlist({Id: "sexy-playlist", DisplayName: "Sexy Playlist"}),
            new Planogram.Models.Playlist({Id: "ugly-playlist", DisplayName: "Ugly Playlist"})
        ]);
    }

});