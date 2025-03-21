using task_management_api.Data;
using task_management_api.DTOs;
using task_management_api.Models;
using task_management_api.Services;

namespace task_management_api.Services
{
    public class EditProfileService
    {
        private readonly AppDbContext _context;
        private readonly PasswordService _passwordService;

        public EditProfileService(AppDbContext context, PasswordService passwordService)
        {
            _context = context;
            _passwordService = passwordService;
        }

        public async Task<bool> UpdateProfileAsync(string userId, EditProfileDto dto)
        {
            if(!Guid.TryParse(userId, out var parsedUserId))
            {
                Console.Error.WriteLine("Invalid user ID format: " + userId);
                throw new ArgumentException("Invalid user id format");
            }

            var user = await _context.Users.FindAsync(parsedUserId);
            if (user == null)
            {
                Console.Error.WriteLine("User not found: " + userId);
                return false;
            }

            // Verify current password
            if (!_passwordService.VerifyPassword(dto.CurrentPassword, user.PasswordHash))
            {
                Console.Error.WriteLine("Incorrect password for user: " + userId);
                throw new UnauthorizedAccessException("Incorrect Password");
            }

            // Update fields (ensure non-null values are provided)
            user.Username = string.IsNullOrWhiteSpace(dto.Username) ? user.Username : dto.Username;
            user.Email = string.IsNullOrWhiteSpace(dto.Email) ? user.Email : dto.Email;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine("Error saving changes: " + ex.Message);
                throw; // rethrow the error so the client gets a 500
            }
            return true;
        }
    }
}
