using CoreLib.Enums;

namespace CoreLib.DTO;

public class TradeOrderDto
{
    public int UserId { get; set; }
    public int StockId { get; set; }
    public OrderType OrderType { get; set; }
    public decimal? Price { get; set; }
    public decimal Quantity { get; set; }
    public decimal? StopPrice { get; set; }
    public Side Side { get; set; }
    public string? StockTicker { get; set; }
}