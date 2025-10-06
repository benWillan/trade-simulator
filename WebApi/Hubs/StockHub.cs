using System.Collections.Concurrent;
using System.Runtime.CompilerServices;
using Microsoft.AspNetCore.SignalR;
using WebApi.Services;
using System.Threading;
using Microsoft.EntityFrameworkCore;
using WebApi.Context;
using WebApi.EFModels;

namespace WebApi.Hubs;

public class StockHub : Hub
{
    private readonly MyDbContext _context;
    //private static ConcurrentDictionary<string, CancellationTokenSource> _userStreams = new();

    public StockHub(MyDbContext dbContext)
    {
        _context = dbContext;
    }
    
    public async IAsyncEnumerable<List<string>> GetDataInChunks(
        int chunkSize,
        int delayMs,
        [EnumeratorCancellation] CancellationToken cancellationToken)
    {
        var allData = Enumerable.Range(1, 1000).Select(i => $"Item {i}").ToList();
        
        for (var i = 0; i < allData.Count; i += chunkSize)
        {
            if (cancellationToken.IsCancellationRequested)
                yield break;
            
            if (delayMs > 0)
                await Task.Delay(delayMs, cancellationToken);
            
            var chunk = allData.Skip(i).Take(chunkSize).ToList();
            
            yield return chunk;
        }
    }
    
    
}