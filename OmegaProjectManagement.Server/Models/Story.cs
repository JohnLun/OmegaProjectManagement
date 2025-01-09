using System.ComponentModel.DataAnnotations.Schema;

namespace OmegaProjectManagement.Server.Models
{
    [Table("stories")]
    public class Story
    {
        [Column("story_id")]
        public int StoryId { get; set; }

        [Column("story_name", TypeName = "varchar(50)")]
        public string? StoryName { get; set; }

        [Column("story_description")]
        public string? StoryDescription { get; set; }

        [ForeignKey("StatusId")]
        [Column("status_id")]
        public int StatusId { get; set; }
        public Status status { get; set; }

        [ForeignKey("EmployeeId")]
        [Column("employee_id")]
        public int? EmployeeId { get; set; }

        public Employee employee { get; set; }
    }
}
