using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/example")]
public class ExampleController : ControllerBase
{
    [HttpGet]
    public IActionResult GetExample()
    {
        return Ok(new { message = "Hello from .NET API!" });
    }
}
