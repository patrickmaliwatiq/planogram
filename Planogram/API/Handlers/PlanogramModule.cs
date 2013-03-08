using Nancy;

namespace Planogram.API.Handlers
{
    public class PlanogramModule : NancyModule
    {
        public PlanogramModule()
        {
            Get["/api/helloworld"] = x => "Hello world";
            Get["/api/planogram/{id}"] = x => GetPlanogram(x.id);
        }

        private Response GetPlanogram(string storeId)
        {
            return HttpStatusCode.OK;
        }
    }
}