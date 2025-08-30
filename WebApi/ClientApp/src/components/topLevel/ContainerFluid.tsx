//  internal.
import Container from 'react-bootstrap/Container';
import StockChartHeader from '../charting/StockChartHeader';
import StockChart from '../charting/StockChart';
import '../../css/global.css'
//  external.
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
//  types.
import { Stock, StockQuote } from '../../types/charting/types'

export function ContainerFluid() {

  return (
    <Container fluid className='stock-chart-container'>
      <Row style={{ display: 'flex' }}>
        <Col style={{ flex: '0 0 41.666%' }} className='py-3 chart-container'>
          <StockChart></StockChart>
        </Col>
        <Col style={{ flex: '0 0 41.666%' }} className='py-3 chart-container'>
          <StockChart></StockChart>
        </Col>
        <Col style={{ flex: '0 0 16.666%' }}></Col>
      </Row>
      <Row style={{ display: 'flex' }}>
        <Col style={{ flex: '0 0 41.666%' }} className='py-3 chart-container'>
          <StockChart></StockChart>
        </Col>
        <Col style={{ flex: '0 0 41.666%' }} className='py-3 chart-container'>
          <StockChart></StockChart>
        </Col>
        <Col style={{ flex: '0 0 16.666%' }}></Col>
      </Row>
    </Container>
  );
}