namespace task_management_api.Models
{
    public class ProjectTask
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public ProjectTaskStatus Status { get; set; } = ProjectTaskStatus.Todo;
        public DateTime? DueDate { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow.AddHours(7);

        //public string ProjectTitle { get; set; }
        //public string Name { get; set; }

        // Foreign keys
        public Guid ProjectId { get; set; }
        public Project? Project { get; set; }

        public Guid UserId { get; set; }
        public User? User { get; set; }
    }
}
