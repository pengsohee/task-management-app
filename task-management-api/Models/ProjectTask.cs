namespace task_management_api.Models
{
    public class ProjectTask
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public TaskStatus Status { get; set; } = TaskStatus.Todo;
        public DateTime? DueDate { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow.AddHours(7);

        // Foreign keys
        public Guid ProjectId { get; set; }
        public Project? Project { get; set; }

        public Guid UserId { get; set; }
        public User User { get; set; }
    }
}
