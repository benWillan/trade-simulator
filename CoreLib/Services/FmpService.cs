using CoreLib.Context;
using CoreLib.DTO.Fmp;
using System.Text.Json;

using Microsoft.Extensions.Configuration;

namespace CoreLib.Services;

public class FmpService: IFmpService
{
    private readonly MyDbContext _context;
    private readonly IHttpClientFactory _httpClientFactory;
    private readonly IConfiguration _config;
    
     public FmpService(MyDbContext context, IHttpClientFactory httpClientFactory, IConfiguration config)
     {
         _context = context;
         _httpClientFactory = httpClientFactory;
         _config = config;
     }
    
    public async Task<IEnumerable<CompanyInfoDto?>> GetFmpDataForStock(string stockTicker)
    {
        var client = _httpClientFactory.CreateClient("FmpClient");
        var fmpApiKey = _config.GetValue<string>("FmpApiKey");

        using HttpResponseMessage response = await client.GetAsync($"profile?symbol={stockTicker}&apikey={fmpApiKey}");

        response.EnsureSuccessStatusCode();

        var jsonResponse = await response.Content.ReadAsStringAsync();

        var deserializedDto = JsonSerializer.Deserialize<IEnumerable<CompanyInfoDto>>(jsonResponse, new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true
        });
        
        return deserializedDto;
    }

    public Task CreateStockFmpRecord()
    {
        throw new NotImplementedException();
    }
}