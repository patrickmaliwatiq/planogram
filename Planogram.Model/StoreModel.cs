using System;
using System.Collections.Generic;

namespace Planogram.Model
{
    public class StoreModel
    {
        public StoreModel()
        {
            Info = new Dictionary<string, string>();
        }

        public Guid Id { get; set; }
        public Guid AccountId { get; set; }
        public string ProvidedId { get; set; }
        public string Name { get; set; }
        public IDictionary<string, string> Info { get; set; }
        public int Displays { get; set; }
    }
}


