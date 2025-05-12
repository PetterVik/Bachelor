using Microsoft.AspNetCore.Http;

namespace PureLogicBackend.DTOs
{

    // Data Transfer Object for Project – brukes til å motta og validere data
    // fra klienten før de omformes til Project-entiteten i databasen.
    public class ProjectDto
{
    // Tittel på prosjektet. Obligatorisk felt for overskrift og navigasjon.
    public required string Title { get; set; }
    
    // Kort beskrivelse av prosjektet. Vises i liste- og detaljvisninger.
    public required string Description { get; set; }

    // Komma-separerte nøkkelord for søk og filtrering av prosjekter.
    public required string Keywords { get; set; }

    // Angir om prosjektet skal vises på den offentlige nettsiden med ja eller nei.
    public bool VisibleOnWebsite { get; set; }

    // Valgfri bildefil som blir lastet opp for prosjektets forside.
    // Bruker IFormFile for å håndtere form-data.
    public IFormFile? Image { get; set; }

    // Strukturerte data som definerer rekkefølgen og innholdet i prosjektets seksjoner.
    public required string Sections { get; set; }
}

}
