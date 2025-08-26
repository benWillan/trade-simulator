import React from "react";
import ReactECharts from "echarts-for-react";

// Helper function to generate random candlestick data
function generateCandleData(days = 1000) {

  const data = [];
  const dates = [];
  let open = 100; // starting price

  for (let i = 0; i < days; i++) {

    const date = new Date();
    date.setDate(date.getDate() - (days - i - 1)); // past `days` days
    const dayStr = date.toISOString().split("T")[0];
    dates.push(dayStr);

    // Random fluctuation
    const close = open + (Math.random() - 0.5) * 10;
    const low = Math.min(open, close) - Math.random() * 5;
    const high = Math.max(open, close) + Math.random() * 5;

    data.push([open.toFixed(2), close.toFixed(2), low.toFixed(2), high.toFixed(2)]);
    open = close; // next day's open is previous close
  }

  return { dates, data };
}

function CandleStickChart() {

  const dummyDays = 999;

  const { dates, data } = generateCandleData(dummyDays);

  const option = {
    title: {
      text: `AAPL (${dummyDays}) days`,
      left: "center",
      top: 20
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross"
      }
    },
    grid: {
      left: 30,
      right: 0,
      top: 10,
      bottom: 10
    },
    xAxis: {
      type: "category",
      splitLine: {
        show: true,
        lineStyle: {
          color: "#e5e5e517",
          type: "solid"
        }
      },
      data: dates,
      boundaryGap: false,
      axisLabel: {
        rotate: 45
      }
    },
    yAxis: {
      scale: true,
      splitLine: {
        show: true,
        lineStyle: {
          color: "#e5e5e50c",
          type: "solid"
        }
      }
    },
    dataZoom: [
      {
        type: "inside",
        start: 0,
        end: dummyDays
      },
      {
        show: true,
        type: "slider",
        start: 0,
        end: dummyDays
      }
    ],
    series: [
      {
        name: "Candlestick",
        type: "candlestick",
        data: data,
        itemStyle: {
          color: "#00da3c",    // rising
          color0: "#ec0000",   // falling
          borderColor0: "#8A0000",
          borderColor: "#008F28"
        }
      }
    ]
  };

  return (
      <ReactECharts option={option} style={{ height: 350, width: 700 }} />
  );
}

export default CandleStickChart;