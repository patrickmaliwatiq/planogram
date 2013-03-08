using Planogram.Model;
using Planogram.Server.Persistence;

namespace Planogram.Server.Planogram
{
    public class PlanogramProvider : IPlanogramProvider
    {
        private readonly IDocumentRepository<PlanogramModel> _planograms;

        public PlanogramProvider(IDocumentRepository<PlanogramModel> planograms)
        {
            _planograms = planograms;
        }

        public PlanogramModel GetPlanogram(string storeId)
        {
            return _planograms.Get(storeId);
        }
    }
}