using System;
using System.Collections.Generic;

namespace CoreLib.EFModels;

public partial class side
{
    public int id { get; set; }

    public string? description { get; set; }

    public virtual ICollection<Order> Orders { get; set; } = new List<Order>();
}
