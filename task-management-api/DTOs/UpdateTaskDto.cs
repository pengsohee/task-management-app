using System.ComponentModel.DataAnnotations;
using task_management_api.Models;

namespace task_management_api.DTOs
{
    public class UpdateTaskDto
    {
        [Required]
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime? DueDate { get; set; }
        public ProjectTaskStatus Status { get; set; }
    }
}
