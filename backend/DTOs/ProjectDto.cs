using Microsoft.AspNetCore.Http;

namespace PureLogicBackend.DTOs
{
    public class ProjectDto
{
    public required string Title { get; set; }
    public required string Description { get; set; }
    public required string Keywords { get; set; }
    public bool VisibleOnWebsite { get; set; }
    public IFormFile? Image { get; set; }
    public required string Sections { get; set; }
}

}
