namespace task_management_api.DTOs
{
    public class TaskResponseDto
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Status { get; set; }
        public DateTime? DueDate { get; set; }
        public DateTime CreatedAt { get; set; }

        // Flattened project/user data (no circular refs)
        public ProjectResponseDto Project { get; set; }
        public UserResponseDto User { get; set; }
    }

    public class ProjectResponseDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
    }

    public class UserResponseDto
    {
        public Guid Id { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
    }
}
