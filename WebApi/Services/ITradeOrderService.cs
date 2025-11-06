using CoreLib.DTO;

namespace WebApi.Services;

public interface ITradeOrderService
{
    Task<TradeOrderDto?> CreateTradeOrder(TradeOrderDto? tradeOrder);
}