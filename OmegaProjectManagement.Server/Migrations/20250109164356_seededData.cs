using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace OmegaProjectManagement.Server.Migrations
{
    /// <inheritdoc />
    public partial class seededData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "employees",
                columns: new[] { "employee_id", "first_name", "last_name" },
                values: new object[,]
                {
                    { 1, "Mahlon", "Reese" },
                    { 2, "Jonathan", "Lun" },
                    { 3, "Cyber", "Justin" },
                    { 4, "Lebron", "James" },
                    { 5, "Marven", "Mathelier" }
                });

            migrationBuilder.InsertData(
                table: "statuses",
                columns: new[] { "status_id", "status_name" },
                values: new object[,]
                {
                    { 1, "Backlog" },
                    { 2, "In Progress" },
                    { 3, "Ready For Testing" },
                    { 4, "Completed" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "employees",
                keyColumn: "employee_id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "employees",
                keyColumn: "employee_id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "employees",
                keyColumn: "employee_id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "employees",
                keyColumn: "employee_id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "employees",
                keyColumn: "employee_id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "statuses",
                keyColumn: "status_id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "statuses",
                keyColumn: "status_id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "statuses",
                keyColumn: "status_id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "statuses",
                keyColumn: "status_id",
                keyValue: 4);
        }
    }
}
