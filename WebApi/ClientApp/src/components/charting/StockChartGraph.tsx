//  internal.
import { Stock } from '../../types/charting/types';
import colors from '../../types/styling/glowingText';
import { useRef, useEffect, Children, useState } from 'react';
import { Order } from '../../types/appLevel/orderTypes';
import { OrderTypeEnum, SideEnum, TradeOrderLineColour } from '../../types/appLevel/TradeModalTypes'
//  external.
import ReactECharts from "echarts-for-react";

import type { EChartsOption, ECharts } from "echarts";

import { useMemo } from 'react';

type Props = {
  graphData: Stock | null;
  comparisonData: Stock[] | null;
  isOffCanvasVisible: boolean;
  tradeOrderData: Order[];
}

function StockChartGraph({graphData, comparisonData, isOffCanvasVisible, tradeOrderData}: Props) {

  const chartRef = useRef<ReactECharts>(null);
  const comparisonStockCount = useRef<number>(0);
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

  const options = useMemo(() => {
    return {
      title: {
        text: `${stockTicker}`,
        subtext: "",
        left: "center",
        top: "4%",
        textStyle: {
          fontSize: 28,
          color: colors.teal_main,              // main text color
          textShadowColor: colors.teal_glow,    // glow color
          textShadowBlur: 2,                    // glow intensity
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
                id: `child1-${graphData?.ticker}`,
                type: "text",
                style: {
                  text: `${graphData?.securityName} [${graphData?.ticker}]`,
                  fill: "#c6c6c6ff",
                  font: "bolder 20px Verdana"
                }
              },
              {
                id: `child2-${graphData?.ticker}`,
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
        title: {
      subtext: `{bid|Bid:} $${graphData.stockQuotes.at(-1)?.bidPrice.toFixed(3)}  -  {ask|Ask:} $${graphData.stockQuotes.at(-1)?.askPrice.toFixed(3)}`,
      subtextStyle: {
        rich: {
          bid: {
            color: '#7274ecff',
            fontWeight: 'bold',
            fontSize: 14
          },
          ask: {
            color: '#a84d43ff',
            fontWeight: 'bold',
            fontSize: 14
          }
        },
        fontSize: 14
      }
    },
      xAxis: { data: dates },
      series: [{ data: ohlcData }],
    });

  }, [graphData]);

  useEffect(() => {

    const result = determineIfComparisonDataIsBeingAddedOrRemoved();

    if (result === "Error") throw new Error("Error: neither add or remove could be determined.");
    
    if (result === "Added") {
      
      addComparisonGraphicsToChart();
      addComparisonSeriesToChart();
      
      comparisonStockCount.current = comparisonData?.length ?? 0;
      
      return;
      
    } else if (result === "Removed") {
      
      removeComparisonSeriesFromChart();
      removeComparisonGraphicsFromChart();

      addComparisonSeriesToChart();
      addComparisonGraphicsToChart();

      comparisonStockCount.current = comparisonData?.length ?? 0;
      
      return;
      
    }
    
  }, [comparisonData]);

  useEffect(() => {

    const chart = chartRef.current?.getEchartsInstance();

    if (!chart) return;
    if (tradeOrderData.length === 0) return;

    const tradeOrderObjectJustAdded = tradeOrderData.at(-1);

    if (!tradeOrderObjectJustAdded) return;

    const tradeOrderDataToAdd = [{
      $action: 'merge',
      id: `trade-order-${Math.floor(Math.random() * 1000) + 1}-${tradeOrderObjectJustAdded?.stockTicker}`,
      name: `${tradeOrderObjectJustAdded?.stockTicker}`,
      type: 'line',
      data: [], // no data points needed.
      markLine: {
        symbol: 'none',
        label: {
          show: true,
          formatter: `@ $${tradeOrderObjectJustAdded?.price} | ${SideEnum[tradeOrderObjectJustAdded.side]} | ${OrderTypeEnum[tradeOrderObjectJustAdded.orderType]}`,
          position: 'middle',
          color: '#ddddddff',
          fontSize: 14,
          fontWeight: 'bold'
        },
        lineStyle: {
          color: `${tradeOrderObjectJustAdded.side === 1 ? TradeOrderLineColour["AskColour"] : TradeOrderLineColour["BidColour"]}`,
          width: 0.75,
          type: 'solid'
        },
        data: [
          { yAxis: tradeOrderObjectJustAdded?.price }
        ]
      }
    }];

    chart.setOption({
      series: tradeOrderDataToAdd
    }, false);

  }, [tradeOrderData]);

  const addComparisonSeriesToChart = () => {

    const chart = chartRef.current?.getEchartsInstance();

    if (!chart) return;

    const seriesToAdd = comparisonData?.map((stock, index) => ({
      $action: 'merge',
      id: `series-comparison-label-${stock.ticker}`,
      name: `${stock?.ticker}`,
      type: "line",
      data: stock.stockQuotes.map(q => q.closePrice),
      itemStyle: {
        color: `${chartSeriesColours[index]}`,
      }
    }));

    chart.setOption({
      series: seriesToAdd
    }, false)

  }

  const determineIfComparisonDataIsBeingAddedOrRemoved = (): string | void => {

    if (comparisonData === null) return;
    if (comparisonData?.length === 0 && comparisonStockCount.current === 0) return;

    return comparisonData?.length > comparisonStockCount?.current
      ? "Added"
      : comparisonData?.length < comparisonStockCount?.current
      ? "Removed"
      : "Error";

  }

  const addComparisonGraphicsToChart = () => {

    if (!graphData || comparisonData === null) return;

    const chart = chartRef.current?.getEchartsInstance();

    if (!chart) return;

    const graphicsToAdd = comparisonData?.map((comparisonStock, index) => ({
      $action: 'merge',
      id: `graphic-comparison-label-${comparisonStock?.ticker}`,
      ticker: `${comparisonStock?.ticker}`,
      type: "group",
      left: "0.5%",
      top: `${(primaryStockTopValue + (index * 3.4)).toString()}%`,
      children: [
        {
          $action: 'merge',
          id: `child1-${comparisonStock?.ticker}`,
          type: "text",
          style: {
            text: `${comparisonStock?.securityName} [${comparisonStock?.ticker}]`,
            fill: `${chartSeriesColours[index]}`,
            font: "14px Verdana"
          }
        },
        {
          $action: 'merge',
          id: `child2-${comparisonStock?.ticker}`,
          type: "text",
          top: 18,
          style: {
            text: `(${comparisonStock?.minDate} - ${comparisonStock?.maxDate})`,
            fill: "#999",
            font: "10px Verdana"
          }
        }
      ]
    }));

    chart?.setOption({
      graphic: graphicsToAdd
    }, false);

  }

  const getTickerOfRemovedSecurity = (): string => {

    const chart = chartRef.current?.getEchartsInstance();
    const option = chart?.getOption() as EChartsOption;

    if (Array.isArray(option.graphic)) {

      //  to remove the graph data.
      const graphicsData = option.graphic?.at(-1);
      
      let tickerOfRemovedSecurity = "";

      if (graphicsData && 'elements' in graphicsData) {
        
        const graphicObjectsArr = graphicsData.elements?.filter(graphicsObject => graphicsObject.id?.toString().includes("graphic-comparison"));
        const graphicObjectTickers = graphicObjectsArr?.map(item => item.id?.toString().substring(item.id?.toString().lastIndexOf("-") + 1));

        const graphicDataOfSecurityRemoved = graphicObjectTickers?.filter(graphicsObject => !comparisonData?.find(cd => cd.ticker === graphicsObject));
        tickerOfRemovedSecurity = graphicDataOfSecurityRemoved?.at(-1) as string;
        
        return tickerOfRemovedSecurity;
        
      }
      
      throw Error("elements property required and was missing.");

    }

    return "Not array";

  }

  const removeGraphicChildren = (ticker: string) => {

    const graphicChildrenToRemove = [
      {
        id: `child1-${ticker}`,
        $action: 'remove'
      },
      {
        id: `child2-${ticker}`,
        $action: 'remove'
      }
    ];

    const chart = chartRef.current?.getEchartsInstance();

    chart?.setOption({
      graphic: graphicChildrenToRemove
    }, false);

  }

  const removeGraphicParent = (ticker: string) => {

    const graphicParentToRemove = {
      id: `graphic-comparison-label-${ticker}`,
      $action: 'remove'
    }

    const chart = chartRef.current?.getEchartsInstance();

    chart?.setOption({
      graphic: graphicParentToRemove
    }, false);

  }

  const removeSeriesParent = (ticker: string) => {

    const comparisonSeriesDataToRemain = comparisonData?.filter(stock => stock?.ticker !== ticker);

    const seriesParentToRemove = comparisonSeriesDataToRemain?.map(stock => ({
      id: `series-comparison-label-${stock.ticker}`
    })) || [];

    const graphDataSeriesToRemain = {
      id: `series-graphData-label-${graphData?.ticker}`
    }

    const combined = [...seriesParentToRemove, graphDataSeriesToRemain];

    const chart = chartRef.current?.getEchartsInstance();

    chart?.setOption({
      series: combined
    }, {replaceMerge: 'series'});

  }

  const removeComparisonGraphicsFromChart = () => {

    if (comparisonData === null) return;

    const ticker = getTickerOfRemovedSecurity();

    removeGraphicChildren(ticker);
    removeGraphicParent(ticker);

  }

  const removeComparisonSeriesFromChart = () => {

    if (comparisonData === null) return;

    //  uses graphics data to return ticker not series data.
    const ticker = getTickerOfRemovedSecurity();

    removeSeriesParent(ticker);

  }

  return (
    <ReactECharts ref={chartRef} option={options} style={{ height: "100%", width: "100%" }} />
  );
}

export default StockChartGraph;