using Microsoft.AspNetCore.Mvc;

namespace AstronomyViewer.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WeatherController : ControllerBase
    {
        [HttpGet]
        public IActionResult GetWeather()
        {
            // Mock logic for sky viewing weather
            return Ok(new
            {
                Condition = "Clear Sky",
                Visibility = "95%",
                CloudCoverage = "5%",
                Temperature = "18°C",
                OptimalForViewing = true
            });
        }
    }
}
