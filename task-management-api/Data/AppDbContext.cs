using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using task_management_api.Models;

namespace task_management_api.Data
{
    public class AppDbContext : DbContext 
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Project> Projects { get; set; }
        public DbSet<ProjectTask> Tasks { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) 
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Configure enum conversion
            modelBuilder.Entity<ProjectTask>()
                .Property(t => t.Status)
                .HasConversion<string>();
        }
    }
}
