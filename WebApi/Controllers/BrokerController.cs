using Microsoft.AspNetCore.Mvc;
using WebApi.DTO;
using WebApi.Services;

namespace WebApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BrokerController: ControllerBase
{
    private readonly ITradeOrderService _tradeOrderService;
    public BrokerController(ITradeOrderService tradeOrderService)
    {
        _tradeOrderService = tradeOrderService;
    }
    
    [HttpPost("execute")]
    public async Task<IActionResult> Execute([FromBody] TradeOrderDto? payload)
    {
        if (payload is null) return BadRequest();
        
        // Console.WriteLine("Payload");
        // Console.WriteLine("--------");
        // Console.WriteLine($"UserId: {payload.UserId}");
        // Console.WriteLine($"StockId: {payload.StockId}");
        // Console.WriteLine($"OrderType: {payload.OrderType}");
        // Console.WriteLine($"Price: {payload.Price}");
        // Console.WriteLine($"Quantity: {payload.Quantity}");
        // Console.WriteLine($"Side: {payload.Side}");

        var orderAdded = await _tradeOrderService.CreateTradeOrder(payload);
        
        return Ok(orderAdded);
    }
}