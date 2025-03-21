using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using task_management_api.Data;
using task_management_api.DTOs;
using task_management_api.Models;
using task_management_api.Services;

namespace task_management_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TasksController : ControllerBase
    {
        private readonly TaskService _taskService;

        public TasksController(TaskService taskService)
        {
            _taskService = taskService;
        }

        // GET: GetTasks
        [Authorize]
        [HttpGet]
        public async Task<ActionResult<List<TaskResponseDto>>> GetTasks()
        {
            var userIdClaim = User.FindFirst("userId")?.Value;

            if (string.IsNullOrEmpty(userIdClaim) || !Guid.TryParse(userIdClaim, out Guid userId))
            {
                return Unauthorized("Invalid User ID in token");
            }

            var tasks = await _taskService.GetTasks(userId);

            return Ok(tasks);
        }


        // GET: GetTasks[id]
        [Authorize]
        [HttpGet("{id}")]
        public async Task<ActionResult<ProjectTask>> GetTask(Guid id)
        {
            var task = await _taskService.GetTask(id);
            return task != null ? Ok(task) : NotFound();
        }

        // POST: CreateTask
        [Authorize]
        [HttpPost]
        [ProducesResponseType(typeof(ProjectTask), StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<ProjectTask>> CreateTask([FromBody] CreateTaskDto taskDto)
        {
            if (taskDto == null)
            {
                return BadRequest("Task data is required.");
            }

            // Validate user id
            if (taskDto.UserId == Guid.Empty)
            {
                return BadRequest(new { message = "Invalid UserID. It must be a valid GUID."});
            }
            var task = await _taskService.CreateTask(taskDto);
            return CreatedAtAction(nameof(GetTask), new { id = task.Id }, task);
        }

        // PATCH: UpdateTask[id]
        [Authorize]
        [HttpPatch("{id}")]
        public async Task<ActionResult<ProjectTask>> UpdateTask(Guid id, UpdateTaskDto taskDto)
        {
            if (taskDto == null)
            {
                return BadRequest("Task data is required.");
            }
            var task = await _taskService.UpdateTask(id, taskDto);
            return task != null ? Ok(task) : NotFound();
        }

        // PATCH: Update status function
        [Authorize]
        [HttpPatch("{id}/status")]
        public async Task<ActionResult<ProjectTask>> UpdateTaskStatus(Guid id, [FromBody] UpdateTaskStatusDto taskDto)
        {
            var updatedTask = await _taskService.UpdateTaskStatus(id, taskDto);
            return updatedTask != null ? Ok(updatedTask) : NotFound();
        }

        // DELETE: DeleteTask[id]
        [Authorize]
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> DeleteTask(Guid id)
        {
            var deleted = await _taskService.DeleteTask(id);

            if (!deleted)
            {
                return NotFound(new { message = "Task not found." });
            }

            return NoContent();
        }
    }
}
