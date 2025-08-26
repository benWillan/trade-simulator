import AutocompleteInput from '../general/AutocompleteInput';
import StockChartHeader from './StockChartHeader';
import StockChartGraph from './StockChartGraph';
import {useState, useEffect} from 'react'
//  types.
import {StockOption, Stock} from '../../types/charting/types'

function StockChart() {

  const [selectedStock, setSelectedStock] = useState<StockOption | null>(null);
  const [responseData, setResponseData] = useState<Stock | null>(null);

  useEffect(() => {

    if(!selectedStock) return;

    fetchStockHeaderData(selectedStock);

  }, [selectedStock]);

  const fetchStockHeaderData = async (stockOption: StockOption | null) => {

    const ticker = stockOption?.value;

    const response = await fetch(`https://localhost:7133/api/stock/metadata/ticker?stockTicker=${ticker}`);

    const data = await response.json() as Stock | null;

    setResponseData(data);

  }

  const handleStockSelect = (stockOption: StockOption | null) => {

    setSelectedStock(stockOption);

  }

  const glowValue = '#a2cdfbf0';
  const glowValue2 = '#528efca0';
  const glowValue3 = '#f2fd5fde';

  const green1 = "#7bec5fd8";
  const green2 = "#5dfb9cff";

  return (
    <>
      {/* <h1 style={{
        color: glowValue,
        textShadow: `
          0 0 1px ${glowValue},
          0 0 1px ${glowValue},
          0 0 12px ${glowValue},
          0 0 10px ${glowValue2},
          0 0 6px ${glowValue3}
        `,
      }}>AAPL</h1> */}
      <AutocompleteInput onAutoCompleteSelect={handleStockSelect}></AutocompleteInput>
      {/* DateSelect */}
      <StockChartHeader stockData={responseData}></StockChartHeader>
      <a href='#' target='_blank' style={{
        fontSize: 34,
        textDecoration: "none",
        color: green1,
        textShadow: `
          0 0 1px ${green1},
          0 0 1px ${green1},
          0 0 1px ${green1},
          0 0 2px ${green2},
          0 0 3px ${green2}
        `,
      }}>AAPL</a>
      <StockChartGraph></StockChartGraph>
    </>
  );

}

export default StockChart;