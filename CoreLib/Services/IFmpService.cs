using CoreLib.DTO.Fmp;

namespace CoreLib.Services;

public interface IFmpService
{
    Task<CompanyInfoDto?> GetFmpDataForStock();
}