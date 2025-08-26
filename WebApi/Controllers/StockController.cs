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
    public async Task<IActionResult> GetStockQuotes([FromQuery] string? securityName)
    {
        if (string.IsNullOrEmpty(securityName)) return BadRequest();

        var d1 = new DateTime(1970, 01, 01);
        var d2 = new DateTime(2005, 01, 02);

        var sw = new Stopwatch();
        sw.Start();
        
        var quotes = await _stockQuoteService.GetStockQuotes(securityName);
        
        sw.Stop();
        Console.WriteLine($"There were: {quotes.Count()} stock quotes from ticker: {securityName} between {d1}-{d2}");
        Console.WriteLine(sw.Elapsed);

        return Ok(quotes);
    }

    [HttpGet("security/{search}")]
    public async Task<IActionResult> GetSecurityNames([FromQuery] string? securityName)
    {
        if (securityName is null) return BadRequest();

        securityName = securityName.Trim();

        var securityNameMatches = await _stockQuoteService.RetrieveSecurityNameMatchesAsync(securityName);
        
        return Ok(securityNameMatches);
    }

    [HttpGet("metadata/{ticker}")]
    public async Task<IActionResult> GetStockMetaData([FromQuery] string? stockTicker)
    {
        if (stockTicker is null) return BadRequest();
        
        stockTicker = stockTicker.Trim();

        var stockData = await _stockQuoteService.RetrieveStockHeaderData(stockTicker);

        return Ok(stockData);
    }
    
}