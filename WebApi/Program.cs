using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Web;
using Microsoft.Identity.Abstractions;
using Microsoft.Identity.Web.Resource;
using WebApi.Context;
using WebApi.Services;
using WebApi.Hubs;

namespace WebApi;

public class Program
{
    public static void Main(string[] args)
    {
        //  BUILDER.
        var builder = WebApplication.CreateBuilder(args);
        
        // builder.Logging.ClearProviders();
        // builder.Logging.AddConsole();
        
        // Add services to the container.
        // builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
        //     .AddMicrosoftIdentityWebApi(builder.Configuration.GetSection("AzureAdB2C"));
        
        builder.Services.AddSignalR(options => {
            options.EnableDetailedErrors = true; // helpful for debugging
        });

        Console.WriteLine(builder.Environment.EnvironmentName);

        if (builder.Environment.EnvironmentName == "Development")
        {
            var connectionString = builder.Configuration.GetConnectionString("TradeSimulatorDb") ?? throw new InvalidOperationException("Connection string" + "'DefaultConnection' not found.");

            builder.Services.AddDbContext<MyDbContext>(options =>
                options.UseNpgsql(connectionString));
        }
        else if (builder.Environment.EnvironmentName == "Production")
        {
            var connectionString = builder.Configuration.GetConnectionString("DefaultConnection") ?? throw new InvalidOperationException("Connection string" + "'DefaultConnection' not found.");
            Console.WriteLine($"conn string is: {connectionString}");

            builder.Services.AddDbContext<MyDbContext>(options =>
                options.UseNpgsql(connectionString));
        }
        else
        {
            Console.WriteLine("Environment name set incorrectly");
            return;
        }
        
        builder.Services.AddScoped<IStockQuoteService, StockQuoteService>();
        builder.Services.AddScoped<ITradeOrderService, TradeOrderService>();
        
        builder.Services.AddControllers();
        
        // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
        builder.Services.AddEndpointsApiExplorer();
        //builder.Services.AddSwaggerGen();
        
        builder.Services.AddCors(options =>
        {
            options.AddPolicy("ReactDevPolicy", policy =>
            {
                policy.WithOrigins("http://localhost:3000")
                    .AllowAnyHeader()
                    .AllowAnyMethod()
                    .AllowCredentials();
            });
        });

        // APP.
        var app = builder.Build();
        
        // app.MapGet("/d", (IConfiguration config, IWebHostEnvironment env) =>
        // {
        //     var conn = config.GetConnectionString("DefaultConnection");
        //     
        //     return new
        //     {
        //         Environment = env.EnvironmentName,
        //         ConnectionStringLoaded = !string.IsNullOrEmpty(conn),
        //         ConnectionStringPreview = conn?.Substring(0, Math.Min(conn.Length, 50)),
        //         ConnectionString = conn
        //     };
        // });

        // var logger = app.Services.GetRequiredService<ILogger<Program>>();
        //
        // logger.LogInformation("Hosting environment: {env}", builder.Environment.EnvironmentName);
        //
        // // Example: log first part of connection string (mask sensitive info)
        // var conn = builder.Configuration.GetConnectionString("DefaultConnection");
        // logger.LogInformation("Connection string (first 20 chars): {conn}", conn?.Substring(0, 20) + "...");
        
        // Enable static file serving from wwwroot
        app.UseDefaultFiles();
        app.UseStaticFiles();
        
        app.UseRouting();

        app.UseCors("ReactDevPolicy");

        // Configure the HTTP request pipeline.
        // if (app.Environment.IsDevelopment())
        // {
        //     app.UseSwagger();
        //     app.UseSwaggerUI();
        // }

        app.UseHttpsRedirection();
        //app.UseAuthorization();

        app.MapControllers();
        app.MapHub<StockHub>("/stockHub");
        
        // Fallback to index.html for React Router support
        app.MapFallbackToFile("index.html");
        

        app.Run();
    }
}