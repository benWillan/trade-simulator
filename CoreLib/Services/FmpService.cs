using CoreLib.Context;
using CoreLib.DTO.Fmp;
using System.Text.Json;
using System.Text.RegularExpressions;
using CoreLib.EFModels;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using CoreLib.DTO;

namespace CoreLib.Services;

public class FmpService: IFmpService
{
    private readonly MyDbContext _context;
    private readonly IHttpClientFactory _httpClientFactory;
    private readonly IConfiguration _config;
    private readonly string? _fmpApiKey;
    
     public FmpService(MyDbContext context, IHttpClientFactory httpClientFactory, IConfiguration config)
     {
         _context = context;
         _httpClientFactory = httpClientFactory;
         _fmpApiKey = config.GetValue<string>("FmpApiKey");
     }
    
    public async Task<CompanyInfoDto?> GetFmpDataForStock(string stockTicker)
    {
        var client = _httpClientFactory.CreateClient("FmpClient");

        using HttpResponseMessage response = await client.GetAsync($"profile?symbol={stockTicker}&apikey={_fmpApiKey}");

        if (!response.IsSuccessStatusCode)
        {
            var errorContent = await response.Content.ReadAsStringAsync();

            Console.WriteLine($"{errorContent} for ticker {stockTicker}");
            return null;
        }

        var jsonResponse = await response.Content.ReadAsStringAsync();

        var deserializedDto = JsonSerializer.Deserialize<IEnumerable<CompanyInfoDto?>>(jsonResponse, new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true
        });

        var data = deserializedDto?.FirstOrDefault() ?? null;

        return data;
    }
    
    public async Task<int> CreateStockFmpRecord_Test()
    {
        var recordToAdd = new stock_fmp_datum
        {
            symbol = "AAAP",
            price = 172.50m,
            beta = 1.25,
            last_dividend = 0.88m,
            range = "170-180",
            change = -1.15m,
            change_percentage = -0.66,
            volume = 25000000,
            average_volume = 30000000,
            company_name = "Apple Inc.",
            currency = "USD",
            cik = "0000320193",
            isin = "US0378331005",
            cusip = "037833100",
            exchange_full_name = "NASDAQ Stock Exchange",
            exchange = "NASDAQ",
            industry = "Technology",
            website = "https://www.apple.com",
            description = "Apple Inc. designs, manufactures, and markets consumer electronics and software products.",
            ceo = "Tim Cook",
            sector = "Technology",
            country = "USA",
            full_time_employees = "164000",
            phone = "1-408-996-1010",
            address = "One Apple Park Way",
            city = "Cupertino",
            state = "CA",
            zip = "95014",
            image = "https://logo.clearbit.com/apple.com",
            ipo_date = new DateTime(1980, 12, 12),
            default_image = true,
            is_etf = false,
            is_actively_trading = true,
            is_adr = false,
            is_fund = false,
        };

        var res = await _context.stock_fmp_data.AddAsync(recordToAdd);

        return await _context.SaveChangesAsync();
    }

    public async Task<CompanyInfoDto?> GetFmpDataForStock_Test()
    {
        var companyInfo = new CompanyInfoDto
        {
            Symbol = "AAAP",
            Price = 172.50m,
            Beta = 1.25,
            LastDividend = 0.88m,
            Range = "170-180",
            Change = -1.15m,
            ChangePercentage = -0.66,
            Volume = 25000000,
            AverageVolume = 30000000,
            CompanyName = "Test Company",
            Currency = "USD",
            Cik = "0000320193",
            Isin = "US0378331005",
            Cusip = "037833100",
            ExchangeFullName = "NASDAQ Stock Exchange",
            Exchange = "NASDAQ",
            Industry = "Technology",
            Website = "https://www.apple.com",
            Description = "Apple Inc. designs, manufactures, and markets consumer electronics and software products.",
            Ceo = "Tim Cook",
            Sector = "Technology",
            Country = "USA",
            FullTimeEmployees = "164000",
            Phone = "1-408-996-1010",
            Address = "One Apple Park Way",
            City = "Cupertino",
            State = "CA",
            Zip = "95014",
            Image = "https://logo.clearbit.com/apple.com",
            IpoDate = new DateTime(1980, 12, 12),
            DefaultImage = true,
            IsEtf = false,
            IsActivelyTrading = true,
            IsAdr = false,
            IsFund = false
        };

        await Task.Delay(1000);

        return companyInfo;
    }

    public async Task<int> CreateStockFmpRecords(CompanyInfoDto companyInfoDto)
    {
        var recordToAdd = new stock_fmp_datum
        {
            symbol  = companyInfoDto.Symbol,
            price = companyInfoDto.Price,
            beta = companyInfoDto.Beta,
            last_dividend = companyInfoDto.LastDividend,
            range = companyInfoDto.Range,
            change = companyInfoDto.Change,
            change_percentage = companyInfoDto.ChangePercentage,
            volume = companyInfoDto.Volume,
            average_volume = companyInfoDto.AverageVolume,
            company_name = companyInfoDto.CompanyName,
            currency = companyInfoDto.Currency,
            cik = companyInfoDto.Cik,
            isin = companyInfoDto.Isin,
            cusip = companyInfoDto.Cusip,
            exchange_full_name = companyInfoDto.ExchangeFullName,
            exchange = companyInfoDto.Exchange,
            industry = companyInfoDto.Industry,
            website = companyInfoDto.Website,
            description = companyInfoDto.Description,
            ceo = companyInfoDto.Ceo,
            sector = companyInfoDto.Sector,
            country = companyInfoDto.Country,
            full_time_employees = companyInfoDto.FullTimeEmployees,
            phone = companyInfoDto.Phone,
            address = companyInfoDto.Address,
            city = companyInfoDto.City,
            state = companyInfoDto.State,
            zip = companyInfoDto.Zip,
            image = companyInfoDto.Image,
            ipo_date = companyInfoDto.IpoDate,
            default_image = companyInfoDto.DefaultImage,
            is_etf = companyInfoDto.IsEtf,
            is_actively_trading = companyInfoDto.IsActivelyTrading,
            is_adr = companyInfoDto.IsAdr,
            is_fund = companyInfoDto.IsFund
        };

        await using var transaction = await _context.Database.BeginTransactionAsync();

        try
        {
            await _context.stock_fmp_data.AddAsync(recordToAdd);

            var stock = new Stock
            {
                Ticker = companyInfoDto.Symbol,
                SecurityName = companyInfoDto.CompanyName
            };
            
            await _context.Stocks.AddAsync(stock);

            var saveResult =  await _context.SaveChangesAsync();

            if (saveResult != 2) await transaction.RollbackAsync();
            
            await transaction.CommitAsync();
            
            return saveResult;
        }
        catch (Exception)
        {
            await transaction.RollbackAsync();
            throw;
        }
    }

    public async Task<int> CreateSecnameReference(string ticker, string companyName)
    {
        var stock = await _context.Stocks
            .FirstOrDefaultAsync(s => s.Ticker == ticker);

        if (stock != null)
        {
            stock.SecurityName = companyName;
        }

        return await _context.SaveChangesAsync();
    }

    public async Task<SelectedStockDto> GetRandomStockWithNoSecurityName()
    {
        var stocksWithoutSecurityName = await _context.StockQuotes
            .Where(sq => !_context.Stocks
                .Any(s => s.Ticker == sq.StockSymbol))
            .GroupBy(sq => sq.StockSymbol)
            .Select(g => new SelectedStockDto()
            {
                Ticker = g.Key,
                SecurityName = ""
            })
            .ToListAsync();
        
        var random = new Random();
        var randomQuote = stocksWithoutSecurityName[random.Next(stocksWithoutSecurityName.Count)];

        return randomQuote;
    }
}