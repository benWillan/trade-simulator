//  internal.
import Container from 'react-bootstrap/Container';
import StockChartHeader from '../charting/StockChartHeader';
import StockChart from '../charting/StockChart';
//  external.
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
//  types.
import { Stock, StockQuote } from '../../types/charting/types'

export function ContainerFluid() {

    return (
    <Container fluid>
      <Row>
        <Col className='py-3'>
          <StockChart></StockChart>
        </Col>
        <Col className='py-3'>
        </Col>
      </Row>
      <Row>
        <Col className='py-3'>
        </Col>
        <Col className='py-3'>
        </Col>
      </Row>
    </Container>
  );
}