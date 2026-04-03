using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AstronomyViewer.API.Models
{
    public class Favorite
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();

        [Required]
        public Guid UserId { get; set; }

        [Required]
        public Guid CelestialObjectId { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // Navigation properties
        [ForeignKey("UserId")]
        public User? User { get; set; }

        [ForeignKey("CelestialObjectId")]
        public CelestialObject? CelestialObject { get; set; }
    }
}
