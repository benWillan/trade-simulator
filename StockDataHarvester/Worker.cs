using System.Text.Json;
using CoreLib.DTO.Fmp;
using CoreLib.Services;

namespace StockDataHarvester;

public class Worker : BackgroundService
{
    private readonly ILogger<Worker> _logger;
    private readonly IFmpService _fmpService;

    public Worker(ILogger<Worker> logger, IFmpService fmpService)
    {
        _logger = logger;
        _fmpService = fmpService;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        var res = await _fmpService.GetFmpDataForStock("AAPL");
        
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