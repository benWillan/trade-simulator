using WebApi.DTO;
using WebApi.Context;
using WebApi.EFModels;

namespace WebApi.Services;

public class TradeOrderService : ITradeOrderService
{
    private readonly MyDbContext _context;

    public TradeOrderService(MyDbContext context)
    {
        _context = context;
    }

    public async Task<Order?> CreateTradeOrder(TradeOrderDto? tradeOrder)
    {
        if (tradeOrder is null) return null;

        var orderToAdd = new Order
        {
            user_id = tradeOrder.UserId,
            stock_id = tradeOrder.StockId,
            quantity = tradeOrder.Quantity,
            price = tradeOrder.Price,
            order_type = (int)tradeOrder.OrderType,
            side = (int)tradeOrder.Side,
        };

        await _context.Orders.AddAsync(orderToAdd);
        var res = await _context.SaveChangesAsync();

        if (res == 0) return null;

        return orderToAdd;
    }
}