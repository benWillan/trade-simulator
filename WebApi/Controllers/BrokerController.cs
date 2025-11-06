using Microsoft.AspNetCore.Mvc;

// using WebApi.DTO;
using WebApi.Services;

using CoreLib.DTO;
using CoreLib.Services;

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

    // [HttpGet("getorders/{id?}")]
    // public async Task<IActionResult<IEnumerable<TradeOrderDto>>> GetOrders(string? id)
    // {
    //     
    // } 
    
    [HttpPost("execute")]
    public async Task<IActionResult> Execute([FromBody] TradeOrderDto? tradeOrder)
    {
        if (tradeOrder is null) return BadRequest();
        
        // Console.WriteLine("Payload");
        // Console.WriteLine("--------");
        // Console.WriteLine($"UserId: {payload.UserId}");
        // Console.WriteLine($"StockId: {payload.StockId}");
        // Console.WriteLine($"OrderType: {payload.OrderType}");
        // Console.WriteLine($"Price: {payload.Price}");
        // Console.WriteLine($"Quantity: {payload.Quantity}");
        // Console.WriteLine($"Side: {payload.Side}");

        var orderAdded = await _tradeOrderService.CreateTradeOrder(tradeOrder);
        
        return Ok(orderAdded);
    }
}