using System.ComponentModel.DataAnnotations.Schema;

namespace CoreLib.EFModels;

public partial class StockQuote
{
    [NotMapped]
    public decimal? Volatility
    {
        get
        {
            if (HighPrice.HasValue && LowPrice.HasValue && ClosePrice.HasValue && ClosePrice.Value != 0)
                return (HighPrice - LowPrice) / ClosePrice;
            
            return null;
        }
    }

    [NotMapped]
    private static decimal? Spread
    {
        get
        {
            const decimal spread = 0.001M;
            
            return spread;
        }
    }
    
    [NotMapped]
    private decimal? MidPrice
    {
        get
        {
            if (HighPrice.HasValue && LowPrice.HasValue && ClosePrice.HasValue && ClosePrice.Value != 0)
                return (HighPrice + LowPrice) / 2;

            return null;
        }
    }

    [NotMapped]
    public decimal? BidPrice => MidPrice * (1 - Spread / 2);
    
    [NotMapped]
    public decimal? AskPrice => MidPrice * (1 + Spread / 2);
    
    [NotMapped]
    public long? AvailableVolume
    {
        get
        {
            if (Volume is not null)
            {
                //  0.1% available volume to buy approximation;
                return (long)Math.Round((decimal)Volume * 0.001m);
            }

            return null;
        }
    }
}