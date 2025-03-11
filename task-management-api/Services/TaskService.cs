using System.Reflection.Metadata.Ecma335;
using Microsoft.EntityFrameworkCore;
using task_management_api.Data;
using task_management_api.DTOs;
using task_management_api.Models;

namespace task_management_api.Services
{
    public class TaskService
    {
        private readonly AppDbContext _context;

        public TaskService(AppDbContext context)
        {
            _context = context;
        }

        // Get Task Function
        public async Task<List<TaskResponseDto>> GetTasks()
        {
            var tasks = await _context.Tasks
                .Include(t => t.Project)
                .Include(t => t.User)
                .ToListAsync();

            return tasks.Select(t => new TaskResponseDto
            {
                Id = t.Id,
                Title = t.Title,
                Description = t.Description,
                Status = t.Status.ToString(),
                DueDate = t.DueDate,
                CreatedAt = t.CreatedAt,
                Project = new ProjectResponseDto
                {
                    Id = t.Project.Id,
                    Name = t.Project.Name,
                    Description = t.Project.Description
                },
                User = new UserResponseDto
                {
                    Id = t.User.Id,
                    Username = t.User.Username,
                    Email = t.User.Email
                }
            }).ToList();

        }

        public async Task<ProjectTask?> GetTask(Guid id)
        {
            return await _context.Tasks
                .AsNoTracking()
                .Include(t => t.Project)
                .Include(t => t.User)
                .FirstOrDefaultAsync(t => t.Id == id);
        }

        // Create Task Function
        public async Task<ProjectTask> CreateTask(CreateTaskDto taskDto)
        {
            var task = new ProjectTask
            {
                Title = taskDto.Title,
                Description = taskDto.Description,
                DueDate = taskDto.DueDate,
                ProjectId = taskDto.ProjectId,
                UserId = taskDto.UserId
            };

            _context.Tasks.Add(task);
            await _context.SaveChangesAsync();
            return task;
        }

        // Update Task Function
        public async Task<ProjectTask?> UpdateTask(Guid id, UpdateTaskDto taskDto)
        {
            var task = await _context.Tasks.FindAsync(id);
            if (task == null) return null;

            task.Title = taskDto.Title;
            task.Description = taskDto.Description;
            task.DueDate = taskDto.DueDate;
            task.Status = Enum.Parse<Models.TaskStatus>(taskDto.Status);

            await _context.SaveChangesAsync();
            return task;
        }

        // Delete Task Function
        public async Task<bool> DeleteTask(Guid id)
        {
            var task = await _context.Tasks.FindAsync(id);
            if (task == null) return false;

            _context.Tasks.Remove(task);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
