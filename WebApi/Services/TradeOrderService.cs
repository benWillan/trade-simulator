using CoreLib.DTO;
//using CoreLib.Context;
using CoreLib.EFModels;
using CoreLib.Enums;

namespace WebApi.Services;

// public class TradeOrderService : ITradeOrderService
// {
//     private readonly MyDbContext _context;
//
//     public TradeOrderService(MyDbContext context)
//     {
//         _context = context;
//     }
//
//     public async Task<TradeOrderDto?> CreateTradeOrder(TradeOrderDto? tradeOrder)
//     {
//         if (tradeOrder is null) return null;
//
//         var orderToAdd = new Order
//         {
//             user_id = tradeOrder.UserId,
//             stock_id = tradeOrder.StockId,
//             quantity = tradeOrder.Quantity,
//             price = tradeOrder.Price,
//             order_type = (int)tradeOrder.OrderType,
//             side = (int)tradeOrder.Side,
//             created_at = DateTime.Now
//         };
//
//         await _context.Orders.AddAsync(orderToAdd);
//         var result = await _context.SaveChangesAsync();
//
//         if (result == 0) return null;
//
//         //  to add the ticker.
//         await _context.Entry(orderToAdd).Reference(order => order.stock).LoadAsync();
//
//         var response = new TradeOrderDto
//         {
//             Price = orderToAdd.price,
//             StockTicker = orderToAdd.stock.Ticker,
//             Side = (Side)orderToAdd.side,
//             OrderType = (OrderType)orderToAdd.order_type
//         };
//         
//         return response;
//     }
//
//     // public async Task<TradeOrderDto?> GetTradeOrders()
//     // {
//     //     
//     // }
// }