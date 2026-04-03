using AstronomyViewer.API.Data;
using AstronomyViewer.API.DTOs;
using AstronomyViewer.API.Helpers;
using AstronomyViewer.API.Models;
using Microsoft.EntityFrameworkCore;

namespace AstronomyViewer.API.Services
{
    public class AuthService
    {
        private readonly AppDbContext _context;
        private readonly JwtHelper _jwtHelper;

        public AuthService(AppDbContext context, JwtHelper jwtHelper)
        {
            _context = context;
            _jwtHelper = jwtHelper;
        }

        public async Task<AuthResponse?> RegisterAsync(RegisterRequest request)
        {
            if (await _context.Users.AnyAsync(u => u.Email == request.Email))
                return null;

            var user = new User
            {
                Name = request.Name,
                Email = request.Email,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.Password)
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return new AuthResponse
            {
                Id = user.Id,
                Name = user.Name,
                Email = user.Email,
                Token = _jwtHelper.GenerateToken(user.Id, user.Email)
            };
        }

        public async Task<AuthResponse?> LoginAsync(LoginRequest request)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == request.Email);

            if (user == null || !BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
                return null;

            return new AuthResponse
            {
                Id = user.Id,
                Name = user.Name,
                Email = user.Email,
                Token = _jwtHelper.GenerateToken(user.Id, user.Email)
            };
        }

        public async Task<UserProfileResponse?> GetProfileAsync(Guid userId)
        {
            var user = await _context.Users.FindAsync(userId);
            if (user == null) return null;

            return new UserProfileResponse
            {
                Id = user.Id,
                Name = user.Name,
                Email = user.Email,
                CreatedAt = user.CreatedAt
            };
        }
    }
}
