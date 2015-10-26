using System.Web.Hosting;
using System.Xml;
using Umbraco.Core;
using Umbraco.Core.Persistence;

namespace Umb.Prod.Test1
{
    public class RegisterEvents : ApplicationEventHandler
    {
        protected override void ApplicationStarted(UmbracoApplicationBase umbracoApplication, ApplicationContext applicationContext)
        {
            var db = applicationContext.DatabaseContext.Database;
            AddSectionLanguageKeys();
            //Check if the DB table does NOT exist
            if (!db.TableExist("Production"))
            {
                //Create DB table - and set overwrite to false
                db.CreateTable<Production>(false);
            }
            else
            {
            }
        }
        public void AddSectionLanguageKeys()
        {
            bool saveFile = false;

            //Open up language file
            //umbraco/config/lang/en.xml
            var langPath = "~/umbraco/config/lang/en.xml";

            //Path to the file resolved
            var langFilePath = HostingEnvironment.MapPath(langPath);

            //Load settings.config XML file
            XmlDocument langXml = new XmlDocument();
            langXml.Load(langFilePath);

            // Section Node
            // <area alias="sections">
            XmlNode sectionNode = langXml.SelectSingleNode("//area [@alias='sections']");

            if (sectionNode != null)
            {
                XmlNode findSectionKey = sectionNode.SelectSingleNode("./key [@alias='Productions']");

                if (findSectionKey == null)
                {
                    //Let's add the key
                    var attrToAdd = langXml.CreateAttribute("alias");
                    attrToAdd.Value = "Productions";

                    var keyToAdd = langXml.CreateElement("key");
                    keyToAdd.InnerText = "Productions";
                    keyToAdd.Attributes.Append(attrToAdd);

                    sectionNode.AppendChild(keyToAdd);

                    //Save the file flag to true
                    saveFile = true;
                }
            }

            //If saveFile flag is true then save the file
            if (saveFile)
            {
                //Save the XML file
                langXml.Save(langFilePath);
            }
        }
    }
}