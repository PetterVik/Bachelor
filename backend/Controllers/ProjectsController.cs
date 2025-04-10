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
                return NotFound();
            }
            return Ok(project);
        }

        // Oppretter et nytt prosjekt via CMS
        [HttpPost]
        public async Task<IActionResult> CreateProject([FromForm] ProjectDto dto)
        {
            // Lag et nytt Project-objekt og map feltene fra dto
            var project = new Project
            {
                Title = dto.Title,
                Description = dto.Description,
                Keywords = dto.Keywords,
                ShortDescription = dto.Description, // Juster om du vil lagre kort beskrivelse separat
                LongDescription = dto.Sections,      // For enkelhet lagrer vi "sections" her; du kan senere kombinere dem etter behov
                VisibleOnWebsite = dto.VisibleOnWebsite  // Ny linje: Mapper inn VisibleOnWebsite-verdi fra DTO
            };

            // Håndter bildeopplasting hvis et bilde er lastet opp
            if (dto.Image != null)
            {
                // Bestem mappen der du ønsker å lagre bilder (for eksempel "uploads" i prosjektmappen)
                var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "uploads");
                if (!Directory.Exists(uploadsFolder))
                {
                    Directory.CreateDirectory(uploadsFolder);
                }
                // Lag et unikt filnavn
                var uniqueFileName = $"{Guid.NewGuid()}{Path.GetExtension(dto.Image.FileName)}";
                var filePath = Path.Combine(uploadsFolder, uniqueFileName);
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await dto.Image.CopyToAsync(stream);
                }
                // Lagre relativ filsti (juster om nødvendig)
                project.ImageUrl = "/uploads/" + uniqueFileName;
            }

            _context.Projects.Add(project);
            await _context.SaveChangesAsync();

            // Returner 201 Created med den nye prosjekt-ID-en
            return CreatedAtAction(nameof(GetProjectById), new { id = project.Id }, project);
        }
    }
}
