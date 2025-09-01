//  internal.
import Container from 'react-bootstrap/Container';
import StockChartHeader from '../charting/StockChartHeader';
import StockChart from '../charting/StockChart';
import '../../css/global.css'
//  external.
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

type Props = {
  chartsRendered: 1 | 2 | 3 | 4;
}

export function ContainerFluid({chartsRendered}: Props) {

  return (
    <Container fluid className='stock-chart-container'>
      {chartsRendered === 1 && (
        <Row style={{ display: 'flex' }}>
          <Col style={{ flex: '0 0 83.333%'}} className='py-3 chart-container'>
            <StockChart></StockChart>
          </Col>
          <Col style={{ flex: '0 0 16.666%' }}></Col>
        </Row>
      )}
      {chartsRendered === 2 && (
        <>
        <Row style={{ display: 'flex' }}>
          <Col style={{ flex: '0 0 83.332%' }} className='py-3 chart-container'>
            <StockChart></StockChart>
          </Col>
          <Col style={{ flex: '0 0 16.666%' }}></Col>
        </Row>
        <Row style={{ display: 'flex' }}>
          <Col style={{ flex: '0 0 83.332%' }} className='py-3 chart-container'>
            <StockChart></StockChart>
          </Col>
          <Col style={{ flex: '0 0 16.666%' }}></Col>
        </Row>
        </>
      )}
      {chartsRendered === 3 && (
        <>
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
          <Col style={{ flex: '0 0 83.332%' }} className='py-3 chart-container'>
            <StockChart></StockChart>
          </Col>
          <Col style={{ flex: '0 0 16.666%' }}></Col>
        </Row>
        </>
      )}
      {chartsRendered === 4 && (
        <>
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
        </>
      )}
    </Container>
  );
}