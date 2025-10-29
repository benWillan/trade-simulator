//  internal.
import AutocompleteInput from '../general/AutocompleteInput';
import StockChartHeader from './StockChartHeader';
import StockChartGraph from './StockChartGraph';
import '../../css/global.css';
import { Order } from '../../types/appLevel/orderTypes';
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
  stockChartId: number;
  isOffCanvasVisible: boolean;
  onCompareButtonClick: () => void;
  onTradeButtonClick: () => void;
  onMainStockPass: (selectedStock: StockOption | null) => void;
  graphData: Stock | null;
  comparisonData: Stock[] | null;
  setClearStockSelect: boolean;
  tradeOrderData: Order[];
}

function StockChart({
  onMainStockPass,
  onCompareButtonClick,
  onTradeButtonClick,
  isOffCanvasVisible,
  stockChartId,
  graphData,
  comparisonData,
  setClearStockSelect,
  tradeOrderData,
}: Props) {

  return (
    <>
      <Row>
        <Col>
          <AutocompleteInput onAutoCompleteSelect={onMainStockPass} clearInput={setClearStockSelect}></AutocompleteInput>
        </Col>
        <Col>
          <Button key={`compare-btn-${stockChartId}`} onClick={onCompareButtonClick} variant="outline-secondary" size='sm'>Compare</Button>
          <Button key={`trade-btn-${stockChartId}`} className='ms-2' onClick={onTradeButtonClick} variant="outline-success" size='sm'>Trade</Button>
          {/* <Button key={`test-btn-${stockChartId}`} className='ms-2' variant="outline-warning" size='sm'>Test</Button> */}
        </Col>
      </Row>
      <Row>
        <Col style={{height: `calc(100vh - 144px)`}}>
          {graphData && <StockChartGraph isOffCanvasVisible={isOffCanvasVisible} graphData={graphData} comparisonData={comparisonData} tradeOrderData={tradeOrderData}></StockChartGraph>}
        </Col>
      </Row>
    </>
  );

}

export default StockChart;