using WebApi.EFModels;
using WebApi.DTO;

namespace WebApi.Services;

public interface ITradeOrderService
{
    Task<Order?> CreateTradeOrder(TradeOrderDto? tradeOrder);
}