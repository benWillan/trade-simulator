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
        
        Console.WriteLine($"UserId: {payload.UserId}");
        Console.WriteLine($"StockId: {payload.StockId}");
        Console.WriteLine($"OrderType: {payload.OrderType}");
        Console.WriteLine($"Price: {payload.Price}");
        Console.WriteLine($"Quantity: {payload.Quantity}");
        Console.WriteLine($"Side: {payload.Side}");
        
        return Ok();
    }
}