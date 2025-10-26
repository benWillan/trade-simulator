using WebApi.Enums;

namespace WebApi.DTO;

public class TradeOrderDto
{
    public int UserId { get; set; }
    public int StockId { get; set; }
    public OrderType OrderType { get; set; }
    // public decimal Price { get; set; }
    // public decimal Quantity { get; set; }
    // public Status Status { get; set; }
    // public decimal StopLoss { get; set; }
    // public decimal TakeProfit { get; set; }
    // public DateTime? CreatedAt { get; set; }
}