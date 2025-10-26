using Microsoft.AspNetCore.Mvc;
using WebApi.DTO;

namespace WebApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BrokerController: ControllerBase
{
    [HttpPost("execute")]
    public async Task<IActionResult> Execute([FromBody] TradeOrderDto? payload)
    {
        if (payload is null) return BadRequest();
        
        Console.WriteLine("Payload");        
        Console.WriteLine("--------");
        
        Console.WriteLine($"StockId: {payload.UserId}");
        Console.WriteLine($"StockId: {payload.StockId}");
        Console.WriteLine($"StockId: {payload.OrderType}");
        
        return Ok();
    }
}