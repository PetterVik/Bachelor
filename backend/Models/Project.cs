using System.ComponentModel.DataAnnotations.Schema;

namespace PureLogicBackend.Models
{
    public class Project
    {
        public int Id { get; set; }

        public string? Title { get; set; } // Kan være null
        public string? Description { get; set; } // Kan være null

        [Column("image_url")] // Sørger for at det matcher databasen
        public string? ImageUrl { get; set; } 
    }
}
