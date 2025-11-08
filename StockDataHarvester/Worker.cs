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
        while (!stoppingToken.IsCancellationRequested)
        {
            // if (_logger.IsEnabled(LogLevel.Information))
            // {
            //     _logger.LogInformation("Worker running at: {time}", DateTimeOffset.Now);
            // }
        
            using var scope = _serviceProvider.CreateScope();
            var _fmpService = scope.ServiceProvider.GetRequiredService<IFmpService>();
        
            var stock = await _fmpService.GetRandomStockWithNoSecurityName();
            var tickerOfRandomStock = stock.Ticker;
            
            //var fmpData = await _fmpService.GetFmpDataForStock_Test();
            var fmpData = await _fmpService.GetFmpDataForStock(tickerOfRandomStock);
            
            if (fmpData is null) return;
            
            var saveChangesResult = await _fmpService.CreateStockFmpRecords(fmpData);
            
            if (saveChangesResult == 2)
            {
                Console.WriteLine($"{tickerOfRandomStock} fmp record created at {DateTime.Now}");
                await Task.Delay(180_000, stoppingToken);
            }
            
            Console.WriteLine($"{tickerOfRandomStock} failed to save at {DateTime.Now}.");
            await Task.Delay(180_000, stoppingToken);
        }
        
        // while (!stoppingToken.IsCancellationRequested)
        // {
        //     if (_logger.IsEnabled(LogLevel.Information))
        //     {
        //         _logger.LogInformation("Worker running at: {time}", DateTimeOffset.Now);
        //     }
        //     
        //     await Task.Delay(1000, stoppingToken);
        // }
        
    }
}