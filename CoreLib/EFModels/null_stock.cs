using System;
using System.Collections.Generic;

namespace CoreLib.EFModels;

/// <summary>
/// A list of stocks tickers that return null from FMP
/// </summary>
public partial class null_stock
{
    public string ticker { get; set; } = null!;
}
