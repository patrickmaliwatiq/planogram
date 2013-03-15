using System;
using System.Collections.Generic;
using Nancy;
using Planogram.Model;
using Planogram.Server.Planogram;

namespace Planogram.API.Handlers
{
    public class DisplaysModule : NancyModule
    {
        public DisplaysModule()
        {
            Get["/api/helloworld"] = x => "Hello world";
            Get["/api/displays/{storeid}"] = x => GetDisplays(x.storeid);
        }

        private Response GetDisplays(Guid storeId)
        {
            var displays = new List<DisplayModel>
                {
                    new DisplayModel
                        {
                            Id = Guid.NewGuid(),
                            Name = "Browse Display",
                            Type = DisplayType.Browse,
                            PlaylistIds = new List<Guid>{Guid.NewGuid(), Guid.NewGuid()},
                            StoreId = storeId
                        },
                        new DisplayModel
                        {
                            Id = Guid.NewGuid(),
                            Name = "Adplay Display",
                            Type = DisplayType.AdPlay,
                            StoreId = storeId
                        },
                        new DisplayModel
                        {
                            Id = Guid.NewGuid(),
                            Name = "Stream Display",
                            Type = DisplayType.Stream,
                            StoreId = storeId
                        }
                };
            return Response.AsJson(displays);
        }
    }
}