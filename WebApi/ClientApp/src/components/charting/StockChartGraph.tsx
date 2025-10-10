//  internal.
import { Stock } from '../../types/charting/types';
import colors from '../../types/styling/glowingText';
import { useRef, useEffect, Children, useState } from 'react';
//  external.
import ReactECharts from "echarts-for-react";
import {useMemo} from 'react';

type Props = {
  graphData: Stock | null;
  comparisonData: Stock[] | null;
  isOffCanvasVisible: boolean;
}

function StockChartGraph({graphData, comparisonData, isOffCanvasVisible}: Props) {

  const chartRef = useRef<ReactECharts>(null);
  const [chartSeriesColours, setChartSeriesColours] = useState<string[]>([]);

  useEffect(() => {

    if (chartRef.current) {

      const chartInstance = chartRef?.current?.getEchartsInstance();
      chartInstance?.resize();

    }

  }, [isOffCanvasVisible]);

  useEffect(() => {

    if (chartRef.current) {

      const chartInstance = chartRef?.current?.getEchartsInstance();
      const option = chartInstance?.getOption();
      const seriesColors = option?.color as string[];

      setChartSeriesColours(seriesColors);

    }

  }, []);

  const dates = graphData?.stockQuotes.map(sq => sq.date.split("T")[0]);
  
  const ohlcData = graphData?.stockQuotes.map(({openPrice, closePrice, lowPrice, highPrice}) => Object.values({openPrice, closePrice, lowPrice, highPrice}));
  const stockTicker = graphData?.ticker;
  const primaryStockTopValue = 9.6;

  const options = useMemo(() => ({
    title: {
      text: `${stockTicker}`,
      //subtext: "[Main Stock]",
      left: "center",
      top: "4%",
      textStyle: {
        fontSize: 28,
        color: colors.teal_main,              // main text color
        textShadowColor: colors.teal_glow,    // glow color
        textShadowBlur: 5,                    // glow intensity
        textShadowOffsetX: 0,                 // optional
        textShadowOffsetY: 0
      }
    },
    graphic: [
      {
        type: "group",
        left: "0.5%",     // x position
        top: "4%",        // y position
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
          },
          
        ],
      },
      ...(comparisonData ?? []).map((comparisonStock, index) => {
        return ({
        $action: 'replace',
        id: `graphic-comparison-label-${comparisonStock.ticker}`,
        type: "group",
        left: "0.5%",
        top: `${(primaryStockTopValue + (index*3.4)).toString()}%`,
        children : [
          {
            type: "text",
            style: {
              text: `${comparisonStock?.securityName} [${comparisonStock?.ticker}]`,
              fill: `${chartSeriesColours[index]}`,
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
        // itemStyle: {
        //   color: "#000000",       // rising
        //   color0: "#FFFFFF",      // falling
        //   borderColor: "#D3D3D3",
        //   borderColor0: "#000000"
        // }
      },
      ...(comparisonData ?? []).map((comparisonStock, idx) => ({
        $action: "replace",
        id: `series-comparison-label-${comparisonStock.ticker}`,
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
  }), []);

  useEffect(() =>{

    const chart = chartRef.current?.getEchartsInstance();
    if (!chart || !graphData) return;

    const cd = (comparisonData ?? []).map((comparisonStock, idx) => ({
        $action: "replace",
        id: `series-comparison-label-${comparisonStock.ticker}`,
        name: comparisonStock.ticker ?? `Series ${idx + 1}`,
        type: "line",
        data: comparisonStock.stockQuotes.map(q => q.closePrice),
      }))

    chart.setOption({
      xAxis: { data: dates },
      //series: ...prev, cd,
    });

  }, [comparisonData]);

  useEffect(() => {

    const chart = chartRef.current?.getEchartsInstance();
    if (!chart || !graphData) return;

    const dates = graphData.stockQuotes.map((sq) => sq.date.split("T")[0]);
    
    const ohlcData = graphData.stockQuotes.map(
      ({ openPrice, closePrice, lowPrice, highPrice }) => [
        openPrice,
        closePrice,
        lowPrice,
        highPrice,
      ]
    );

    // Initial load
    chart.setOption({
      xAxis: { data: dates },
      series: [{ data: ohlcData }],
    });

  }, [graphData, comparisonData]);

  // useEffect(() => {
  //   const chart = chartRef.current?.getEchartsInstance();
  //   if (!chart || !graphData) return;

  //   // Get the last quote (new data point)
  //   const latestQuote = graphData.stockQuotes[graphData.stockQuotes.length - 1];
  //   if (!latestQuote) return;

  //   const newDate = latestQuote.date.split("T")[0];
  //   const newOhlc = [
  //     latestQuote.openPrice,
  //     latestQuote.closePrice,
  //     latestQuote.lowPrice,
  //     latestQuote.highPrice,
  //   ];

  //   // Append new data without full re-render
  //   chart.appendData({
  //     seriesIndex: 0,
  //     data: [newOhlc],
  //   });

  //   // Append new x-axis label (keep zoom intact)
  //   const option = chart.getOption();
  //   const xData = option as any;
  //   const xData2 = xData?.xAxis?.[0]?.data ?? [];
  //   xData2.push(newDate);
  //   chart.setOption({ xAxis: [{ data: xData2 }] }, false);

  // }, [graphData, comparisonData]);

  return (
    <ReactECharts ref={chartRef} option={options} notMerge={false} style={{ height: "100%", width: "100%" }} />
  );
}

export default StockChartGraph;