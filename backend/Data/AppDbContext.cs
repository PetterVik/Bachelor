using Microsoft.EntityFrameworkCore;
using PureLogicBackend.Models; 

namespace PureLogicBackend.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Project> Projects { get; set; }
    }
}
