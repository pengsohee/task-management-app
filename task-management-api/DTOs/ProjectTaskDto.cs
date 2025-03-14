namespace task_management_api.DTOs
{
    public class ProjectTaskDto
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Status { get; set; }
        public DateTime? DueDate { get; set; }
        public DateTime CreatedAt { get; set; }
        public Guid ProjectId { get; set; }
        public string ProjectTitle { get; set; } // Get project title instead of full project object
        public Guid UserId { get; set; }
        public string Username { get; set; }
    }
}
