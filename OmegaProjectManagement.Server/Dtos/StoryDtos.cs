namespace OmegaProjectManagement.Server.Dtos
{
    public class CreateStoryDto
    {
        public string StoryName { get; set; }
        public string StoryDescription { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string StatusName { get; set; }
    }

    public class StoryDto
    {
        public int StoryId { get; set; }
        public string StoryName { get; set; }
        public string StoryDescription { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string StatusName { get; set; }

    }
}
