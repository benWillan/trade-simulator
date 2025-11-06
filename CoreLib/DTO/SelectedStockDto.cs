namespace CoreLib.DTO;

public class SelectedStockDto
{
    public required string Ticker { get; set; } = string.Empty;
    public required string SecurityName { get; set; } = string.Empty;
}