namespace PureLogicBackend.Controllers
{
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.EntityFrameworkCore;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using PureLogicBackend.Data;
    using PureLogicBackend.Models;

    [ApiController]
    [Route("api/projects")]
    public class ProjectsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ProjectsController(AppDbContext context)
        {
            _context = context;
        }

        // Henter ALLE prosjekter
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Project>>> GetProjects()
        {
            var projects = await _context.Projects.ToListAsync();
            return Ok(projects);
        }

        // Henter ETT prosjekt basert på ID
        [HttpGet("{id}")]
        public async Task<ActionResult<Project>> GetProjectById(int id)
        {
            var project = await _context.Projects.FindAsync(id);

            if (project == null)
            {
                return NotFound(); // Returnerer HTTP 404 hvis prosjektet ikke finnes
            }

            return Ok(project);
        }
        // Opprett et nytt prosjekt
        [HttpPost]
        public async Task<ActionResult<Project>> CreateProject([FromBody] Project project)
        {
            // Du kan senere legge til autentisering/middleware for å begrense til admin-brukere
            _context.Projects.Add(project);
            await _context.SaveChangesAsync();

            // Returner en CreatedAtAction-respons som peker til det nye prosjektet
            return CreatedAtAction(nameof(GetProjectById), new { id = project.Id }, project);
        }
    }
}
