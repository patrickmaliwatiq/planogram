﻿using Castle.Windsor;
using Nancy.Bootstrappers.Windsor;
using Nancy.Conventions;
using Planogram.Server;

namespace Planogram
{
    public class BootStrapper : WindsorNancyBootstrapper
    {
        protected override void ApplicationStartup(IWindsorContainer container, Nancy.Bootstrapper.IPipelines pipelines)
        {
            //TODO: Uncomment once deployment dashboard work resumes
            //            new DataUpgrade().ExecuteDataUpgrade();

            base.ApplicationStartup(container, pipelines);
        }

        protected override void ConfigureApplicationContainer(IWindsorContainer existingContainer)
        {
            existingContainer.Configure();

            base.ConfigureApplicationContainer(existingContainer);
        }

        protected override void ConfigureConventions(NancyConventions nancyConventions)
        {
            base.ConfigureConventions(nancyConventions);

            //Mappings for static content
            nancyConventions.StaticContentsConventions.Add(StaticContentConventionBuilder.AddDirectory("js", @"js"));
            nancyConventions.StaticContentsConventions.Add(StaticContentConventionBuilder.AddDirectory("css", @"css"));
            nancyConventions.StaticContentsConventions.Add(StaticContentConventionBuilder.AddDirectory("templates", @"templates"));
            nancyConventions.StaticContentsConventions.Add(StaticContentConventionBuilder.AddDirectory("views", @"views"));
            nancyConventions.StaticContentsConventions.Add(StaticContentConventionBuilder.AddDirectory("images", @"images"));
        }
    }
}
