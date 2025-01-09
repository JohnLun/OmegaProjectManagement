using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OmegaProjectManagement.Server.Models;
using OmegaProjectManagement.Server.Dtos;

namespace OmegaProjectManagement.Server.Controllers
{
    [ApiController]
    [Route("/api")]
    public class PmController : ControllerBase
    {
        private readonly ILogger<PmController> _logger;
        private readonly PmContext _db;

        public PmController(ILogger<PmController> logger, PmContext dbContext)
        {

            _logger = logger;
            _db = dbContext;
        }

        //Backlog, Ready For Dev, Ready for Test, Completed

        [HttpGet("backlog")]
        public async Task<ActionResult<IEnumerable<StoryDto>>> GetBacklog()
        {
            var stories = await _db.Stories
                .Include(s => s.status)
                .Include(e => e.employee)
                .Where(s => s.StatusId == 1)
                .ToListAsync();

            List<StoryDto> storiesDto = new List<StoryDto> ();

            foreach (var story in stories)
            {
                storiesDto.Add(new StoryDto
                {
                    StoryId = story.StoryId,
                    StoryDescription = story.StoryDescription,
                    StoryName = story.StoryName,
                    FirstName = story.employee.FirstName,
                    LastName = story.employee.LastName,
                    StatusName = story.status.StatusName
                });
            }
            return Ok(storiesDto);
        }

        [HttpGet("in-progress")]
        public async Task<ActionResult<IEnumerable<StoryDto>>> GetProgress()
        {
            var stories = await _db.Stories
                .Include(s => s.status)
                .Include(e => e.employee)
                .Where(s => s.StatusId == 2)
                .ToListAsync();

            List<StoryDto> storiesDto = new List<StoryDto>();

            foreach (var story in stories)
            {
                storiesDto.Add(new StoryDto
                {
                    StoryId = story.StoryId,
                    StoryDescription = story.StoryDescription,
                    StoryName = story.StoryName,
                    FirstName = story.employee.FirstName,
                    LastName = story.employee.LastName,
                    StatusName = story.status.StatusName
                });
            }
            return Ok(storiesDto);
        }

        [HttpGet("in-testing")]
        public async Task<ActionResult<IEnumerable<StoryDto>>> GetTesting()
        {
            var stories = await _db.Stories
                .Include(s => s.status)
                .Include(e => e.employee)
                .Where(s => s.StatusId == 3)
                .ToListAsync();

            List<StoryDto> storiesDto = new List<StoryDto>();

            foreach (var story in stories)
            {
                storiesDto.Add(new StoryDto
                {
                    StoryId = story.StoryId,
                    StoryDescription = story.StoryDescription,
                    StoryName = story.StoryName,
                    FirstName = story.employee.FirstName,
                    LastName = story.employee.LastName,
                    StatusName = story.status.StatusName
                });
            }
            return Ok(storiesDto);
        }

        [HttpGet("in-complete")]
        public async Task<ActionResult<IEnumerable<StoryDto>>> GetComplete()
        {
            var stories = await _db.Stories
                .Include(s => s.status)
                .Include(e => e.employee)
                .Where(s => s.StatusId == 4)
                .ToListAsync();

            List<StoryDto> storiesDto = new List<StoryDto>();

            foreach (var story in stories)
            {
                storiesDto.Add(new StoryDto
                {
                    StoryId = story.StoryId,
                    StoryDescription = story.StoryDescription,
                    StoryName = story.StoryName,
                    FirstName = story.employee.FirstName,
                    LastName = story.employee.LastName,
                    StatusName = story.status.StatusName
                });
            }
            return Ok(storiesDto);
        }

        [HttpPost("story")]
        public async Task<ActionResult<CreateStoryDto>> Post([FromBody] CreateStoryDto createStory)
        {
            var employee = await _db.Employees
                .Include(s => s.stories)
                .FirstOrDefaultAsync(e => e.FirstName == createStory.FirstName && e.LastName == createStory.LastName);
                
                
            var status = await _db.Statuses
                .Include(s => s.stories)
                .FirstOrDefaultAsync(s => s.StatusName == createStory.StatusName);                

            Story story = new Story
            {
                employee = employee,
                status = status,
                StoryName = createStory.StoryName,
                StoryDescription = createStory.StoryDescription

            };

            employee.stories.Add(story);
            status.stories.Add(story);
            await _db.Stories.AddAsync(story);
            await _db.SaveChangesAsync();

            return Ok(createStory);
        }

        [HttpPatch("story")]
        public async Task<ActionResult<StoryDto>> Patch([FromBody] StoryDto storyDto)
        {
            var story = await _db.Stories
                .Include(s => s.status)
                .Include(e => e.employee)
                .FirstOrDefaultAsync(s => s.StoryId == storyDto.StoryId);

            if (story.status.StatusName != storyDto.StatusName)
            {
                story.status.stories.Remove(story);
                var status = await _db.Statuses
                   .Include(s => s.stories)
                   .FirstOrDefaultAsync(s => s.StatusName == storyDto.StatusName);
                story.status = status;
                status.stories.Add(story);
            }

            if (story.employee.FirstName != storyDto.FirstName || story.employee.LastName != storyDto.LastName)
            {
                story.employee.stories.Remove(story);
                var employee = await _db.Employees
                    .Include(s => s.stories)
                    .FirstOrDefaultAsync(e => e.FirstName == storyDto.FirstName && e.LastName == storyDto.LastName);
                story.employee = employee;
                story.employee.stories.Add(story);
            }

            story.StoryName = storyDto.StoryName;
            story.StoryDescription = storyDto.StoryDescription;
            await _db.SaveChangesAsync();

            return Ok(storyDto);
        }

        [HttpDelete("story/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var story = await _db.Stories.FindAsync(id);

            if (story == null)
            {
                return NotFound($"Story with ID {id} not found.");
            }

            _db.Stories.Remove(story);
            await _db.SaveChangesAsync();

            return Ok();
        }

    }

    
}
