using System.ComponentModel.DataAnnotations.Schema;

namespace OmegaProjectManagement.Server.Models
{
    [Table("employees")]
    public class Employee
    {
        [Column("employee_id")]
        public int EmployeeId { get; set; }

        [Column("first_name", TypeName = "varchar(120)")]
        public string FirstName { get; set; }

        [Column("last_name", TypeName = "varchar(120)")]
        public string LastName { get; set; }

        public List<Story> stories { get; set; } = [];
    }
}
