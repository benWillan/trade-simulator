using CoreLib.EFModels;
using CoreLib.DTO;

namespace WebApi.Services;

public interface IStockQuoteService
{
    Task<IEnumerable<Stock>> GetStockQuotes(string symbol);
    Task<IEnumerable<SelectedStockDto>> RetrieveSecurityDropdownMatchesAsync(string securityOrTicker);
    Task<Stock?> RetrieveStockData(string symbol, DateTime? startDate);
    Task<Stock?> RetrieveComparisonStockData(string mainSymbol, string comparisonSymbol);
}