using AstronomyViewer.API.DTOs;
using AstronomyViewer.API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace AstronomyViewer.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class FavoritesController : ControllerBase
    {
        private readonly AstronomyService _astronomyService;

        public FavoritesController(AstronomyService astronomyService)
        {
            _astronomyService = astronomyService;
        }

        [HttpGet]
        public async Task<IActionResult> GetFavorites()
        {
            var userId = Guid.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
            return Ok(await _astronomyService.GetUserFavoritesAsync(userId));
        }

        [HttpPost]
        public async Task<IActionResult> AddFavorite([FromBody] FavoriteRequest request)
        {
            var userId = Guid.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
            var success = await _astronomyService.AddToFavoritesAsync(userId, request.CelestialObjectId);
            if (!success) return BadRequest("Already in favorites or object not found.");
            return Ok("Added to favorites.");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> RemoveFavorite(Guid id)
        {
            var userId = Guid.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
            var success = await _astronomyService.RemoveFromFavoritesAsync(userId, id);
            if (!success) return NotFound("Favorite not found.");
            return Ok("Removed from favorites.");
        }
    }
}
