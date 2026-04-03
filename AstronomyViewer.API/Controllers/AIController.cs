using Microsoft.AspNetCore.Mvc;

namespace AstronomyViewer.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AIController : ControllerBase
    {
        [HttpPost("chat")]
        public IActionResult Chat([FromBody] ChatRequest request)
        {
            // Mock logic for AI chat
            string response = "The Andromeda Galaxy is a barred spiral galaxy approximately 2.5 million light-years from Earth.";
            if (request.Message.ToLower().Contains("mars"))
                response = "Mars is often called the 'Red Planet' due to the iron oxide prevalent on its surface.";

            return Ok(new
            {
                Response = response,
                Timestamp = DateTime.UtcNow
            });
        }

        public class ChatRequest
        {
            public string Message { get; set; } = string.Empty;
        }
    }
}
