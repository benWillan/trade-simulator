using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BrokerController: ControllerBase
{
    [HttpPost]
    public async Task<IActionResult> Execute([FromBody] string? payload)
    {
        Console.WriteLine(payload);
        
        return Ok();
    }
}