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
            new Planogram.Models.Playlist({Id: "adplay-playlist", DisplayName: "Adplay Playlist", Type: Planogram.Constants.PlaylistTypes.AdPlay}),
            new Planogram.Models.Playlist({Id: "browse-playlist", DisplayName: "Browse Playlist", Type: Planogram.Constants.PlaylistTypes.Browse}),
            new Planogram.Models.Playlist({Id: "browse-playlist-2", DisplayName: "Browse Playlist 2", Type: Planogram.Constants.PlaylistTypes.Browse}),
            new Planogram.Models.Playlist({Id: "stream-playlist", DisplayName: "Stream Playlist", Type: Planogram.Constants.PlaylistTypes.Stream})
        ]);
    }

});