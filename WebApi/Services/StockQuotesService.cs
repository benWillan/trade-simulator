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
                (
                    EF.Functions.ILike(s.SecurityName, $"%{securitySearch}%") ||
                    EF.Functions.ILike(s.Ticker, $"%{securitySearch}%")
                )
            )
            .Select(s => new SelectedStockDto
            {
                Ticker = s.Ticker,
                SecurityName = s.SecurityName.Split(new[] { ',' }, StringSplitOptions.None)[0] + " " +$"[{s.Ticker}]"
            })
            .Take(50)
            .ToListAsync();

        return matchedResults;
    }

    public async Task<Stock?> RetrieveStockData(string stockTicker, DateTime? startDate = null, DateTime? endDate = null)
    {
        // if (startDate is not null && endDate is not null)
        // {
        //     startDate = await _context.StockQuotes
        //         .MinAsync(sq => sq.Date);
        //     
        //     endDate = await _context.StockQuotes
        //         .MaxAsync(sq => sq.Date);
        // }

        var count = await _context.StockQuotes
            .CountAsync(sq => sq.StockSymbol == stockTicker);

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
                    .Where(sq => (!startDate.HasValue || sq.Date >= startDate) && (!endDate.HasValue || sq.Date <= endDate))
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
                    .ToList()
            })
            .FirstOrDefaultAsync(stock => stock.Ticker == stockTicker);
        
        Console.WriteLine(count);

        return stockData;
    }
    
}