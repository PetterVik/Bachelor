namespace PureLogicBackend.Controllers
{
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.EntityFrameworkCore;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using PureLogicBackend.Data;
    using PureLogicBackend.Models;
    using PureLogicBackend.DTOs;
    using System.IO;
    using System;

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
            var projects = await _context.Projects.Where(p => p.IsArchived == true).ToListAsync();
            return Ok(projects);
        }


        // Henter ETT prosjekt basert på ID
        [HttpGet("{id}")]
        public async Task<ActionResult<Project>> GetProjectById(int id)
        {
            var project = await _context.Projects.FindAsync(id);
            if (project == null)
            {
                return NotFound();
            }
            return Ok(project);
        }

        // Oppretter et nytt prosjekt via CMS
        [HttpPost]
        public async Task<IActionResult> CreateProject([FromForm] ProjectDto dto)
        {
            var project = new Project
            {
                Title = dto.Title,
                Description = dto.Description,
                Keywords = dto.Keywords,
                ShortDescription = dto.Description, // Juster om du vil lagre kort beskrivelse separat
                LongDescription = dto.Sections,      // For enkelhet lagrer vi "sections" her
                VisibleOnWebsite = dto.VisibleOnWebsite
            };

            // Håndter bildeopplasting
            if (dto.Image != null)
            {
                var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "uploads");
                if (!Directory.Exists(uploadsFolder))
                {
                    Directory.CreateDirectory(uploadsFolder);
                }
                var uniqueFileName = $"{Guid.NewGuid()}{Path.GetExtension(dto.Image.FileName)}";
                var filePath = Path.Combine(uploadsFolder, uniqueFileName);
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await dto.Image.CopyToAsync(stream);
                }
                project.ImageUrl = "/uploads/" + uniqueFileName;
            }

            _context.Projects.Add(project);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetProjectById), new { id = project.Id }, project);
        }

        // Oppdaterer et eksisterende prosjekt
        [HttpPut("{id}")]
            public async Task<IActionResult> UpdateProject(int id, [FromBody] ProjectDto dto)
            {
                var project = await _context.Projects.FindAsync(id);
                if (project == null)
                {
                    return NotFound();
                }

                // Oppdater prosjektet med data fra dto
                project.Title = dto.Title;
                project.Description = dto.Description;
                project.ShortDescription = dto.Description;
                project.LongDescription = dto.Sections;
                project.VisibleOnWebsite = dto.VisibleOnWebsite;
                project.Keywords = dto.Keywords;

                _context.Entry(project).State = EntityState.Modified;
                await _context.SaveChangesAsync();

                return Ok(project);
            }


        // Sletter et prosjekt basert på ID
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProject(int id)
        {
            var project = await _context.Projects.FindAsync(id);
            if (project == null)
            {
                return NotFound();
            }

            _context.Projects.Remove(project);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
