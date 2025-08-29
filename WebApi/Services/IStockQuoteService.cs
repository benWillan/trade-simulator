using WebApi.DTO;
using WebApi.EFModels;

namespace WebApi.Services;

public interface IStockQuoteService
{
    Task<IEnumerable<Stock>> GetStockQuotes(string symbol);
    Task<IEnumerable<SelectedStockDto>> RetrieveSecurityDropdownMatchesAsync(string securityOrTicker);
    Task<Stock?> RetrieveStockData(string symbol, DateTime? startDate, DateTime? endDate);
}