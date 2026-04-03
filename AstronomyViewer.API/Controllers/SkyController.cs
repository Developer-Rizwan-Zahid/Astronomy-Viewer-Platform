using Microsoft.AspNetCore.Mvc;

namespace AstronomyViewer.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SkyController : ControllerBase
    {
        [HttpPost("by-location")]
        public IActionResult GetSkyByLocation([FromBody] LocationRequest request)
        {
            // Mock logic for location-based sky data
            return Ok(new
            {
                Location = $"{request.Latitude}, {request.Longitude}",
                Time = DateTime.UtcNow,
                VisibleObjects = new[] { "Venus", "Jupiter", "Sirius" }
            });
        }

        [HttpGet("simulate")]
        public IActionResult SimulateSky()
        {
            // Mock logic for sky simulation
            return Ok(new
            {
                SimulationUrl = "https://example.com/sky-simulation",
                CurrentTime = DateTime.UtcNow
            });
        }

        public class LocationRequest
        {
            public double Latitude { get; set; }
            public double Longitude { get; set; }
        }
    }
}
