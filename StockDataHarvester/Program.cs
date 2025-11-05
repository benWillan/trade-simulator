using WebApi.EFModels;
using WebApi.Services;

namespace StockDataHarvester;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = Host.CreateApplicationBuilder(args);

        var httpClientName = builder.Configuration["FmpClientName"];
        
        builder.Services.AddHostedService<Worker>();

        builder.Services.AddHttpClient(
            httpClientName,
            client =>
            {
                client.BaseAddress = new Uri("https://jsonplaceholder.typicode.com");
                client.DefaultRequestHeaders.Add("Accept", "application/json");
            });
        
        var host = builder.Build();
        
        host.Run();
    }
}