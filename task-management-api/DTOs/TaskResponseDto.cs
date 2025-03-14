using task_management_api.Models;

namespace task_management_api.DTOs
{
    public class TaskResponseDto
    {
        public Guid Id { get; set; }
        public string TaskTitle { get; set; }
        public string ProjectTitle { get; set; }
        public string Username { get; set; }
        public DateTime DueDate { get; set; }
        public DateTime CreatedAt { get; set; }
        public ProjectTaskStatus Status { get; set; }

    }

    //public class ProjectResponseDto
    //{
    //    public Guid Id { get; set; }
    //    public string Name { get; set; }
    //    public string Description { get; set; }
    //}

    //public class UserResponseDto
    //{
    //    public Guid Id { get; set; }
    //    public string Username { get; set; }
    //    public string Email { get; set; }
    //}
}
