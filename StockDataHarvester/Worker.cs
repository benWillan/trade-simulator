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
        Console.WriteLine($"Stock Harvester Started @{DateTime.Now}");
        var random = new Random();

        var lowerRange = 500;
        var upperRange = random.Next(750, 1000);
        
        while (!stoppingToken.IsCancellationRequested)
        {
            try
            {
                using var scope = _serviceProvider.CreateScope();
                var _fmpService = scope.ServiceProvider.GetRequiredService<IFmpService>();

                var stock = await _fmpService.GetRandomStockWithNoSecurityName();
                var tickerOfRandomStock = stock.Ticker;

                //var fmpData = await _fmpService.GetFmpDataForStock_Test();
                var fmpData = await _fmpService.GetFmpDataForStock(tickerOfRandomStock);

                if (fmpData is null)
                {
                    Console.WriteLine($"Fmp fetch data was null at {DateTime.Now}");
                    await Task.Delay(random.Next(lowerRange, upperRange), stoppingToken);
                    continue;
                }

                var saveChangesResult = await _fmpService.CreateStockFmpRecords(fmpData);

                var logMessage = saveChangesResult == 2
                    ? $"{tickerOfRandomStock} fmp record created at {DateTime.Now}"
                    : $"{tickerOfRandomStock} failed to save to db after fetching fmp data at {DateTime.Now}.";

                Console.WriteLine(logMessage);

                await Task.Delay(random.Next(lowerRange, upperRange), stoppingToken);
            }
            catch (JsonException jex)
            {
                // catch JSON parsing errors
                Console.WriteLine($"JSON parsing error for stock: {jex.Message}");
                await Task.Delay(random.Next(lowerRange, upperRange), stoppingToken);
            }
            catch (Exception ex)
            {
                // catch all other exceptions
                Console.WriteLine($"Unexpected error: {ex.Message}");
                await Task.Delay(random.Next(lowerRange, upperRange), stoppingToken);
            }
        }
    }
}