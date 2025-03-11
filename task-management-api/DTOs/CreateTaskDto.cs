using System.ComponentModel.DataAnnotations;

namespace task_management_api.DTOs
{
    public class CreateTaskDto
    {
        [Required]
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime? DueDate { get; set; }
        [Required]
        public Guid ProjectId { get; set; }
        [Required]
        public Guid UserId { get; set; }
    }
}
