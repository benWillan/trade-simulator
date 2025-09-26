namespace WebApi.DTO;

using WebApi.EFModels;

public class StockDto
{
    public Stock? Stock { get; set; }
    public string? MinDate { get; set; }
    public string? MaxDate { get; set; }
}