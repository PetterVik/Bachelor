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

        // 🔽 Nye felter for kort/lang beskrivelse og nøkkelord
        public string? ShortDescription { get; set; } // Vises på forsiden
        public string? LongDescription { get; set; }  // Vises i detaljside
        public string? Keywords { get; set; }         // Kommaseparert f.eks. "Hydrogen,Energi,Oman"
    }
}
