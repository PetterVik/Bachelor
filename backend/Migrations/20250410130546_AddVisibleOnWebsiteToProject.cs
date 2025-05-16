using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    // Migrasjon som legger til en VisibleOnWebsite-kolonne i Projects-tabellen
    // for å styre om hvert prosjekt skal vises offentlig.
    public partial class AddVisibleOnWebsiteToProject : Migration
    {
        // Kjør migrasjonen: 
        // 1. Legg til boolsk kolonne "VisibleOnWebsite" med default false. 
        // 2. Oppdater eksisterende rader (Id 1 og 2) til å ha false-verdier
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // Legger til ny kolonne for synlighet på nettsiden
            migrationBuilder.AddColumn<bool>(
                name: "VisibleOnWebsite",
                table: "Projects",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            // Setter VisibleOnWebsite = false for prosjekt med Id = 1
            migrationBuilder.UpdateData(
                table: "Projects",
                keyColumn: "Id",
                keyValue: 1,
                column: "VisibleOnWebsite",
                value: false);

            // Setter VisibleOnWebsite = false for prosjekt med Id = 2
            migrationBuilder.UpdateData(
                table: "Projects",
                keyColumn: "Id",
                keyValue: 2,
                column: "VisibleOnWebsite",
                value: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            // Fjerner kolonnen igjen ved rollback
            migrationBuilder.DropColumn(
                name: "VisibleOnWebsite",
                table: "Projects");
        }
    }
}
