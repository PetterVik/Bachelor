using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

[ApiController]
[Route("api/projects")]
public class ProjectsController : ControllerBase
{
    [HttpGet]
    public IActionResult GetProjects()
    {
        var projects = new List<object>
        {
            new { id = 1, title = "Prosjekt 1", Description = "Dette er det første prosjektet", image= "/images/project1"},
            new { id = 2, title = "Prosjekt 2", Description = "Dette er det andre prosjektet", image= "/images/project1"},
        };

        return Ok(projects);
    }
}
