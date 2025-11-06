using CoreLib.EFModels;

namespace CoreLib.DTO;

public class StockDto
{
    public Stock? Stock { get; set; }
    public string? MinDate { get; set; }
    public string? MaxDate { get; set; }
}