using WebApi.EFModels;

namespace WebApi.DTO;

public class StockDto
{
    public Stock? Stock { get; set; }
    public string? MinDate { get; set; }
    public string? MaxDate { get; set; }
}