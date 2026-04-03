using System.ComponentModel.DataAnnotations;

namespace AstronomyViewer.API.Models
{
    public class CelestialObject
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();

        [Required]
        [MaxLength(100)]
        public string Name { get; set; } = string.Empty;

        [Required]
        [MaxLength(50)]
        public string Type { get; set; } = string.Empty; // Planet, Star, Galaxy, etc.

        public string Description { get; set; } = string.Empty;

        public string RightAscension { get; set; } = string.Empty;

        public string Declination { get; set; } = string.Empty;

        public string ImageUrl { get; set; } = string.Empty;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
