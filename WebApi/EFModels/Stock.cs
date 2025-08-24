using System;
using System.Collections.Generic;

namespace WebApi.EFModels;

public partial class Stock
{
    public int Id { get; set; }

    public string Ticker { get; set; } = null!;

    public string SecurityName { get; set; } = null!;

    public string? MarketCategory { get; set; }

    public string? TestIssue { get; set; }

    public string? FinancialStatus { get; set; }

    public short? RoundLotSize { get; set; }

    public bool? ETF { get; set; }

    public bool? NextShares { get; set; }

    public string? Exchange { get; set; }

    public string? CQSSymbol { get; set; }

    public string? NASDAQSymbol { get; set; }

    public virtual ICollection<StockQuote> StockQuotes { get; set; } = new List<StockQuote>();
}
