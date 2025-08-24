using WebApi.DTO;
using WebApi.EFModels;

namespace WebApi.Services;

public interface IStockQuoteService
{
    Task<IEnumerable<Stock>> GetStockQuotes(string symbol);
    Task<IEnumerable<SelectedStockDto>> RetrieveSecurityNameMatchesAsync(string symbol);
}