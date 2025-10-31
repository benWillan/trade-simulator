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

        // Add services to the container.
        // builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
        //     .AddMicrosoftIdentityWebApi(builder.Configuration.GetSection("AzureAdB2C"));
        
        // builder.Services.AddSignalR(options => {
        //     options.EnableDetailedErrors = true; // helpful for debugging
        // });
        
        builder.Services.AddSignalR();
        
        // var connectionString = builder.Configuration.GetConnectionString("TradeSimulatorDb") ?? throw new InvalidOperationException("Connection string" + "'DefaultConnection' not found.");
        //
        // builder.Services.AddDbContext<MyDbContext>(options =>
        //     options.UseNpgsql(connectionString));
        //
        // builder.Services.AddScoped<IStockQuoteService, StockQuoteService>();
        // builder.Services.AddScoped<ITradeOrderService, TradeOrderService>();

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

        //builder.Services.AddSignalR();
        
        // APP.
        var app = builder.Build();
        
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