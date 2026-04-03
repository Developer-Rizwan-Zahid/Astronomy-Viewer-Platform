using AstronomyViewer.API.Services;
using Microsoft.AspNetCore.Mvc;

namespace AstronomyViewer.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AstronomyController : ControllerBase
    {
        private readonly AstronomyService _astronomyService;

        public AstronomyController(AstronomyService astronomyService)
        {
            _astronomyService = astronomyService;
        }

        [HttpGet("stars")]
        public async Task<IActionResult> GetStars()
        {
            return Ok(await _astronomyService.GetObjectsByTypeAsync("Star"));
        }

        [HttpGet("planets")]
        public async Task<IActionResult> GetPlanets()
        {
            return Ok(await _astronomyService.GetObjectsByTypeAsync("Planet"));
        }

        [HttpGet("constellations")]
        public async Task<IActionResult> GetConstellations()
        {
            return Ok(await _astronomyService.GetObjectsByTypeAsync("Constellation"));
        }

        [HttpGet("object/{id}")]
        public async Task<IActionResult> GetObjectById(Guid id)
        {
            var obj = await _astronomyService.GetObjectByIdAsync(id);
            if (obj == null) return NotFound();
            return Ok(obj);
        }
    }
}
