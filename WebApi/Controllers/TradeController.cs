using Microsoft.AspNetCore.Mvc;

using WebApi.Services;

using CoreLib.DTO;
using CoreLib.Services;

namespace WebApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TradeController: ControllerBase
{
    private readonly ITradeOrderService _tradeOrderService;
    public TradeController(ITradeOrderService tradeOrderService)
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
        
        var orderAdded = await _tradeOrderService.CreateTradeOrder(tradeOrder);

        if (orderAdded is null) return BadRequest();
        
        return Ok(orderAdded);
    }
}