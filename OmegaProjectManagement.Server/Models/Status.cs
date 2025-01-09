using System.ComponentModel.DataAnnotations.Schema;

namespace OmegaProjectManagement.Server.Models
{
    [Table("statuses")]
    public class Status
    {
        [Column("status_id")]
        public int StatusId { get; set; }

        [Column("status_name", TypeName = "varchar(100)")]
        public string StatusName { get; set; }

        public List<Story> stories { get; set; } = [];
    }

}
