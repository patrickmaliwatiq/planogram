using System;
using MongoDB.Bson.Serialization.Attributes;

namespace Planogram.Model
{
    public class PlanogramModel
    {
        [BsonId]
        public Guid StoreId { get; set; }
        public string PlanogramUrl { get; set; }
    }
}
