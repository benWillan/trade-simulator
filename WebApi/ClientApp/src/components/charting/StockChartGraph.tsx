//  internal.
import { Stock } from '../../types/charting/types'
import colors from '../../types/styling/glowingText'
//  external.
import React from "react";
import ReactECharts from "echarts-for-react";

// Helper function to generate random candlestick data
function generateCandleData(days = 10) {

  const data = [];
  const dates = [];
  let open = 10; // starting price

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

type Props = {
  graphData: Stock | null;
}

function StockChartGraph(props: Props) {

  const dummyDays = 100;

  const { dates, data } = generateCandleData(dummyDays);

  const dates2 = props.graphData?.stockQuotes.map(sq => sq.date);
  const ohlcData = props.graphData?.stockQuotes.map(({openPrice, closePrice, lowPrice, highPrice}) => Object.values({openPrice, closePrice, lowPrice, highPrice}));
  const stockTicker = props.graphData?.ticker;

  const options = {
    title: {
      text: `${stockTicker}`,
      subtext: "Test",
      left: "center",
      top: 20,
      textStyle: {
        fontSize: 28,
        color: colors.teal_main,              // main text color
        textShadowColor: colors.teal_glow,              // glow color
        textShadowBlur: 5,                   // glow intensity
        textShadowOffsetX: 0,                 // optional
        textShadowOffsetY: 0
      }
    },
    graphic: [
      {
        type: "text",
        left: "10%",       // x position
        top: "10%",        // y position
        style: {
          text: "Extra stock info: P/E 28.5",
          fill: "#c6c6c6ff",
          font: "14px sans-serif"
        },
      },
      {
        type: "text",
        left: "10%",
        top: "15%",
        style: {
          text: "Sector: Technology",
          fill: "#c4c4c4ff",
          font: "12px sans-serif"
        }
      },
      {
        type: "rect",
        left: "80%",
        top: 25,
        shape: { width: 20, height: 20 },
        style: {
          fill: "#393a3aff",
          cursor: "pointer",
          stroke: "#acacacff",
          lineWidth: 1,
          shadowColor: "#000",
          shadowBlur: 4
        },
        onclick: function () {
          alert("Download clicked!");
        }
      }
    ],
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
      data: dates2,
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
        data: ohlcData,
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
    <ReactECharts option={options} style={{ height: 550, width: 1100 }} />
  );
}

export default StockChartGraph;