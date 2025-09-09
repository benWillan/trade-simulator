using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using WebApi.EFModels;

namespace WebApi.Context;

public partial class MyDbContext : DbContext
{
    public MyDbContext(DbContextOptions<MyDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Stock> Stocks { get; set; }

    public virtual DbSet<StockQuote> StockQuotes { get; set; }

    public virtual DbSet<stock_price> stock_prices { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
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

            entity.HasOne(d => d.StockSymbolNavigation).WithMany(p => p.StockQuotes)
                .HasPrincipalKey(p => p.Ticker)
                .HasForeignKey(d => d.StockSymbol)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_sq_stock_ticker");
        });

        modelBuilder.Entity<stock_price>(entity =>
        {
            entity.HasNoKey();
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
