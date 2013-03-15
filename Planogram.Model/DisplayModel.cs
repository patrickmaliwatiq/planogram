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
        public string SecretKey { get; set; }
        public DisplayType Type { get; set; }
        public DisplayOperatingSystem OperatingSystem { get; set; }
        public string UserAgent { get; set; }
        public DateTime? LastLoginTime { get; set; }
        public DateTime Created { get; set; }
        public DateTime? Removed { get; set; }

        public IList<string> SupportedLocales { get; set; }
    }

    public enum DisplayType
    {
        Stream,
        Browse,
        AdPlay,
        Stream2
    }

    public enum DisplayOperatingSystem
    {
        Unknown,
        Windows,
        IOS
    }
}
