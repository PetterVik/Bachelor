using Microsoft.EntityFrameworkCore;
using PureLogicBackend.Models; 

namespace PureLogicBackend.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Project> Projects { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Project>().HasData(
                new Project { Id = 1, Title = "Konseptutvikling: E39, Kryssing av Bjørnafjorden", Description = "I prosjektet ble byggekostnadene og klima-fotavtrykket redusert med henholdsvis 30 og 50%.", ImageUrl = "/images/bjornafjorden.jpg" },
                new Project { Id = 2, Title = "Produktutvikling av BioZement som alternativ til betong", Description = "BioZement er fortsatt under utvikling og målet er å redusere klima-fotavtrykket til betongindustrien med 20%.", ImageUrl = "/images/biozement.jpg" }
            );
        }
    }
}
