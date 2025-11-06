using System.Text.Json;
using CoreLib.DTO.Fmp;

namespace StockDataHarvester;

public class Worker : BackgroundService
{
    private readonly ILogger<Worker> _logger;
    private readonly IHttpClientFactory _httpClientFactory;
    private readonly IConfiguration _config;

    public Worker(ILogger<Worker> logger, IHttpClientFactory httpClientFactory, IConfiguration config)
    {
        _httpClientFactory = httpClientFactory;
        _logger = logger;
        _config = config;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        var client = _httpClientFactory.CreateClient("FmpClient");
        var fmpApiKey = _config.GetValue<string>("FmpApiKey");
        var stockTicker = "AAPL";

        using HttpResponseMessage response = await client.GetAsync($"profile?symbol={stockTicker}&apikey={fmpApiKey}");
        
        var res = response.EnsureSuccessStatusCode();

        var jsonResponse = await response.Content.ReadAsStringAsync();

        var deserializedDto = JsonSerializer.Deserialize<IEnumerable<CompanyInfoDto>>(jsonResponse, new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true
        });
        
        while (!stoppingToken.IsCancellationRequested)
        {
            if (_logger.IsEnabled(LogLevel.Information))
            {
                _logger.LogInformation("Worker running at: {time}", DateTimeOffset.Now);
            }

            await Task.Delay(1000, stoppingToken);
        }
    }
}