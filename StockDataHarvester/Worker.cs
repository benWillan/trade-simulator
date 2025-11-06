using System.Text.Json;
using CoreLib.DTO.Fmp;
using CoreLib.Services;

namespace StockDataHarvester;

public class Worker : BackgroundService
{
    private readonly ILogger<Worker> _logger;
    //private readonly IFmpService _fmpService;
    private readonly IServiceProvider _serviceProvider;

    public Worker(ILogger<Worker> logger, IServiceProvider serviceProvider)
    {
        _logger = logger;
        //_fmpService = fmpService;
        _serviceProvider = serviceProvider;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        using (var scope = _serviceProvider.CreateScope())
        {
            var _fmpService = scope.ServiceProvider.GetRequiredService<IFmpService>();

            var ticker = "MSFT";
            var data = await _fmpService.GetFmpDataForStock(ticker);
            var first = data.FirstOrDefault();

            if (first is not null)
            {
                var saveChangesResult = await _fmpService.CreateStockFmpRecord(first);

                if (saveChangesResult == 1)
                {
                    Console.WriteLine($"{ticker} fmp record created");
                    return;
                }

                Console.WriteLine($"{ticker} failed to save.");
            }

            return;
        }

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