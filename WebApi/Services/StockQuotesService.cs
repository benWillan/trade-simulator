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
        /*
         * 1. Fetch records as Ticker(value) and SecurityName (label).
         * 2. (clientside) onChange should then lookup the quotes from the ticker.
         */
        
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

}