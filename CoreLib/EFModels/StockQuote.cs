using System;
using System.Collections.Generic;

namespace CoreLib.EFModels;

public partial class StockQuote
{
    public string StockSymbol { get; set; } = null!;

    public DateTime Date { get; set; }

    public decimal? OpenPrice { get; set; }

    public decimal? HighPrice { get; set; }

    public decimal? LowPrice { get; set; }

    public decimal? ClosePrice { get; set; }

    public long? Volume { get; set; }
}
