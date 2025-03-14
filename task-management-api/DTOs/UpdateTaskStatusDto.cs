using task_management_api.Models;

namespace task_management_api.DTOs
{
    public class UpdateTaskStatusDto
    {
        public ProjectTaskStatus Status { get; set; }
    }
}