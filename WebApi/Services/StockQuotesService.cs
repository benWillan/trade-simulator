using System.Diagnostics;
using Microsoft.AspNetCore.Http.HttpResults;
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

    public async Task<IEnumerable<SelectedStockDto>> RetrieveSecurityDropdownMatchesAsync(string securitySearch)
    {
        securitySearch = securitySearch.Trim();

        var matchedResults = await _context.Stocks
            .Include(s => s.StockQuotes)
            .Where(s => s.StockQuotes.Any(sq => sq.StockSymbol == s.Ticker) &&
                EF.Functions.ILike(s.SecurityName, $"%{securitySearch}%") ||
                EF.Functions.ILike(s.Ticker, $"%{securitySearch}%"))
            .Select(s => new SelectedStockDto
            {
                Ticker = s.Ticker,
                SecurityName = s.SecurityName
            })
            .Take(50)
            .ToListAsync();

        return matchedResults;
    }

    public async Task<Stock?> RetrieveStockData(string stockTicker)
    {
        var startDate = new DateTime(2015, 10, 16);
        var endDate = new DateTime(2016, 010, 07);
        
        var stockData = await _context.Stocks
            .AsNoTracking()
            .Include(s => s.StockQuotes)
            .Select(s => new Stock
            {
                Ticker = s.Ticker,
                SecurityName = s.SecurityName,
                MarketCategory = s.MarketCategory,
                TestIssue = s.TestIssue,
                FinancialStatus = s.FinancialStatus,
                RoundLotSize = s.RoundLotSize,
                ETF = s.ETF,
                NextShares = s.NextShares,
                Exchange = s.Exchange,
                CQSSymbol = s.CQSSymbol,
                NASDAQSymbol = s.NASDAQSymbol,
                StockQuotes = s.StockQuotes
                    .OrderBy(sq => sq.Date)
                    .Select(sq => new StockQuote
                    {
                        StockSymbol = s.Ticker,
                        Date = sq.Date,
                        ClosePrice = sq.ClosePrice,
                        OpenPrice = sq.OpenPrice,
                        HighPrice = sq.HighPrice,
                        LowPrice = sq.LowPrice,
                        Volume = sq.Volume
                    })
                    .Where(sq => sq.Date >= startDate && sq.Date <= endDate)
                    .ToList()
            })
            .FirstOrDefaultAsync(stock => stock.Ticker == stockTicker);

        return stockData;
    }

}