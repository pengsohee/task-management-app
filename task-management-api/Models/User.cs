using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore.Query;

namespace task_management_api.Models
{
    public class User
    {
        public Guid Id { get; set; }
        [Required]
        [MaxLength(50)]
        public string Username { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        public byte[] PasswordHash { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow.AddHours(7);

        // Navigation properties
        public List<Project> Projects { get; set; }
        public List<ProjectTask> Tasks { get; set; }
    }
}
