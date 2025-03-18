using Microsoft.EntityFrameworkCore;
using task_management_api.Data;
using task_management_api.Models;

namespace task_management_api.Services
{
    public class ProjectService
    {
        private readonly AppDbContext _context;

        public ProjectService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<Project>> GetProjectsByUserId(Guid userId)
        {
            return await _context.Projects
                .Where(p => p.UserId == userId)
                .ToListAsync();
        }
    }
}
