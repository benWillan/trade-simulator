//  internal.
import AutocompleteInput from '../general/AutocompleteInput';
import StockChartHeader from './StockChartHeader';
import StockChartGraph from './StockChartGraph';
import '../../css/global.css';
//  external.
import {useState, useEffect} from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
//  types.
import {StockOption, Stock} from '../../types/charting/types'
import StockChartDate from './StockChartDate';

type Props = {
  chartIndex: number;
  isOffCanvasVisible: boolean;
}

function StockChart({isOffCanvasVisible, chartIndex}: Props) {

  const [selectedStock, setSelectedStock] = useState<StockOption | null>(null);
  const [selectedComparison, setComparison] = useState<StockOption | null>(null);

  const [graphData, setGraphData] = useState<Stock | null>(null);
  const [comparisonGraphData, setComparisonGraphData] = useState<Stock[] | null>([]);
  const [seriesData, setSeriesData] = useState<Stock[] | null>([]);
  
  const [isModalVisible, setModalVisibility] = useState(false);

  useEffect(() => {

    if(!selectedStock) {
      setGraphData(null);
      return;
    }

    fetchStockGraphData(selectedStock);

  }, [selectedStock]);
  
  useEffect(() => {

    if(!selectedComparison) {
      setComparison(null);
      return;
    }

    fetchStockGraphComparisonData(selectedComparison);

  }, [selectedComparison]);

  const closeCompareModal = () => setModalVisibility(false);
  const showCompareModal = () => setModalVisibility(true);

  const fetchStockGraphData = async (stockOption: StockOption | null) => {

    const ticker = stockOption?.value;
    const response = await fetch(`https://localhost:7133/api/stock/stockdata?stockTicker=${ticker}`);
    const data = await response.json() as Stock;

    setGraphData(data);
    
  }

  const fetchStockGraphComparisonData = async (stockOption: StockOption | null) => {

    const comparisonTicker = stockOption?.value;
    const mainStockTicker = graphData?.ticker;

    const response = await fetch(`https://localhost:7133/api/stock/comparisondata?mainTicker=${mainStockTicker}&comparisonTicker=${comparisonTicker}`);
    const data = await response.json() as Stock;

    setComparisonGraphData(prev => {
      if (!prev) return [data];  // If it's null, start a new array
      return [...prev, data];    // Otherwise, append to existing array
    })
    
  }

  //  to set state after user selects value in AutocompleteInput.
  const handleStockSelect = (stockOption: StockOption | null) => {

    if (stockOption === null) {
      setSelectedStock(null);
      return;
    } 

    setSelectedStock(stockOption);

  }

  const handleComparisonSelect = (stockOption: StockOption | null) => {

    if (stockOption === null) {
      setComparison(null);
      return;
    }

    setComparison(stockOption);

  }

  const addComparisonDataToGraph = () => {

    setSeriesData(comparisonGraphData);

  }

  return (
    <>
      <Row>
        <Col>
          <AutocompleteInput onAutoCompleteSelect={handleStockSelect}></AutocompleteInput>
        </Col>
        <Col>
          <Button key={chartIndex} onClick={showCompareModal} variant="outline-secondary" size='sm'>Compare</Button>
        </Col>
      </Row>
      <Row>
        <Col style={{height: `calc(100vh - 144px)`}}>
          {graphData && <StockChartGraph isOffCanvasVisible={isOffCanvasVisible} graphData={graphData} seriesData={seriesData}></StockChartGraph>}
        </Col>
      </Row>

      <Modal
        show={isModalVisible}
        onHide={closeCompareModal}
        size='lg'
        backdrop={false}
        // backdrop='static' // keeps the dim overlay
        className="modal-click-through"        // class added to the .modal element
        backdropClassName="backdrop-click-through"
      >
        <Modal.Header closeButton>
          <Modal.Title>Compare</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AutocompleteInput onAutoCompleteSelect={handleComparisonSelect}></AutocompleteInput>
          {comparisonGraphData &&
            <table style={{ borderCollapse: 'separate', borderSpacing: '20px' }}>
              <thead>
                <tr>
                  <th>Ticker</th>
                  <th>Security</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {comparisonGraphData?.map((item, index) => (
                  <tr key={index}>
                    <td>{item.ticker}</td>
                    <td>{item.securityName}</td>
                    <td><Button variant='danger' size='sm'>X</Button></td>
                  </tr>))}
              </tbody>
            </table>
          }
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" size='sm' onClick={addComparisonDataToGraph}>Save</Button>
          <Button variant="secondary" size='sm' onClick={closeCompareModal}>Cancel</Button>
        </Modal.Footer>
      </Modal>
    </>
  );

}

export default StockChart;