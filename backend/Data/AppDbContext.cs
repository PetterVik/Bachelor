using Microsoft.EntityFrameworkCore;
using PureLogicBackend.Models; 

namespace PureLogicBackend.Data
{
        /// <summary>
        /// AppDbContext arver fra EF Core sin DbContext og fungerer som inngangspunktet
        /// for alle databaseoperasjoner mot vår PostgreSQL-database.
        /// </summary>
    public class AppDbContext : DbContext
    {

        /// <summary>
        /// Konstruktør som tar imot DbContextOptions fra DI-containeren
        /// og videresender dem til base-klassen. Her konfigureres bl.a.
        /// tilkoblingsstreng og provider for PostgreSQL.
        /// </summary>
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        /// <summary>
        /// DbSet-propertien representerer tabellen/entiteten «Project» i databasen.
        /// Gjennom denne kan vi gjøre CRUD-operasjoner (Create, Read, Update, Delete)
        /// på rader i Projects-tabellen.
        /// </summary>
        public DbSet<Project> Projects { get; set; }
    }
}
