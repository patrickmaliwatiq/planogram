using Castle.Windsor;

namespace Planogram.Server
{
    public static class WindsorConfigurator
    {
        public static void Configure(this IWindsorContainer container)
        {
            container.Register(
//                Component.For<IApiClient>().ImplementedBy<ApiClient>(),
                );
        }
    }
}
