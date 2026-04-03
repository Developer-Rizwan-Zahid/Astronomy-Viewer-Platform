using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace AstronomyViewer.API.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "CelestialObjects",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    Type = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    Description = table.Column<string>(type: "text", nullable: false),
                    RightAscension = table.Column<string>(type: "text", nullable: false),
                    Declination = table.Column<string>(type: "text", nullable: false),
                    ImageUrl = table.Column<string>(type: "text", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CelestialObjects", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    Email = table.Column<string>(type: "text", nullable: false),
                    PasswordHash = table.Column<string>(type: "text", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Favorites",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    UserId = table.Column<Guid>(type: "uuid", nullable: false),
                    CelestialObjectId = table.Column<Guid>(type: "uuid", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Favorites", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Favorites_CelestialObjects_CelestialObjectId",
                        column: x => x.CelestialObjectId,
                        principalTable: "CelestialObjects",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Favorites_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "CelestialObjects",
                columns: new[] { "Id", "CreatedAt", "Declination", "Description", "ImageUrl", "Name", "RightAscension", "Type" },
                values: new object[,]
                {
                    { new Guid("11111111-1111-1111-1111-111111111111"), new DateTime(2026, 4, 1, 8, 5, 26, 989, DateTimeKind.Utc).AddTicks(9258), "N/A", "The star at the center of the Solar System.", "https://example.com/sun.jpg", "Sun", "N/A", "Star" },
                    { new Guid("22222222-2222-2222-2222-222222222222"), new DateTime(2026, 4, 1, 8, 5, 26, 989, DateTimeKind.Utc).AddTicks(9291), "+12d 34m 56s", "The fourth planet from the Sun and the second-smallest planet in the Solar System.", "https://example.com/mars.jpg", "Mars", "12h 34m 56s", "Planet" },
                    { new Guid("33333333-3333-3333-3333-333333333333"), new DateTime(2026, 4, 1, 8, 5, 26, 989, DateTimeKind.Utc).AddTicks(9305), "+41d 16m 09s", "A barred spiral galaxy approximately 2.5 million light-years from Earth.", "https://example.com/andromeda.jpg", "Andromeda Galaxy", "00h 42m 44s", "Galaxy" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Favorites_CelestialObjectId",
                table: "Favorites",
                column: "CelestialObjectId");

            migrationBuilder.CreateIndex(
                name: "IX_Favorites_UserId",
                table: "Favorites",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Users_Email",
                table: "Users",
                column: "Email",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Favorites");

            migrationBuilder.DropTable(
                name: "CelestialObjects");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
