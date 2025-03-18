using System;
using BCrypt.Net;

namespace task_management_api.Services
{
    public class PasswordService
    {
        public string HashPassword (string password)
        {
            return BCrypt.Net.BCrypt.HashPassword(password);
        }

        public bool VerifyPassword(string password, string passwordHash)
        {
            return BCrypt.Net.BCrypt.Verify(password, passwordHash);
        }
    }
}
