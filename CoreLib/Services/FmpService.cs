using CoreLib.Context;
using CoreLib.DTO.Fmp;
using System.Text.Json;
using CoreLib.EFModels;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

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
    
    public async Task<IEnumerable<CompanyInfoDto?>> GetFmpDataForStock(string stockTicker)
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

        return deserializedDto;
    }
    
    public async Task<int> CreateStockFmpRecord_Test()
    {
        var recordToAdd = new stock_fmp_datum
        {
            symbol = "AAPL",
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

    public async Task<int> CreateStockFmpRecord(CompanyInfoDto companyInfoDto)
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

        var res = await _context.stock_fmp_data.AddAsync(recordToAdd);

        return await _context.SaveChangesAsync();
    }

    // public Task<string> GetRandomStockWithNoSecurityName()
    // {
    //     throw new NotImplementedException();
    // }
}