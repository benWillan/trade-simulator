using System;
using System.Collections.Generic;

namespace WebApi.EFModels;

public partial class order_type
{
    public int id { get; set; }

    public string name { get; set; } = null!;

    public virtual ICollection<Order> Orders { get; set; } = new List<Order>();
}
