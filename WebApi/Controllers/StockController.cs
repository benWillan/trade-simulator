using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using WebApi.Services;

namespace WebApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class StockController : ControllerBase
{
    private readonly IStockQuoteService _stockQuoteService;
    
    public StockController(IStockQuoteService stockQuoteService)
    {
        _stockQuoteService = stockQuoteService;
    }
    
    // GET
    [HttpGet]
    public async Task<IActionResult> GetStockQuotes([FromQuery] string? securitySearch)
    {
        if (string.IsNullOrEmpty(securitySearch)) return BadRequest();

        var quotes = await _stockQuoteService.GetStockQuotes(securitySearch);
        
        return Ok(quotes);
    }

    [HttpGet("search")]
    public async Task<IActionResult> GetSecurityNames([FromQuery] string? securitySearch)
    {
        if (securitySearch is null) return BadRequest();

        var securityNameMatches = await _stockQuoteService.RetrieveSecurityDropdownMatchesAsync(securitySearch);
        
        return Ok(securityNameMatches);
    }

    [HttpGet("stockdata")]
    public async Task<IActionResult> GetStockMetaData([FromQuery] string? stockTicker)
    {
        if (stockTicker is null) return BadRequest();
        
        var stockData = await _stockQuoteService.RetrieveStockData(stockTicker);

        return Ok(stockData);
    }
    
}