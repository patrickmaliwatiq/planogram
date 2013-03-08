using System.Configuration;
using MongoDB.Driver;

namespace Planogram.Server.Persistence
{
    public interface IMongoDbFactory
    {
        MongoDatabase MongoDatabase { get; }
    }

    public class MongoDbFactory : IMongoDbFactory
    {
        private const string MongoConnectionString = "MongoDb";
        private const string MongoDbNameAppSetting = "PlanogramMongoDbName";

        private static readonly string ConnectionString;
        private static readonly string MongoDbName;
        private static MongoDatabase _mongoDatabase;

        static MongoDbFactory()
        {
            ConnectionString = ConfigurationManager.ConnectionStrings[MongoConnectionString].ConnectionString;
            MongoDbName = ConfigurationManager.AppSettings[MongoDbNameAppSetting];
        }

        public MongoDatabase MongoDatabase
        {
            get
            {
                if (_mongoDatabase == null)
                {
                    MongoServer mongoServer = MongoServer.Create(ConnectionString);
                    _mongoDatabase = mongoServer.GetDatabase(MongoDbName);
                }

                return _mongoDatabase;
            }
        }
    }
}
