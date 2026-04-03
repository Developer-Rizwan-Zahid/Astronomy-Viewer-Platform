using AstronomyViewer.API.Services;
using Microsoft.AspNetCore.Mvc;

namespace AstronomyViewer.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SearchController : ControllerBase
    {
        private readonly AstronomyService _astronomyService;

        public SearchController(AstronomyService astronomyService)
        {
            _astronomyService = astronomyService;
        }

        [HttpGet]
        public async Task<IActionResult> Search([FromQuery] string q)
        {
            if (string.IsNullOrEmpty(q)) return BadRequest("Query cannot be empty.");
            return Ok(await _astronomyService.SearchObjectsAsync(q));
        }
    }
}
