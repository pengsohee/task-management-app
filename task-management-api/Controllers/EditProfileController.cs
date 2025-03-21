using Microsoft.AspNetCore.Mvc;
using task_management_api.Services;
using task_management_api.DTOs;
using Microsoft.AspNetCore.Authorization;

namespace task_management_api.Controllers
{
    [Route("api/profile")]
    [ApiController]
    public class EditProfileController : ControllerBase
    {
        private readonly EditProfileService _editProfileService;

        public EditProfileController(EditProfileService editProfileService)
        {
            _editProfileService = editProfileService;
        }

        [Authorize]
        [HttpPatch("{userId}")]
        public async Task<IActionResult> EditProfile(string userId, [FromBody] EditProfileDto dto)
        {
            try
            {
                var result = await _editProfileService.UpdateProfileAsync(userId, dto);
                if (!result) return NotFound("User not found");
                return Ok(result);
            }
            catch (UnauthorizedAccessException ex)
            {
                return Unauthorized(ex);
            }
        }
    }
}
