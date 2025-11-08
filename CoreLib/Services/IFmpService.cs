using CoreLib.DTO;
using CoreLib.DTO.Fmp;
using CoreLib.EFModels;

namespace CoreLib.Services;

public interface IFmpService
{
    Task<CompanyInfoDto?> GetFmpDataForStock(string stockTicker);
    Task<CompanyInfoDto?> GetFmpDataForStock_Test();
    Task<int> CreateStockFmpRecords(CompanyInfoDto companyInfoDto);
    Task<int> CreateSecnameReference(string ticker, string secName);
    Task<SelectedStockDto> GetRandomStockWithNoSecurityName();
    Task<int> CreateStockFmpRecord_Test();
}