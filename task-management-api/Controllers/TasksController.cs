using Microsoft.AspNetCore.Mvc;
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
        [HttpGet]
        public async Task<ActionResult<List<TaskResponseDto>>> GetTasks()
        {
            return Ok(await _taskService.GetTasks());
        }

        // GET: GetTasks[id]
        [HttpGet("{id}")]
        public async Task<ActionResult<ProjectTask>> GetTask(Guid id)
        {
            var task = await _taskService.GetTask(id);
            return task != null ? Ok(task) : NotFound();
        }

        // POST: CreateTask
        [HttpPost]
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

        // PUT: UpdateTask[id]
        [HttpPut("{id}")]
        public async Task<ActionResult<ProjectTask>> UpdateTask(Guid id, UpdateTaskDto taskDto)
        {
            if (taskDto == null)
            {
                return BadRequest("Task data is required.");
            }
            var task = await _taskService.UpdateTask(id, taskDto);
            return task != null ? Ok(task) : NotFound();
        }

        // DELETE: DeleteTask[id]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTask(Guid id)
        {
            return await _taskService.DeleteTask(id) ? NoContent() : NotFound();
        }
    }
}
