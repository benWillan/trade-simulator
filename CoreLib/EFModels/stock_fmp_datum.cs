using System;
using System.Collections.Generic;

namespace CoreLib.EFModels;

public partial class stock_fmp_datum
{
    public int id { get; set; }

    public string symbol { get; set; } = null!;

    public decimal? price { get; set; }

    public double? beta { get; set; }

    public decimal? last_dividend { get; set; }

    public string? range { get; set; }

    public decimal? change { get; set; }

    public double? change_percentage { get; set; }

    public long? volume { get; set; }

    public long? average_volume { get; set; }

    public string? company_name { get; set; }

    public string? currency { get; set; }

    public string? cik { get; set; }

    public string? isin { get; set; }

    public string? cusip { get; set; }

    public string? exchange_full_name { get; set; }

    public string? exchange { get; set; }

    public string? industry { get; set; }

    public string? website { get; set; }

    public string? description { get; set; }

    public string? ceo { get; set; }

    public string? sector { get; set; }

    public string? country { get; set; }

    public string? full_time_employees { get; set; }

    public string? phone { get; set; }

    public string? address { get; set; }

    public string? city { get; set; }

    public string? state { get; set; }

    public string? zip { get; set; }

    public string? image { get; set; }

    public DateTime? ipo_date { get; set; }

    public bool? default_image { get; set; }

    public bool? is_etf { get; set; }

    public bool? is_actively_trading { get; set; }

    public bool? is_adr { get; set; }

    public bool? is_fund { get; set; }

    public DateTime? created_at { get; set; }
}
