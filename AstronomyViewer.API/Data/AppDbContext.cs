using AstronomyViewer.API.Models;
using Microsoft.EntityFrameworkCore;

namespace AstronomyViewer.API.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Favorite> Favorites { get; set; }
        public DbSet<CelestialObject> CelestialObjects { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configure Unique Email for User
            modelBuilder.Entity<User>()
                .HasIndex(u => u.Email)
                .IsUnique();

            // Configure Relationships
            modelBuilder.Entity<Favorite>()
                .HasOne(f => f.User)
                .WithMany(u => u.Favorites)
                .HasForeignKey(f => f.UserId);

            modelBuilder.Entity<Favorite>()
                .HasOne(f => f.CelestialObject)
                .WithMany()
                .HasForeignKey(f => f.CelestialObjectId);

            // Seed Data for CelestialObjects
            modelBuilder.Entity<CelestialObject>().HasData(
                new CelestialObject
                {
                    Id = Guid.Parse("11111111-1111-1111-1111-111111111111"),
                    Name = "Sun",
                    Type = "Star",
                    Description = "The star at the center of the Solar System.",
                    RightAscension = "N/A",
                    Declination = "N/A",
                    ImageUrl = "https://example.com/sun.jpg"
                },
                new CelestialObject
                {
                    Id = Guid.Parse("22222222-2222-2222-2222-222222222222"),
                    Name = "Mars",
                    Type = "Planet",
                    Description = "The fourth planet from the Sun and the second-smallest planet in the Solar System.",
                    RightAscension = "12h 34m 56s",
                    Declination = "+12d 34m 56s",
                    ImageUrl = "https://example.com/mars.jpg"
                },
                new CelestialObject
                {
                    Id = Guid.Parse("33333333-3333-3333-3333-333333333333"),
                    Name = "Andromeda Galaxy",
                    Type = "Galaxy",
                    Description = "A barred spiral galaxy approximately 2.5 million light-years from Earth.",
                    RightAscension = "00h 42m 44s",
                    Declination = "+41d 16m 09s",
                    ImageUrl = "https://example.com/andromeda.jpg"
                }
            );
        }
    }
}
