using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OmegaProjectManagement.Server.Migrations
{
    /// <inheritdoc />
    public partial class cascadingDelete : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_stories_employees_employee_id",
                table: "stories");

            migrationBuilder.AddForeignKey(
                name: "FK_stories_employees_employee_id",
                table: "stories",
                column: "employee_id",
                principalTable: "employees",
                principalColumn: "employee_id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_stories_employees_employee_id",
                table: "stories");

            migrationBuilder.AddForeignKey(
                name: "FK_stories_employees_employee_id",
                table: "stories",
                column: "employee_id",
                principalTable: "employees",
                principalColumn: "employee_id");
        }
    }
}
