using System.Collections.Generic;
using System.Linq;
using Umbraco.Core.Persistence;
using Umbraco.Web.Editors;
using Umbraco.Web.Mvc;

namespace Umb.Prod.Test1.Controllers
{
    [PluginController("Productions")]

    public class ProductionsApiController : UmbracoAuthorizedJsonController
    {
        public IEnumerable<Production> GetAll()
        { 
            var query = new Sql().Select("*").From("Production");
            return DatabaseContext.Database.Fetch<Production>(query);
        }
 
        public Production GetById(int id)
        {
            var query = new Sql().Select("*").From("Production").Where<Production>(x => x.Id == id);
            return DatabaseContext.Database.Fetch<Production>(query).FirstOrDefault(); 
        }
 
        public Production PostSave(Production production)
        {
            if (production.Id > 0)
                DatabaseContext.Database.Update(production);
            else
                DatabaseContext.Database.Save(production);

            return production;
        }

        public int DeleteById(int id)
        {
            return DatabaseContext.Database.Delete<Production>(id);
        }
    }
}
