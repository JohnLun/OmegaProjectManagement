using Microsoft.EntityFrameworkCore;
using OmegaProjectManagement.Server.Models;
using System;

namespace OmegaProjectManagement.Server
{
    public class PmContext : DbContext
    {
        public PmContext(DbContextOptions<PmContext> options) : base(options)
        {
        }

        public DbSet<Employee> Employees { get; set; }
        public DbSet<Status> Statuses { get; set; }
        public DbSet<Story> Stories { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Seed data for Employees
            modelBuilder.Entity<Employee>().HasData(
                new Employee { EmployeeId = 1, FirstName = "Mahlon", LastName = "Reese" },
                new Employee { EmployeeId = 2, FirstName = "Jonathan", LastName = "Lun" },
                new Employee { EmployeeId = 3, FirstName = "Cyber", LastName = "Justin" },
                new Employee { EmployeeId = 4, FirstName = "Lebron", LastName = "James" },
                new Employee { EmployeeId = 5, FirstName = "Marven", LastName = "Mathelier" }
            );

            // Seed data for Statuses
            modelBuilder.Entity<Status>().HasData(
                new Status { StatusId = 1, StatusName = "Backlog" },
                new Status { StatusId = 2, StatusName = "In Progress" },
                new Status { StatusId = 3, StatusName = "Ready For Testing" },
                new Status { StatusId = 4, StatusName = "Completed" }
            );

            // Configure relationships with cascading delete
            modelBuilder.Entity<Story>()
                .HasOne(s => s.employee)
                .WithMany(e => e.stories)
                .HasForeignKey(s => s.EmployeeId)
                .OnDelete(DeleteBehavior.Cascade); // Cascade delete for Employee

            modelBuilder.Entity<Story>()
                .HasOne(s => s.status)
                .WithMany(st => st.stories)
                .HasForeignKey(s => s.StatusId)
                .OnDelete(DeleteBehavior.Cascade); // Cascade delete for Status
        }
    }
}
