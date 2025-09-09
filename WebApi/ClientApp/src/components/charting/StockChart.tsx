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
  const [graphData, setGraphData] = useState<Stock | null>(null);
  const [isModalVisible, setModalVisibility] = useState(false);

  //  to handle api call after stock is selected from autoselect.
  useEffect(() => {

    //  to clear and unmount the graph on x click.
    if(!selectedStock) {
      setGraphData(null);
      return;
    }

    fetchStockGraphData(selectedStock);

  }, [selectedStock]);

  const closeCompareModal = () => setModalVisibility(false);
  const showCompareModal = () => setModalVisibility(true);

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
      <Row>
        <Col>
          <AutocompleteInput onAutoCompleteSelect={handleStockSelect}></AutocompleteInput>
        </Col>
        <Col>
          <Button key={chartIndex} onClick={showCompareModal} variant="outline-secondary" size='sm'>Compare</Button>
        </Col>
      </Row>
      <Row>
        <Col style={{height: "90vh"}}>
          {graphData && <StockChartGraph isOffCanvasVisible={isOffCanvasVisible} graphData={graphData}></StockChartGraph>}
        </Col>
      </Row>

      <Modal
        show={isModalVisible}
        onHide={closeCompareModal}
        backdrop={false}
        // backdrop='static' // keeps the dim overlay
        className="modal-click-through"        // class added to the .modal element
        backdropClassName="backdrop-click-through"
      >
        <Modal.Header closeButton>
          <Modal.Title>Compare</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={closeCompareModal}>Save</Button>
          <Button variant="secondary" onClick={closeCompareModal}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );

}

export default StockChart;