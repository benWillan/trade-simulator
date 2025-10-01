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
  stockChartId: number;
  isOffCanvasVisible: boolean;
  onCompareModalClick: () => void;
  onMainStockPass: (selectedStock: StockOption | null) => void;
  graphData: Stock | null;
  comparisonData: Stock[] | null;
  setClearStockSelect: boolean;
}

function StockChart({onMainStockPass, onCompareModalClick, isOffCanvasVisible, stockChartId, graphData, comparisonData, setClearStockSelect}: Props) {

  return (
    <>
      <Row>
        <Col>
          <AutocompleteInput onAutoCompleteSelect={onMainStockPass} clearInput={setClearStockSelect}></AutocompleteInput>
        </Col>
        <Col>
          <Button key={stockChartId} onClick={onCompareModalClick} variant="outline-secondary" size='sm'>Compare</Button>
        </Col>
      </Row>
      <Row>
        <Col style={{height: `calc(100vh - 144px)`}}>
          {graphData && <StockChartGraph isOffCanvasVisible={isOffCanvasVisible} graphData={graphData} comparisonData={comparisonData}></StockChartGraph>}
        </Col>
      </Row>
    </>
  );

}

export default StockChart;