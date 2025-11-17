using System;
using System.Collections.Generic;
using CoreLib.EFModels;
using Microsoft.EntityFrameworkCore;

namespace CoreLib.Context;

public partial class MyDbContext : DbContext
{
    public MyDbContext(DbContextOptions<MyDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Order> Orders { get; set; }

    public virtual DbSet<Stock> Stocks { get; set; }

    public virtual DbSet<StockQuote> StockQuotes { get; set; }

    public virtual DbSet<null_stock> null_stocks { get; set; }

    public virtual DbSet<order_type> order_types { get; set; }

    public virtual DbSet<side> sides { get; set; }

    public virtual DbSet<status> statuses { get; set; }

    public virtual DbSet<stock_fmp_datum> stock_fmp_data { get; set; }

    public virtual DbSet<user> users { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Order>(entity =>
        {
            entity.HasKey(e => e.id).HasName("Orders_pkey");

            entity.Property(e => e.created_at).HasColumnType("timestamp(6) without time zone");
            entity.Property(e => e.executed_at).HasColumnType("timestamp(6) without time zone");
            entity.Property(e => e.price).HasPrecision(18, 4);
            entity.Property(e => e.quantity).HasPrecision(18, 4);
            entity.Property(e => e.recorded_at)
                .HasDefaultValueSql("now()")
                .HasColumnType("timestamp(6) without time zone");
            entity.Property(e => e.sl_percent).HasPrecision(8, 2);
            entity.Property(e => e.sl_price).HasPrecision(18, 4);
            entity.Property(e => e.sl_ticks).HasPrecision(10, 2);
            entity.Property(e => e.sl_usd).HasPrecision(10, 2);
            entity.Property(e => e.status).HasDefaultValue(1);
            entity.Property(e => e.stop_loss).HasPrecision(18, 4);
            entity.Property(e => e.stop_price).HasPrecision(8, 4);
            entity.Property(e => e.take_profit).HasPrecision(18, 4);
            entity.Property(e => e.tp_percent).HasPrecision(8, 2);
            entity.Property(e => e.tp_price).HasPrecision(18, 4);
            entity.Property(e => e.tp_ticks).HasPrecision(10, 2);
            entity.Property(e => e.tp_usd).HasPrecision(10, 2);

            entity.HasOne(d => d.order_typeNavigation).WithMany(p => p.Orders)
                .HasForeignKey(d => d.order_type)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_Orders_order_types");

            entity.HasOne(d => d.sideNavigation).WithMany(p => p.Orders)
                .HasForeignKey(d => d.side)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_Orders_sides");

            entity.HasOne(d => d.statusNavigation).WithMany(p => p.Orders)
                .HasForeignKey(d => d.status)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_Orders_statuses");

            entity.HasOne(d => d.stock).WithMany(p => p.Orders)
                .HasForeignKey(d => d.stock_id)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_Orders_Stock");

            entity.HasOne(d => d.user).WithMany(p => p.Orders)
                .HasForeignKey(d => d.user_id)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_Orders_users");
        });

        modelBuilder.Entity<Stock>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("Stock_pkey");

            entity.ToTable("Stock");

            entity.HasIndex(e => e.Ticker, "uq_stock_ticker").IsUnique();

            entity.Property(e => e.CQSSymbol).HasMaxLength(10);
            entity.Property(e => e.Exchange).HasMaxLength(255);
            entity.Property(e => e.FinancialStatus).HasMaxLength(10);
            entity.Property(e => e.MarketCategory).HasMaxLength(10);
            entity.Property(e => e.NASDAQSymbol).HasMaxLength(10);
            entity.Property(e => e.SecurityName).HasMaxLength(300);
            entity.Property(e => e.TestIssue).HasMaxLength(10);
            entity.Property(e => e.Ticker).HasMaxLength(10);
        });

        modelBuilder.Entity<StockQuote>(entity =>
        {
            entity.HasKey(e => new { e.StockSymbol, e.Date }).HasName("stock_data_l_pkey");

            entity.ToTable("StockQuote");

            entity.HasIndex(e => e.StockSymbol, "fki_fk_sq_stock_ticker");

            entity.Property(e => e.Date).HasColumnType("timestamp(6) without time zone");
            entity.Property(e => e.ClosePrice).HasPrecision(12, 3);
            entity.Property(e => e.HighPrice).HasPrecision(12, 3);
            entity.Property(e => e.LowPrice).HasPrecision(12, 3);
            entity.Property(e => e.OpenPrice).HasPrecision(12, 3);
        });

        modelBuilder.Entity<null_stock>(entity =>
        {
            entity.HasKey(e => e.ticker).HasName("null_stocks_pkey");

            entity.ToTable(tb => tb.HasComment("A list of stocks tickers that return null from FMP"));

            entity.Property(e => e.ticker).HasColumnType("character varying");
        });

        modelBuilder.Entity<order_type>(entity =>
        {
            entity.HasKey(e => e.id).HasName("order_types_pkey");

            entity.Property(e => e.id).ValueGeneratedNever();
            entity.Property(e => e.name).HasMaxLength(24);
        });

        modelBuilder.Entity<side>(entity =>
        {
            entity.HasKey(e => e.id).HasName("side_pkey");

            entity.Property(e => e.id).ValueGeneratedNever();
            entity.Property(e => e.description).HasMaxLength(24);
        });

        modelBuilder.Entity<status>(entity =>
        {
            entity.HasKey(e => e.id).HasName("statuses_pkey");

            entity.Property(e => e.id).ValueGeneratedNever();
            entity.Property(e => e.name).HasColumnType("character varying");
        });

        modelBuilder.Entity<stock_fmp_datum>(entity =>
        {
            entity.HasKey(e => e.id).HasName("stock_fmp_data_pkey");

            entity.Property(e => e.change).HasPrecision(18, 3);
            entity.Property(e => e.created_at)
                .HasDefaultValueSql("now()")
                .HasColumnType("timestamp without time zone");
            entity.Property(e => e.ipo_date).HasColumnType("timestamp(0) without time zone");
            entity.Property(e => e.last_dividend).HasPrecision(18, 3);
            entity.Property(e => e.price).HasPrecision(18, 3);
        });

        modelBuilder.Entity<user>(entity =>
        {
            entity.HasKey(e => e.user_id).HasName("Users_pkey");

            entity.Property(e => e.user_id).HasDefaultValueSql("nextval('\"Users_user_id_seq\"'::regclass)");
            entity.Property(e => e.first_name).HasColumnType("character varying");
            entity.Property(e => e.last_name).HasColumnType("character varying");
            entity.Property(e => e.password).HasColumnType("character varying");
            entity.Property(e => e.username).HasColumnType("character varying");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
