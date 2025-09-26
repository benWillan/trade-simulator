//  internal.
import { Stock } from '../../types/charting/types';
import colors from '../../types/styling/glowingText';
import { useRef, useEffect, Children } from 'react';
//  external.
import ReactECharts from "echarts-for-react";
import {useState} from 'react';

type Props = {
  graphData: Stock | null;
  comparisonData: Stock[] | null;
  isOffCanvasVisible: boolean;
}

function StockChartGraph({graphData, comparisonData, isOffCanvasVisible}: Props) {

  const chartRef = useRef<ReactECharts>(null);

  useEffect(() => {

    if (chartRef.current) {

      const chartInstance = chartRef.current.getEchartsInstance();
      chartInstance.resize();

    }

  }, [isOffCanvasVisible]);

  const dates = graphData?.stockQuotes.map(sq => sq.date.split("T")[0]);
  
  const ohlcData = graphData?.stockQuotes.map(({openPrice, closePrice, lowPrice, highPrice}) => Object.values({openPrice, closePrice, lowPrice, highPrice}));
  const stockTicker = graphData?.ticker;
  const primaryStockTopValue = 9;

  const options = {
    title: {
      text: `${stockTicker}`,
      subtext: "Test",
      left: "center",
      top: "4%",
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
        type: "group",
        left: "1%",       // x position
        top: "5%",        // y position
        children: [
          {
            type: "text",
            style: {
              text: `${graphData?.securityName} [${graphData?.ticker}]`,
              fill: "#c6c6c6ff",
              font: "bolder 20px Verdana"
            }
          },
          {
            type: "text",
            top: 24,
            style: {
              text: `(${graphData?.minDate} - ${graphData?.maxDate})`,
              fill: "#999",
              font: "11px Verdana"
            }
          }
        ],
      },
      ...(comparisonData ?? []).map((comparisonStock, index) => {
        return ({
        //$action: 'replace',
        id: `comparison-label-${comparisonStock.ticker}`,
        type: "group",
        left: "1%",
        top: `${(primaryStockTopValue + (index*3.6)).toString()}%`,
        children : [
          {
            type: "text",
            style: {
              text: `${comparisonStock?.securityName} [${comparisonStock?.ticker}]`,
              fill: "#c6c6c6ff",
              font: "14px Verdana"
            }
          },
          {
            type: "text",
            top: 18,
            style: {
              text: `(${comparisonStock?.minDate} - ${comparisonStock?.maxDate})`,
              fill: "#999",
              font: "10px Verdana"
            }
          }
        ]
      })}),
      {
        type: "rect",
        left: "80%",
        top: "5%",
        shape: { width: 20, height: 20 },
        style: {
          fill: "#393a3aff",
          cursor: "pointer",
          stroke: "#acacacff",
          lineWidth: 1,
          shadowColor: "#000",
          shadowBlur: 4,
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
      height: 'auto',
      width: 'auto',
      containLabel: true,
      left: 0,
      right: 0,
      top: 30,
      bottom: 60,
    },
    xAxis: {
      // name: "Date",
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
        rotate: 0
      }
    },
    yAxis: [
      {
        name: "Price ($)",
        position: 'right',
        offset: -5,
        scale: true,
        splitLine: {
          show: true,
          lineStyle: {
            color: "#e5e5e50c",
            type: "solid"
          }
        }
      },
    ],
    dataZoom: [
      {
        type: "inside",
        start: 0,
        end: 100
      },
      {
        show: true,
        type: "slider",
        bottom: 10,
        start: 0,
        end: 100
      }
    ],
    series: [
      {
        name: `${graphData?.ticker}`,
        type: "candlestick",
        data: ohlcData,
        itemStyle: {
          color: "#00da3c",    // rising
          color0: "#ec0000",   // falling
          borderColor0: "#8A0000",
          borderColor: "#008F28"
        }
      },
      ...(comparisonData ?? []).map((comparisonStock, idx) => ({
        id: `comparison-label-${comparisonStock.ticker}`,
        name: comparisonStock.ticker ?? `Series ${idx + 1}`,
        type: "line",
        data: comparisonStock.stockQuotes.map(q => q.closePrice),
      }))
      // {
      //   name: "Price",
      //   type: "line",
      //   data: [30, 40, 50],
      //   markLine: {
      //     symbol: "none",
      //     lineStyle: {
      //       color: "#d7caccff",
      //       width: 1,
      //       type: "dashed"
      //     },
      //     label: {
      //       formatter: `Target: ${targetPrice}`,
      //       position: "end",
      //       color: "#ad9ea0ff",
      //       fontWeight: "bold"
      //     },
      //     data: [
      //       {
      //         yAxis: targetPrice
      //       }
      //     ],
      //   }
      // }
    ]
  };

  return (
    <ReactECharts ref={chartRef} option={options} notMerge={true} style={{ height: "100%", width: "100%" }} />
  );
}

export default StockChartGraph;