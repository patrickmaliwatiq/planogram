using System;
using System.Collections.Generic;

namespace Planogram.Model
{
    public class PlaylistModel
    {
        public Guid Id { get; set; }
        public Guid AccountId { get; set; }
        public string Name { get; set; }
        public string DisplayName { get; set; }
        public IList<Guid> Devices { get; set; }
        public PlaylistType Type { get; set; }
       
    }
    public enum PlaylistType
    {
        Unknown = 0,
        Stream = 1,
        Browse = 2,
        AdPlay = 3,
        Stream2 = 4,
        Stream2Manual = 5
    }
}