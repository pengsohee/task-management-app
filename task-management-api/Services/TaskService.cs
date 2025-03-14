using System.Reflection.Metadata.Ecma335;
using Microsoft.AspNetCore.Mvc;
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
                .ThenInclude(p => p.User)
                .Select(t => new TaskResponseDto
                {
                    Id = t.Id,
                    TaskTitle = t.Title,
                    ProjectTitle = t.Project.Title,
                    Username = t.Project.User.Username,
                    DueDate = (DateTime)t.DueDate,
                    CreatedAt = t.CreatedAt,
                    Status = t.Status
                })
                .ToListAsync();

            return tasks;
        }

        public async Task<ProjectTaskDto?> GetTask(Guid id)
        {
            return await _context.Tasks
                .Include(t => t.Project)
                .ThenInclude(p => p.User)
                .Where(t => t.Id == id)
                .Select(t => new ProjectTaskDto
                {
                    Id = t.Id,
                    Title = t.Title,
                    Description = t.Description,
                    Status = t.Status.ToString(),
                    DueDate = t.DueDate,
                    CreatedAt = t.CreatedAt,
                    ProjectTitle = t.Project.Title,
                    Username = t.Project.User.Username
                })
                .FirstOrDefaultAsync();
        }

        // Create Task Function
        public async Task<ProjectTaskDto> CreateTask(CreateTaskDto taskDto)
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

            // refetch the data for updated information
            var createdTask = await _context.Tasks
                .Include(t => t.Project)
                .ThenInclude(p => p.User)
                .FirstOrDefaultAsync(t => t.Id == task.Id);

            //if (createdTask != null)
            //{
            //    throw new Exception("Task was created but could not be retrieved.");
            //}

            return new ProjectTaskDto
            {
                Id = task.Id,
                Title = task.Title,
                Description = task.Description,
                DueDate= task.DueDate,
                CreatedAt = task.CreatedAt,
                ProjectId = task.ProjectId,
                UserId = task.UserId,
                ProjectTitle = createdTask.Project?.Title ?? "Unknown",
                Username = createdTask.Project?.User?.Username ?? "Unknown"
            };
        }

        // Update Task Function
        public async Task<ProjectTask?> UpdateTask(Guid id, UpdateTaskDto taskDto)
        {
            // enum validation for status
            if(!Enum.IsDefined(typeof(ProjectTaskStatus), taskDto.Status))
            {
                throw new ArgumentException("Invalid task status");
            }
            var task = await _context.Tasks.FindAsync(id);
            if (task == null) return null;

            task.Title = taskDto.Title;
            task.Description = taskDto.Description;
            task.DueDate = taskDto.DueDate;
            task.Status = taskDto.Status;

            await _context.SaveChangesAsync();
            return task;
        }

        // Update status function
        public async Task<ProjectTask?> UpdateTaskStatus(Guid id, UpdateTaskStatusDto taskDto)
        {
            var task = await _context.Tasks.FindAsync(id);
            if (task == null) return null;

            if (!Enum.IsDefined(typeof(ProjectTaskStatus), taskDto.Status))
            {
                throw new ArgumentException("Invalid task status");
            }

            // Update only the status
            task.Status = taskDto.Status;

            // Hardcode userId and projectId if needed
            task.UserId = Guid.Parse("a89e68fe-7b43-4e2b-bd29-2edf006e8f83");
            task.ProjectId = Guid.Parse("5624882a-718c-4d1b-abbe-1aa0a2ca039e");

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
