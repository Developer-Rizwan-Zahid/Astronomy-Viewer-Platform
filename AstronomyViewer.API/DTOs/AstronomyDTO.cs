namespace AstronomyViewer.API.DTOs
{
    public class CelestialObjectResponse
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Type { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string RightAscension { get; set; } = string.Empty;
        public string Declination { get; set; } = string.Empty;
        public string ImageUrl { get; set; } = string.Empty;
    }

    public class FavoriteRequest
    {
        public Guid CelestialObjectId { get; set; }
    }
}
