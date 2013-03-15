using System;
using System.Collections.Generic;
using Nancy;
using Planogram.Model;
using Planogram.Server.Planogram;

namespace Planogram.API.Handlers
{
    public class PlaylistsModule : NancyModule
    {
        public PlaylistsModule()
        {
            Get["/api/playlists/"] = x => GetPlaylists();
        }

        private Response GetPlaylists()
        {
            var playlists = new List<PlaylistModel>
                {
                    new PlaylistModel
                        {
                            Id = Constants.BrowsePlaylist1Id,
                            Name = "Browse Playlist 1",
                            DisplayName = "Browse Playlist 1",
                            Type = PlaylistType.Browse
                        },
                        new PlaylistModel{
                            Id = Constants.BrowsePlaylist2Id,
                            Name = "Browse Playlist 2",
                            DisplayName = "Browse Playlist 2",
                            Type = PlaylistType.Browse
                        },
                        new PlaylistModel
                        {
                            Id = Guid.NewGuid(),
                            Name = "Stream Playlist",
                            DisplayName = "Stream Playlist",
                            Type = PlaylistType.Stream
                        },
                        new PlaylistModel
                        {
                            Id = Guid.NewGuid(),
                            Name = "Adplay Playlist",
                            DisplayName = "Adplay Playlist",
                            Type = PlaylistType.AdPlay
                        },
                };
            return Response.AsJson(playlists);
        }
    }
}