using Castle.MicroKernel.Registration;
using Castle.Windsor;
using Planogram.Server.Persistence;
using Planogram.Server.Planogram;

namespace Planogram.Server
{
    public static class WindsorConfigurator
    {
        public static void Configure(this IWindsorContainer container)
        {
            container.Register(
                Component.For<IMongoDbFactory>().ImplementedBy<MongoDbFactory>().LifeStyle.Singleton, //Delay instantiation of Mongo database until it's first needed
                Component.For(typeof(IDocumentRepository<>)).ImplementedBy(typeof(MongoRepository<>)).LifeStyle.Transient,
                Component.For<IPlanogramProvider>().ImplementedBy<PlanogramProvider>()
                );
        }
    }
}
