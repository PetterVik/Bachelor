using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
        // Migration som oppdaterer Projects‐skjemaet ved å gi kolonnen ImageUrl et snake_case‐navn.
    public partial class UpdateProjectSchema : Migration
    {
        // Kjør migrasjonen: bytt ut kolonnen "ImageUrl" med "image_url" i Projects-tabellen.
                protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ImageUrl", // Eksisterende kolonnenavn
                table: "Projects", // Tabellen som inneholder kolonnen
                newName: "image_url"); // Nyt kolonnenavn i snake_case
        }

        // Reverter migrasjonen: bytt kolonnenavnet "image_url" tilbake til "ImageUrl".
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "image_url", // Kolonnenavn etter Up()
                table: "Projects", // Tabellen som inneholder kolonnen
                newName: "ImageUrl"); // Originalt kolonnenavn for rollback
        }
    }
}
