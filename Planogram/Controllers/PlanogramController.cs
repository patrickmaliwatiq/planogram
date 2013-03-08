using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Planogram.Controllers
{
    public class PlanogramController : Controller
    {
        //
        // GET: /Planogram/Edit

        public ActionResult Edit(string storeId) //TODO: switch to Guid once we get real data
        {
            ViewBag.StoreId = storeId;
            return View();
        }

    }
}
