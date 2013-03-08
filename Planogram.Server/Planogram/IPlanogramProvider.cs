using Planogram.Model;

namespace Planogram.Server.Planogram
{
    public interface IPlanogramProvider
    {
        PlanogramModel GetPlanogram(string storeId);
    }
}