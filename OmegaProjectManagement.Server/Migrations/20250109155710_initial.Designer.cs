﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using OmegaProjectManagement.Server;

#nullable disable

namespace OmegaProjectManagement.Server.Migrations
{
    [DbContext(typeof(PmContext))]
    [Migration("20250109155710_initial")]
    partial class initial
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "9.0.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("OmegaProjectManagement.Server.Models.Employee", b =>
                {
                    b.Property<int>("EmployeeId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("employee_id");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("EmployeeId"));

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasColumnType("varchar(120)")
                        .HasColumnName("first_name");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasColumnType("varchar(120)")
                        .HasColumnName("last_name");

                    b.HasKey("EmployeeId");

                    b.ToTable("employees");
                });

            modelBuilder.Entity("OmegaProjectManagement.Server.Models.Status", b =>
                {
                    b.Property<int>("StatusId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("status_id");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("StatusId"));

                    b.Property<string>("StatusName")
                        .IsRequired()
                        .HasColumnType("varchar(100)")
                        .HasColumnName("status_name");

                    b.HasKey("StatusId");

                    b.ToTable("statuses");
                });

            modelBuilder.Entity("OmegaProjectManagement.Server.Models.Story", b =>
                {
                    b.Property<int>("StoryId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("story_id");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("StoryId"));

                    b.Property<int?>("EmployeeId")
                        .HasColumnType("integer")
                        .HasColumnName("employee_id");

                    b.Property<int>("StatusId")
                        .HasColumnType("integer")
                        .HasColumnName("status_id");

                    b.Property<string>("StoryName")
                        .HasColumnType("varchar(50)")
                        .HasColumnName("story_name");

                    b.HasKey("StoryId");

                    b.HasIndex("EmployeeId");

                    b.HasIndex("StatusId");

                    b.ToTable("stories");
                });

            modelBuilder.Entity("OmegaProjectManagement.Server.Models.Story", b =>
                {
                    b.HasOne("OmegaProjectManagement.Server.Models.Employee", "employee")
                        .WithMany("stories")
                        .HasForeignKey("EmployeeId");

                    b.HasOne("OmegaProjectManagement.Server.Models.Status", "status")
                        .WithMany("stories")
                        .HasForeignKey("StatusId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("employee");

                    b.Navigation("status");
                });

            modelBuilder.Entity("OmegaProjectManagement.Server.Models.Employee", b =>
                {
                    b.Navigation("stories");
                });

            modelBuilder.Entity("OmegaProjectManagement.Server.Models.Status", b =>
                {
                    b.Navigation("stories");
                });
#pragma warning restore 612, 618
        }
    }
}
