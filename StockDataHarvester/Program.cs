
namespace StockDataHarvester;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = Host.CreateApplicationBuilder(args);

        builder.Services.AddHostedService<Worker>();
        
        builder.Services.AddHttpClient(
            "FmpClientName",
            client =>
            {
                client.BaseAddress = new Uri("https://financialmodelingprep.com/stable/");
                client.DefaultRequestHeaders.Add("Accept", "application/json");
            });
        
        var host = builder.Build();
        
        host.Run();
    }
}