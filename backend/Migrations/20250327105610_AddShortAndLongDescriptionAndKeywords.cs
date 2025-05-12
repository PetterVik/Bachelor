using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    // Migrasjon som legger til nye kolonner for korte og lange beskrivelser og samt nøkkelord på Projects-tabellen.
    public partial class AddShortAndLongDescriptionAndKeywords : Migration
    {
        // Kjør migrasjonen: legg til kolonnene Keywords, LongDescription og ShortDescription,
        // og oppdater eksisterende rader med standardverdier (null).
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // Legger til kolonne for nøkkelord (f.eks. søk/filtrering)
            migrationBuilder.AddColumn<string>(
                name: "Keywords",
                table: "Projects",
                type: "text",
                nullable: true);

            // Legger til kolonne for detaljert (lang) beskrivelse av prosjektet
            migrationBuilder.AddColumn<string>(
                name: "LongDescription",
                table: "Projects",
                type: "text",
                nullable: true);

            // Legger til kolonne for kort beskrivelse av prosjektet
            migrationBuilder.AddColumn<string>(
                name: "ShortDescription",
                table: "Projects",
                type: "text",
                nullable: true);

            // Oppdaterer eksisterende rad med Id=1, setter de nye kolonnene til null
            migrationBuilder.UpdateData(
                table: "Projects",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "Keywords", "LongDescription", "ShortDescription" },
                values: new object[] { null, null, null });

            // Oppdaterer eksisterende rad med Id=2, setter de nye kolonnene til null
            migrationBuilder.UpdateData(
                table: "Projects",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "Keywords", "LongDescription", "ShortDescription" },
                values: new object[] { null, null, null });
        }

        // Reverter migrasjonen: fjern de tre nylig opprettede kolonnene fra Projects-tabellen.
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            // Fjerner Keywords-kolonne
            migrationBuilder.DropColumn(
                name: "Keywords",
                table: "Projects");

             // Fjerner LongDescription-kolonnen
            migrationBuilder.DropColumn(
                name: "LongDescription",
                table: "Projects");

            // Fjerner ShortDescription-kolonnen
            migrationBuilder.DropColumn(
                name: "ShortDescription",
                table: "Projects");
        }
    }
}
