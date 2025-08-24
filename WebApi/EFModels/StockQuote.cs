using System;
using System.Collections.Generic;

namespace WebApi.EFModels;

public partial class StockQuote
{
    public string StockSymbol { get; set; } = null!;

    public DateTime Date { get; set; }

    public decimal? OpenPrice { get; set; }

    public decimal? HighPrice { get; set; }

    public decimal? LowPrice { get; set; }

    public decimal? ClosePrice { get; set; }

    public long? Volume { get; set; }

    public virtual Stock StockSymbolNavigation { get; set; } = null!;
}
