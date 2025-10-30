using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        Random rnd = new Random();

        int days = 100;
        int hoursPerDay = 8; // e.g., 9 AM to 5 PM
        List<DateTime> timestamps = new List<DateTime>();
        List<double> prices = new List<double>();

        DateTime startDate = DateTime.Today;

        double prevClose = 23.16; // starting price
        for (int d = 0; d < days; d++)
        {
            double dailyOpen = prevClose;
            double dailyClose = dailyOpen + rnd.NextDouble() * 4 - 2; // random move ±2
            double dailyHigh = Math.Max(dailyOpen, dailyClose) + rnd.NextDouble() * 2;
            double dailyLow = Math.Min(dailyOpen, dailyClose) - rnd.NextDouble() * 2;

            for (int h = 0; h < hoursPerDay; h++)
            {
                double t = (double)h / (hoursPerDay - 1); // 0..1 fraction of day
                // Simple Brownian bridge interpolation
                double price = dailyOpen + t * (dailyClose - dailyOpen);
                // add random noise but keep within high-low range
                price += (rnd.NextDouble() - 0.5) * (dailyHigh - dailyLow) * 0.1;
                price = Math.Max(dailyLow, Math.Min(dailyHigh, price));

                timestamps.Add(startDate.AddDays(d).AddHours(9 + h)); // 9AM + h
                prices.Add(Math.Round(price, 2));
            }

            prevClose = dailyClose;
        }

        // Print tab-delimited header
        Console.WriteLine("DateTime\tPrice");
        for (int i = 0; i < timestamps.Count; i++)
        {
            // Wrap date+time in quotes so Excel keeps it in one column
            Console.WriteLine($"\"{timestamps[i]:yyyy-MM-dd HH:mm}\"\t{prices[i]:F2}");
        }
    }
}