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
    public async Task<IActionResult> GetStockMetaData([FromQuery] string? stockTicker, [FromQuery] DateTime? startDate)
    {
        if (stockTicker is null) return BadRequest();

        var stockData = await _stockQuoteService.RetrieveStockData(stockTicker, startDate);

        return Ok(new
        {
            stockData?.Id,
            stockData?.Ticker,
            stockData?.SecurityName,
            stockData?.MarketCategory,
            stockData?.TestIssue,
            stockData?.FinancialStatus,
            stockData?.RoundLotSize,
            stockData?.ETF,
            stockData?.NextShares,
            stockData?.Exchange,
            stockData?.CQSSymbol,
            stockData?.NASDAQSymbol,
            stockData?.StockQuotes,
            MinDate = stockData?.StockQuotes.Min(sq => sq.Date).ToShortDateString(),
            MaxDate = stockData?.StockQuotes.Max(sq => sq.Date).ToShortDateString()
        });
    }
    
    [HttpGet("comparisondata")]
    public async Task<IActionResult> GetComparisonStockMetaData([FromQuery] string mainTicker, string comparisonTicker)
    {
        var comparisonData = await _stockQuoteService.RetrieveComparisonStockData(mainTicker, comparisonTicker);

        var minDate = comparisonData?.StockQuotes.Where(sq => sq.ClosePrice != null)
            .Min(sq => sq.Date).ToShortDateString();
        
        var maxDate = comparisonData?.StockQuotes.Where(sq => sq.ClosePrice != null)
            .Max(sq => sq.Date).ToShortDateString();

        return Ok(new
        {
            comparisonData?.Id,
            comparisonData?.Ticker,
            comparisonData?.SecurityName,
            comparisonData?.MarketCategory,
            comparisonData?.TestIssue,
            comparisonData?.FinancialStatus,
            comparisonData?.RoundLotSize,
            comparisonData?.ETF,
            comparisonData?.NextShares,
            comparisonData?.Exchange,
            comparisonData?.CQSSymbol,
            comparisonData?.NASDAQSymbol,
            comparisonData?.StockQuotes,
            MinDate = minDate,
            MaxDate = maxDate
        });
    }
    
}