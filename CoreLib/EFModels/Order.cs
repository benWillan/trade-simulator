using System;
using System.Collections.Generic;

namespace CoreLib.EFModels;

public partial class Order
{
    public int id { get; set; }

    public int user_id { get; set; }

    public int stock_id { get; set; }

    public int order_type { get; set; }

    public decimal quantity { get; set; }

    public decimal price { get; set; }

    public int status { get; set; }

    public decimal? stop_loss { get; set; }

    public decimal? take_profit { get; set; }

    public DateTime created_at { get; set; }

    public DateTime recorded_at { get; set; }

    public DateTime? executed_at { get; set; }

    public int side { get; set; }

    public virtual order_type order_typeNavigation { get; set; } = null!;

    public virtual side sideNavigation { get; set; } = null!;

    public virtual status statusNavigation { get; set; } = null!;

    public virtual Stock stock { get; set; } = null!;

    public virtual user user { get; set; } = null!;
}
