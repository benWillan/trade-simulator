using CoreLib.DTO.Fmp;

namespace CoreLib.Services;

public interface IFmpService
{
    Task<IEnumerable<CompanyInfoDto?>> GetFmpDataForStock(string stockTicker);
    Task CreateStockFmpRecord();
}