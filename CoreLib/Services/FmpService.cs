using Microsoft.EntityFrameworkCore;
using CoreLib.Context;
using CoreLib.DTO.Fmp;
using CoreLib.EFModels;

namespace CoreLib.Services;

public class FmpService: IFmpService
{
    private readonly MyDbContext _context;
    
     public FmpService(MyDbContext context)
     {
         _context = context;
     }
    
    public async Task<CompanyInfoDto?> GetFmpDataForStock()
    {
        //test.
        
        return null;
    }
}