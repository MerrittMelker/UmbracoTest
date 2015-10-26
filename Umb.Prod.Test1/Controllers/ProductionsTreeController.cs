using System;
using System.Net.Http.Formatting;
using umbraco.BusinessLogic.Actions;
using Umbraco.Core;
using Umbraco.Web.Models.Trees;
using Umbraco.Web.Mvc;
using Umbraco.Web.Trees;

namespace Umb.Prod.Test1.Controllers
{
    [Tree("Productions", "productionsTree", "Productions")]
    [PluginController("Productions")]
    public class ProductionsTreeController : TreeController
    {
        protected override TreeNodeCollection GetTreeNodes(string id, FormDataCollection queryStrings)
        {
            if (id == Constants.System.Root.ToInvariantString())
            {
                var api = new ProductionsApiController();
                var nodes = new TreeNodeCollection();
                foreach (var production in api.GetAll())
                {
                    var node = CreateTreeNode(production.Id.ToString(), "-1", queryStrings, production.ProductionName);
                    nodes.Add(node);
                }

                return nodes;
            }
            
            throw new NotImplementedException();
        }
        protected override Umbraco.Web.Models.Trees.MenuItemCollection GetMenuForNode(string id, System.Net.Http.Formatting.FormDataCollection queryStrings)
        {
            var menu = new MenuItemCollection();
            if (id == Constants.System.Root.ToInvariantString())
            {
                // root actions  
                menu.Items.Add<CreateChildEntity, ActionNew>("create");
                menu.Items.Add<RefreshNode, ActionRefresh>("refresh");
                return menu;
            }
            else
            {
                //menu.DefaultMenuAlias = ActionDelete.Instance.Alias;
                menu.Items.Add<ActionDelete>("delete");

            }
            return menu;
        }
    }
}