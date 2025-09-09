//  internal.
import Container from 'react-bootstrap/Container';
import StockChartHeader from '../charting/StockChartHeader';
import StockChart from '../charting/StockChart';
import '../../css/global.css'
//  external.
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import OffCanvas from '../general/OffCanvas';
import Sidebar from '../general/Sidebar';
import { useState } from 'react';

type Props = {
  chartsRendered: 1 | 2 | 3 | 4 | 6 | 8 | 12;
  isOffCanvasVisible: boolean;
  onWatchListShow: () => void;
}

export function ContentArea({onWatchListShow, chartsRendered, isOffCanvasVisible}: Props) {

  switch(chartsRendered) {

    case 1:
      return (
        <Container fluid className='px-2 py-3'>
          <div style={{ display: "flex" }}>
            
            <div style={{ flex: 1, paddingRight: isOffCanvasVisible ? "318px" : "0" }}>
              <Row>
                <Col>
                  <StockChart chartIndex={1} isOffCanvasVisible={isOffCanvasVisible} />
                </Col>
              </Row>
            </div>

            <div style={{ width: "56px" }}>
              <Sidebar onWatchListShow={onWatchListShow}></Sidebar>
            </div>
          </div>
        </Container>
      );

      case 2:
        return (
          <Container fluid className='px-2 py-3'>
            <div style={{ display: "flex" }}>
              
              <div style={{ flex: 1, paddingRight: isOffCanvasVisible ? "318px" : "0" }}>
                <Row>
                  <Col>
                    <StockChart chartIndex={1} isOffCanvasVisible={isOffCanvasVisible} />
                  </Col>
                  <Col>
                    <StockChart chartIndex={2} isOffCanvasVisible={isOffCanvasVisible} />
                  </Col>
                </Row>
              </div>

              <div style={{ width: "56px" }}>
                <Sidebar onWatchListShow={onWatchListShow}></Sidebar>
              </div>
            </div>
          </Container>
        );

      default:
        return null;
    }
  

    
}