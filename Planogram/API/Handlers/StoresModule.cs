using System;
using System.Collections.Generic;
using Nancy;
using Planogram.Model;
using Planogram.Server.Planogram;

namespace Planogram.API.Handlers
{
    public class StoresModule : NancyModule
    {
        public StoresModule()
        {
            Get["/api/stores/"] = x => GetStores();
        }

        private Response GetStores()
        {
            var stores = new List<StoreModel>
                {
                    new StoreModel
                        {
                            Id = Guid.NewGuid(),
                            Name = "Store1"
                        },
                    new StoreModel
                        {
                            Id = Guid.NewGuid(),
                            Name = "Store2"
                        },
                    new StoreModel
                        {
                            Id = Guid.NewGuid(),
                            Name = "Store3"
                        }
                };
            return Response.AsJson(stores);
        }
    }
}