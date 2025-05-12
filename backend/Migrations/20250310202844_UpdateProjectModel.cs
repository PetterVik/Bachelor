using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace backend.Migrations
{
    // Migration som legger til Projects-tabellen med kolonner og seed-data
    // for å støtte lagring av prosjekter i databasen.
    public partial class UpdateProjectModel : Migration
    {
        // Kjør migreringen: opprett Projects-tabellen og legg inn standardrader.
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // Oppretter tabellen "Projects" med kolonner for Id, Title, Description og ImageUrl
            migrationBuilder.CreateTable(
                name: "Projects",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                    // Konfigurerer automatisk verdi­generering ved innsatte rader
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Title = table.Column<string>(type: "text", nullable: true),
                    Description = table.Column<string>(type: "text", nullable: true),
                    ImageUrl = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    // Setter Id som primærnøkkel
                    table.PrimaryKey("PK_Projects", x => x.Id);
                });
                //Litt eldre testdata. Denne kan fjernes hvis dere ønsker. 
            migrationBuilder.InsertData(
                table: "Projects",
                columns: new[] { "Id", "Description", "ImageUrl", "Title" },
                values: new object[,]
                {
                    { 1, "I prosjektet ble byggekostnadene og klima-fotavtrykket redusert med henholdsvis 30 og 50%.", "/images/bjornafjorden.jpg", "Konseptutvikling: E39, Kryssing av Bjørnafjorden" },
                    { 2, "BioZement er fortsatt under utvikling og målet er å redusere klima-fotavtrykket til betongindustrien med 20%.", "/images/biozement.jpg", "Produktutvikling av BioZement som alternativ til betong" }
                });
        }

        // Reverter migreringen ved å fjerne Projects-tabellen og all tilhørende data.
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            // Sletter Projects-tabellen helt
            migrationBuilder.DropTable(
                name: "Projects");
        }
    }
}
