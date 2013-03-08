using System.Linq;
using MongoDB.Driver;

namespace Planogram.Server.Persistence
{
    //TODO: Copied and stripped down from IQ.IR.Core.  Common location to prevent duplication?
    public interface IDocumentRepository<T>
    {
        void Create(T resource);
        void CreateOrUpdate(T resource);
        T Get(dynamic id);
        IQueryable<T> CreateQuery();
        IQueryable<T> CreateQuery(IMongoQuery query);
        void Delete(dynamic id);
        void Update(T resource);
        long UpdateMany(IMongoQuery query, IMongoUpdate update);
        void Update(dynamic id, IMongoUpdate update);
        void Delete(IMongoQuery query);
    }
}