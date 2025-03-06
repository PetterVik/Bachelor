using Microsoft.AspNetCore.Mvc;

[ApiController] // Marks this class as an API controller
[Route("api/example")] // Defines the route to access this endpoint
public class ExampleController : ControllerBase
{
    // Handles GET requests to "api/example"
    [HttpGet]
    public IActionResult GetExample()
    {
        // Returns a JSON response with a simple message
        return Ok(new { message = "Hello from .NET API!" });
    }
}
