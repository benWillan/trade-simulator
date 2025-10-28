using System;
using System.Collections.Generic;

namespace WebApi.EFModels;

public partial class user
{
    public int user_id { get; set; }

    public string username { get; set; } = null!;

    public string? first_name { get; set; }

    public string? last_name { get; set; }

    public string password { get; set; } = null!;

    public virtual ICollection<Order> Orders { get; set; } = new List<Order>();
}
