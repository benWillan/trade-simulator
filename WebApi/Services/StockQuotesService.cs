using Microsoft.EntityFrameworkCore;
using WebApi.Context;
using WebApi.EFModels;
using WebApi.DTO;

namespace WebApi.Services;

public class StockQuoteService : IStockQuoteService
{
    private readonly MyDbContext _context;

    public StockQuoteService(MyDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Stock>> GetStockQuotes(string securityName)
    {
        var startDate = new DateTime(1984, 09, 07);
        var endDate = new DateTime(1984, 10, 01);

        var res = await _context.Stocks
            .Where(stock => stock.SecurityName.Contains(securityName))
            .Include(s => s.StockQuotes
            .Where(sq => sq.Date >= startDate && sq.Date <= endDate))
            .ToListAsync();

        return res;
    }
    
    public async Task<IEnumerable<SelectedStockDto>> RetrieveSecurityNameMatchesAsync(string securityName)
    {
        var lowerSecurityName = securityName.ToLower();

        var matchedSecurityResults = await _context.Stocks
            .Where(stock => stock.SecurityName.ToLower().Contains(lowerSecurityName))
            .Select(stock => new SelectedStockDto()
            {
                Ticker = stock.Ticker,
                SecurityName = stock.SecurityName.Split(new[] { ',' }, StringSplitOptions.None)[0] + " " +$"[{stock.Ticker}]"
            })
            .Take(50)
            .ToListAsync();
        
        return matchedSecurityResults;
    }

    public async Task<Stock> RetrieveStockHeaderData(string stockTicker)
    {
        var stockData = await _context.Stocks
            .FirstAsync(stock => stock.Ticker == stockTicker);

        return stockData;
    }

}