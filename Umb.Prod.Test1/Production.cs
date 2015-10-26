using System;
using Umbraco.Core.Persistence;
using Umbraco.Core.Persistence.DatabaseAnnotations;

namespace Umb.Prod.Test1
{
    [TableName("Production")]
    public class Production
    {
        // GENERAL INFO
        [PrimaryKeyColumn(AutoIncrement = true)]
        public int Id { get; set; }
        public string ProductionName { get; set; }
        public string ProductionShortName { get; set; }
        [NullSetting(NullSetting = NullSettings.Null)]
        public string Status { get; set; }
        [NullSetting(NullSetting = NullSettings.Null)]
        public int ProductionHeaderImageID { get; set; }
        public int ProductionListImageID { get; set; }
        public int tProductionID { get; set; }

        // DATES & TIME
        [NullSetting(NullSetting = NullSettings.Null)]
        public DateTime? StartDate { get; set; }
        [NullSetting(NullSetting = NullSettings.Null)]
        public DateTime EndDate { get; set; }
        [NullSetting(NullSetting = NullSettings.Null)]
        public DateTime CreatedDate { get; set; }
        [NullSetting(NullSetting = NullSettings.Null)]
        public DateTime LastUpdatedDate { get; set; }

    }
}