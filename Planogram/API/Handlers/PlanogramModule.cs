using Nancy;
using Planogram.Server.Planogram;

namespace Planogram.API.Handlers
{
    public class PlanogramModule : NancyModule
    {
        private readonly IPlanogramProvider _planogramProvider;

        public PlanogramModule(IPlanogramProvider planogramProvider)
        {
            _planogramProvider = planogramProvider;
            Get["/api/helloworld"] = x => "Hello world";
            Get["/api/planogram/{id}"] = x => GetPlanogram(x.id);
        }

        private Response GetPlanogram(string storeId)
        {
            var planogram = _planogramProvider.GetPlanogram(storeId);
            return Response.AsJson(planogram);
        }
    }
}