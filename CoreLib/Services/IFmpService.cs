using CoreLib.DTO.Fmp;

namespace CoreLib.Services;

public interface IFmpService
{
    Task<IEnumerable<CompanyInfoDto?>> GetFmpDataForStock(string stockTicker);
    Task<int> CreateStockFmpRecord(CompanyInfoDto companyInfoDto);
    Task<int> CreateStockFmpRecord_Test();
    //Task<string> GetRandomStockWithNoSecurityName();
}