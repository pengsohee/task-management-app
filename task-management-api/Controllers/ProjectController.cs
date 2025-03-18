using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using task_management_api.Models;
using task_management_api.Services;

namespace task_management_api.Controllers
{
    [ApiController]
    [Route("api/projects")]
    public class ProjectController : ControllerBase
    {
        private readonly ProjectService _projectService;

        public ProjectController(ProjectService projectService)
        {
            _projectService = projectService;
        }


        [HttpGet("user/{userId}")]
        public async Task<ActionResult<IEnumerable<ProjectTask>>> GetProjectsByUserId(Guid userId)
        {
            var tasks = await _projectService.GetProjectsByUserId(userId);
            return tasks != null && tasks.Any() ? Ok(tasks) : NotFound();
        }
    }
}
