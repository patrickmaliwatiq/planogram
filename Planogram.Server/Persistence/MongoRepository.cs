using System;
using System.Linq;
using MongoDB.Driver;
using MongoDB.Driver.Builders;
using MongoDB.Driver.Linq;

namespace Planogram.Server.Persistence
{
    //TODO: Copied and stripped down from IQ.IR.Core.  Common location to prevent duplication?
    public class MongoRepository<T> : IDocumentRepository<T> where T : class
    {
        readonly IMongoDbFactory _mongoDbFactory;

        MongoCollection<T> _docs;
        MongoCollection<T> Docs
        {
            get
            {
                //Delay Mongo instantiation until it is necessary
                if (_docs == null)
                    _docs = _mongoDbFactory.MongoDatabase.GetCollection<T>(typeof(T).Name, SafeMode.True);

                return _docs;
            }
        }

        public MongoRepository(IMongoDbFactory mongoDbFactory)
        {
            _mongoDbFactory = mongoDbFactory;
        }

        public void Create(T resource) { Docs.Insert(resource); }

        public void Update(T resource) { Docs.Save(resource); }

        public void CreateOrUpdate(T resource) { Docs.Save(resource); }

        /// <summary>
        /// Allows for querying the document repository
        /// </summary>
        public IQueryable<T> CreateQuery() { return Docs.AsQueryable(); }

        public IQueryable<T> CreateQuery(IMongoQuery query) { return Docs.Find(query).AsQueryable(); }

        public T Get(dynamic id)
        {
            if (id == null || string.IsNullOrEmpty(id.ToString()))
                return null;
            return Docs.FindOne(new QueryDocument("_id", id));
        }

        public void Update(dynamic id, IMongoUpdate update)
        {
            var builder = update as UpdateBuilder;
            if (builder != null)
            {
                if (builder.ToBsonDocument().Count() == 0)
                    throw new Exception("UpdateBuilder cannot be empty");
            }
            Docs.Update(new QueryDocument("_id", id), update);
        }

        /// <summary>
        /// Updates all documents that match the query
        /// </summary>
        /// <param name="query"></param>
        /// <param name="update"></param>
        /// <returns>Number of documents updated</returns>
        public long UpdateMany(IMongoQuery query, IMongoUpdate update)
        {
            var result = Docs.Update(query, update, UpdateFlags.Multi);
            return result == null
                ? 0
                : result.DocumentsAffected;
        }

        /// <summary>
        /// Deletes a document from the repository, will remove soft deleted documents as well
        /// </summary>
        public void Delete(dynamic id)
        {
            Docs.Remove(new QueryDocument("_id", id));
        }

        public void Delete(IMongoQuery query)
        {
            if (CreateQuery(query).Any()) Docs.Remove(query, RemoveFlags.None);
        }
    }
}