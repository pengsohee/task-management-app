namespace task_management_api.DTOs
{
    public class EditProfileDto
    {
        public string Username { get; set; }
        public string Email { get; set; }
        public string CurrentPassword { get; set; } = string.Empty; 
    }
}
