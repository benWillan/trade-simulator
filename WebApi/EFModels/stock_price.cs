using System;
using System.Collections.Generic;

namespace WebApi.EFModels;

public partial class stock_price
{
    public DateOnly? date { get; set; }

    public decimal? open { get; set; }

    public decimal? high { get; set; }

    public decimal? low { get; set; }

    public decimal? close { get; set; }

    public long? volume { get; set; }

    public string? company { get; set; }
}
