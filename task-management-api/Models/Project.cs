namespace task_management_api.Models
{
    public class Project
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow.AddHours(7);

        // Foreign keys
        public Guid UserId { get; set; }
        public User User { get; set; }

        //public List<ProjectTask> Tasks { get; set; }
    }
}
