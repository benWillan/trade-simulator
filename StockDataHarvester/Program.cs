using CoreLib.Services;
using Microsoft.EntityFrameworkCore;

using CoreLib.Context;
using CoreLib.EFModels;
using CoreLib.DTO;

namespace StockDataHarvester;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = Host.CreateApplicationBuilder(args);

        builder.Services.AddHostedService<Worker>();
        
        var connectionString = builder.Configuration.GetConnectionString("TradeSimulatorDb_Dev") ?? throw new InvalidOperationException("Connection string" + "'DefaultConnection' not found.");

        builder.Services.AddDbContext<MyDbContext>(options =>
            options.UseNpgsql(connectionString));

        builder.Services.AddScoped<IFmpService, FmpService>();
        
        builder.Services.AddHttpClient(
            "FmpClient",
            client =>
            {
                client.BaseAddress = new Uri("https://financialmodelingprep.com/stable/");
                client.DefaultRequestHeaders.Add("Accept", "application/json");
            });
        
        var host = builder.Build();
        
        host.Run();
    }
}