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
  const comparisonStockCount = useRef<number>(0);
  const [chartSeriesColours, setChartSeriesColours] = useState<string[]>([]);

  // const onChartReady = (chart: ReactECharts) => {
  //   chartRef.current = chart;
  // };

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
  //const targetPrice = 1.5;

  const options = useMemo(() => {
    return {
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
      graphic: {
        elements: [
          {
            id: `graphic-graphData-label-${graphData?.ticker}`,
            type: "group",
            left: "0.5%",
            top: "4%",
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
          }
        // ...(comparisonData ?? []).map((comparisonStock, index) => {
        //   return ({
        //   $action: 'replace',
        //   id: `graphic-comparison-label-${comparisonStock.ticker}`,
        //   type: "group",
        //   left: "0.5%",
        //   top: `${(primaryStockTopValue + (index*3.4)).toString()}%`,
        //   children : [
        //     {
        //       type: "text",
        //       style: {
        //         text: `${comparisonStock?.securityName} [${comparisonStock?.ticker}]`,
        //         fill: `${chartSeriesColours[index]}`,
        //         font: "14px Verdana"
        //       }
        //     },
        //     {
        //       type: "text",
        //       top: 18,
        //       style: {
        //         text: `(${comparisonStock?.minDate} - ${comparisonStock?.maxDate})`,
        //         fill: "#999",
        //         font: "10px Verdana"
        //       }
        //     }
        //   ]
        // })}),
        //  Rectangle graphic.
        // {
        //   type: "rect",
        //   left: "80%",
        //   top: "5%",
        //   shape: { width: 20, height: 20 },
        //   style: {
        //     fill: "#393a3aff",
        //     cursor: "pointer",
        //     stroke: "#acacacff",
        //     lineWidth: 1,
        //     shadowColor: "#000",
        //     shadowBlur: 4,
        //   },
        //   onclick: function () {
        //     alert("Download clicked!");
        //   }
        // }
        ],
      },
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
          id: `series-graphData-label-${graphData?.ticker}`,
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
        // ...(comparisonData ?? []).map((comparisonStock, idx) => ({
        //   $action: "replace",
        //   id: `series-comparison-label-${comparisonStock.ticker}`,
        //   name: comparisonStock.ticker ?? `Series ${idx + 1}`,
        //   type: "line",
        //   data: comparisonStock.stockQuotes.map(q => q.closePrice),
        // })),
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
      ]}
  }, []);

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

    //  Initial load.
    chart.setOption({
      xAxis: { data: dates },
      series: [{ data: ohlcData }],
    });

  }, [graphData]);

  useEffect(() =>{

    const chart = chartRef.current?.getEchartsInstance();

    if (!chart || !graphData) return;
    if (comparisonData === null || comparisonData.length === 0) return;

    //  confirms action is adding.
    if (comparisonData.length == comparisonStockCount.current + 1) {

      const comparisonObjectToAdd = comparisonData?.at(-1);

      //  Graphic.
      const comparisonGraphicObjectToAdd = {
        id: `graphic-comparison-label-${comparisonObjectToAdd?.ticker}`,
        type: "group",
        left: "0.5%",
        top: `${(primaryStockTopValue + ((comparisonData.length - 1) * 3.4)).toString()}%`,
        children : [
          {
            id: `child1-${comparisonObjectToAdd?.ticker}`,
            type: "text",
            style: {
              text: `${comparisonObjectToAdd?.securityName} [${comparisonObjectToAdd?.ticker}]`,
              fill: `${chartSeriesColours[comparisonData.length - 1]}`,
              font: "14px Verdana"
            }
          },
          {
            id: `child2-${comparisonObjectToAdd?.ticker}`,
            type: "text",
            top: 18,
            style: {
              text: `(${comparisonObjectToAdd?.minDate} - ${comparisonObjectToAdd?.maxDate})`,
              fill: "#999",
              font: "10px Verdana"
            }
          }
        ]
      };

      //  Series.
      const comparisonSeriesObjectToAdd = {
        id: `series-comparison-label-${comparisonObjectToAdd?.ticker}`,
        name: comparisonObjectToAdd?.ticker ?? `Series ${comparisonObjectToAdd?.ticker}`,
        type: "line",
        data: comparisonObjectToAdd?.stockQuotes.map(q => q.closePrice),
      };

      chart.setOption({
        graphic: [comparisonGraphicObjectToAdd],
        series: [comparisonSeriesObjectToAdd]
      }, false);

    }

    comparisonStockCount.current = comparisonData?.length;

  }, [comparisonData]);

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
    <ReactECharts ref={chartRef} option={options} style={{ height: "100%", width: "100%" }} />
  );
}

export default StockChartGraph;