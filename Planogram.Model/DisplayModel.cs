using System;
using System.Collections.Generic;

namespace Planogram.Model
{
    public class DisplayModel
    {
        public DisplayModel()
        {
            PlaylistIds = new List<Guid>();
        }

        public Guid Id { get; set; }
        public Guid AccountId { get; set; }
        public string Name { get; set; }
        public Guid StoreId { get; set; }
        public IEnumerable<Guid> PlaylistIds { get; set; }
        public DisplayType Type { get; set; }
       
    }

    public enum DisplayType
    {
        Stream,
        Browse,
        AdPlay,
        Stream2
    }
}
