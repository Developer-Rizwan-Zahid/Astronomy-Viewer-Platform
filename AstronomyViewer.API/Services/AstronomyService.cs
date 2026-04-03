using AstronomyViewer.API.Data;
using AstronomyViewer.API.DTOs;
using AstronomyViewer.API.Models;
using Microsoft.EntityFrameworkCore;

namespace AstronomyViewer.API.Services
{
    public class AstronomyService
    {
        private readonly AppDbContext _context;

        public AstronomyService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<CelestialObjectResponse>> GetObjectsByTypeAsync(string type)
        {
            return await _context.CelestialObjects
                .Where(o => o.Type.ToLower() == type.ToLower())
                .Select(o => MapToResponse(o))
                .ToListAsync();
        }

        public async Task<CelestialObjectResponse?> GetObjectByIdAsync(Guid id)
        {
            var obj = await _context.CelestialObjects.FindAsync(id);
            return obj == null ? null : MapToResponse(obj);
        }

        public async Task<IEnumerable<CelestialObjectResponse>> SearchObjectsAsync(string query)
        {
            return await _context.CelestialObjects
                .Where(o => o.Name.ToLower().Contains(query.ToLower()) || o.Description.ToLower().Contains(query.ToLower()))
                .Select(o => MapToResponse(o))
                .ToListAsync();
        }

        public async Task<bool> AddToFavoritesAsync(Guid userId, Guid objectId)
        {
            if (await _context.Favorites.AnyAsync(f => f.UserId == userId && f.CelestialObjectId == objectId))
                return false;

            var favorite = new Favorite
            {
                UserId = userId,
                CelestialObjectId = objectId
            };

            _context.Favorites.Add(favorite);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<IEnumerable<CelestialObjectResponse>> GetUserFavoritesAsync(Guid userId)
        {
            return await _context.Favorites
                .Where(f => f.UserId == userId)
                .Include(f => f.CelestialObject)
                .Select(f => MapToResponse(f.CelestialObject!))
                .ToListAsync();
        }

        public async Task<bool> RemoveFromFavoritesAsync(Guid userId, Guid objectId)
        {
            var favorite = await _context.Favorites
                .FirstOrDefaultAsync(f => f.UserId == userId && f.CelestialObjectId == objectId);

            if (favorite == null) return false;

            _context.Favorites.Remove(favorite);
            await _context.SaveChangesAsync();
            return true;
        }

        private static CelestialObjectResponse MapToResponse(CelestialObject o)
        {
            return new CelestialObjectResponse
            {
                Id = o.Id,
                Name = o.Name,
                Type = o.Type,
                Description = o.Description,
                RightAscension = o.RightAscension,
                Declination = o.Declination,
                ImageUrl = o.ImageUrl
            };
        }
    }
}
