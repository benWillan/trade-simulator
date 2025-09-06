//  internal.
import AutocompleteInput from '../general/AutocompleteInput';
import StockChartHeader from './StockChartHeader';
import StockChartGraph from './StockChartGraph';
//  external.
import {useState, useEffect} from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
//  types.
import {StockOption, Stock} from '../../types/charting/types'
import StockChartDate from './StockChartDate';

type Props = {
  isOffCanvasVisible: boolean;
}

function StockChart({isOffCanvasVisible}: Props) {

  const [selectedStock, setSelectedStock] = useState<StockOption | null>(null);
  const [graphData, setGraphData] = useState<Stock | null>(null);

  //  to handle api call after stock is selected from autoselect.
  useEffect(() => {

    //  to clear and unmount the graph on x click.
    if(!selectedStock) {
      setGraphData(null);
      return;
    }

    fetchStockGraphData(selectedStock);

  }, [selectedStock]);

  const fetchStockGraphData = async (stockOption: StockOption | null) => {

    const ticker = stockOption?.value;

    const response = await fetch(`https://localhost:7133/api/stock/stockdata?stockTicker=${ticker}`);

    const data = await response.json() as Stock | null;

    setGraphData(data);
    
  }

  //  to set state after user selects value in AutocompleteInput.
  const handleStockSelect = (stockOption: StockOption | null) => {

    if (stockOption === null) setSelectedStock(null);

    setSelectedStock(stockOption);

  }

  return (
    <>
    <Container fluid>
      <Row>
        <Col>
          <AutocompleteInput onAutoCompleteSelect={handleStockSelect}></AutocompleteInput>
        </Col>
      </Row>
      {/* height compensates for (~230px): Navbar, echarts datazoom and (stock/ticker + date) element heights */}
      <Row style={{height: "calc(100vh - 128px)" }}>
        {graphData && <StockChartGraph isOffCanvasVisible={isOffCanvasVisible} graphData={graphData}></StockChartGraph>}
      </Row>
    </Container>
    </>
  );

}

export default StockChart;