using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OmegaProjectManagement.Server.Migrations
{
    /// <inheritdoc />
    public partial class addedStoryDescription : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "story_description",
                table: "stories",
                type: "text",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "story_description",
                table: "stories");
        }
    }
}
