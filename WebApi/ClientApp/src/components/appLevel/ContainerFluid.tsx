//  internal.
import Container from 'react-bootstrap/Container';
import StockChartHeader from '../charting/StockChartHeader';
import StockChart from '../charting/StockChart';
import '../../css/global.css'
//  external.
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import OffCanvas from '../general/OffCanvas';
import { useState } from 'react';

type Props = {
  chartsRendered: 1 | 2 | 3 | 4 | 6 | 8 | 12;
  isOffCanvasVisible: boolean;
}

export function ContainerFluid({chartsRendered, isOffCanvasVisible}: Props) {

  const calculateChartWidth = (numberOfCharts: number): string => {

    switch(numberOfCharts) {
      
      case 2:

        return ""

      default:

        return "100vw - 360px"

    }

  }

  const calculateChartHeight = () => {

  }

  return (null
    // <Container fluid className='px-0 py-3'>
    //   {chartsRendered === 1 && (
    //     <Row style={{ display: 'flex' }}>
    //       {isOffCanvasVisible ? (
    //         <Col style={{ flex: `0 0 calc(${calculateChartWidth(chartsRendered)})`}} className='py-3 chart-container'>
    //           <StockChart isOffCanvasVisible={isOffCanvasVisible}></StockChart>
    //         </Col>
    //       ) : (
    //         <Col style={{ flex: `0 0 calc(100vw - 56px)`}} className='chart-container'>
    //           <StockChart isOffCanvasVisible={isOffCanvasVisible}></StockChart>
    //         </Col>
    //       )}
    //     </Row>
    //   )}
    //   {chartsRendered === 2 && (
    //     <>
    //     <Row style={{ display: 'flex' }}>
    //       {isOffCanvasVisible ? (
    //         <Col style={{ flex: '0 0 calc(100vw - 380px)'}} className='py-3 chart-container'>
    //           <StockChart isOffCanvasVisible={isOffCanvasVisible}></StockChart>
    //         </Col>
    //       ) : (
    //         <Col style={{ flex: '0 0 calc(100vw - 56px)'}} className='py-3 chart-container'>
    //           <StockChart isOffCanvasVisible={isOffCanvasVisible}></StockChart>
    //         </Col>
    //       )}
    //     </Row>
    //     <Row style={{ display: 'flex' }}>
    //       {isOffCanvasVisible ? (
    //         <Col style={{ flex: '0 0 calc(100vw - 380px)'}} className='py-3 chart-container'>
    //           <StockChart isOffCanvasVisible={isOffCanvasVisible}></StockChart>
    //         </Col>
    //       ) : (
    //         <Col style={{ flex: '0 0 calc(100vw - 56px)'}} className='py-3 chart-container'>
    //           <StockChart isOffCanvasVisible={isOffCanvasVisible}></StockChart>
    //         </Col>
    //       )}
    //     </Row>
    //     </>
    //   )}
    //   {chartsRendered === 3 && (
    //     <>
    //     <Row style={{ display: 'flex' }}>
    //       <Col style={{ flex: '0 0 41.666%' }} className='py-3 chart-container'>
    //         <StockChart isOffCanvasVisible={isOffCanvasVisible}></StockChart>
    //       </Col>
    //       <Col style={{ flex: '0 0 41.666%' }} className='py-3 chart-container'>
    //         <StockChart isOffCanvasVisible={isOffCanvasVisible}></StockChart>
    //       </Col>
    //       <Col style={{ flex: '0 0 16.666%' }}></Col>
    //     </Row>
    //     <Row style={{ display: 'flex' }}>
    //       <Col style={{ flex: '0 0 83.332%' }} className='py-3 chart-container'>
    //         <StockChart isOffCanvasVisible={isOffCanvasVisible}></StockChart>
    //       </Col>
    //       <Col style={{ flex: '0 0 16.666%' }}></Col>
    //     </Row>
    //     </>
    //   )}
    //   {chartsRendered === 4 && (
    //     <>
    //     <Row style={{ display: 'flex' }}>
    //       {isOffCanvasVisible ? (
    //         <>
    //           <Col style={{ flex: '0 0 calc(50vw - 190px)'}} className='py-2 chart-container'>
    //             <StockChart isOffCanvasVisible={isOffCanvasVisible}></StockChart>
    //           </Col>
    //           <Col style={{ flex: '0 0 calc(50vw - 190px)'}} className='py-2 chart-container'>
    //             <StockChart isOffCanvasVisible={isOffCanvasVisible}></StockChart>
    //           </Col>
    //         </>
    //       ) : (
    //         <>
    //           <Col style={{ flex: '0 0 calc(50vw - 56px)'}} className='py-2 chart-container'>
    //             <StockChart isOffCanvasVisible={isOffCanvasVisible}></StockChart>
    //           </Col>
    //           <Col style={{ flex: '0 0 calc(50vw - 56px)'}} className='py-2 chart-container'>
    //             <StockChart isOffCanvasVisible={isOffCanvasVisible}></StockChart>
    //           </Col>
    //         </>
    //       )}
    //     </Row>
    //     <Row style={{ display: 'flex' }}>
    //       {isOffCanvasVisible ? (
    //         <>
    //           <Col style={{ flex: '0 0 calc(50vw - 190px)'}} className='py-2 chart-container'>
    //             <StockChart isOffCanvasVisible={isOffCanvasVisible}></StockChart>
    //           </Col>
    //           <Col style={{ flex: '0 0 calc(50vw - 190px)'}} className='py-2 chart-container'>
    //             <StockChart isOffCanvasVisible={isOffCanvasVisible}></StockChart>
    //           </Col>
    //         </>
    //       ) : (
    //         <>
    //           <Col style={{ flex: '0 0 calc(50vw - 56px)'}} className='py-2 chart-container'>
    //             <StockChart isOffCanvasVisible={isOffCanvasVisible}></StockChart>
    //           </Col>
    //           <Col style={{ flex: '0 0 calc(50vw - 56px)'}} className='py-2 chart-container'>
    //             <StockChart isOffCanvasVisible={isOffCanvasVisible}></StockChart>
    //           </Col>
    //         </>
            
    //       )}
    //     </Row>
    //     </>
    //   )}
    //   {chartsRendered == 6 && (
    //     <>
    //     <Row style={{ display: 'flex' }}>
    //       <Col style={{ flex: '0 0 27.777%' }} className='py-3 chart-container'>
    //         <StockChart isOffCanvasVisible={isOffCanvasVisible}></StockChart>
    //       </Col>
    //       <Col style={{ flex: '0 0 27.777%' }} className='py-3 chart-container'>
    //         <StockChart isOffCanvasVisible={isOffCanvasVisible}></StockChart>
    //       </Col>
    //       <Col style={{ flex: '0 0 27.777%' }} className='py-3 chart-container'>
    //         <StockChart isOffCanvasVisible={isOffCanvasVisible}></StockChart>
    //       </Col>
    //       <Col style={{ flex: '0 0 16.666%' }}></Col>
    //     </Row>
    //     <Row style={{ display: 'flex' }}>
    //       <Col style={{ flex: '0 0 27.777%' }} className='py-3 chart-container'>
    //         <StockChart isOffCanvasVisible={isOffCanvasVisible}></StockChart>
    //       </Col>
    //       <Col style={{ flex: '0 0 27.777%' }} className='py-3 chart-container'>
    //         <StockChart isOffCanvasVisible={isOffCanvasVisible}></StockChart>
    //       </Col>
    //       <Col style={{ flex: '0 0 27.777%' }} className='py-3 chart-container'>
    //         <StockChart isOffCanvasVisible={isOffCanvasVisible}></StockChart>
    //       </Col>
    //       <Col style={{ flex: '0 0 16.666%' }}></Col>
    //     </Row>
    //     </>
    //   )}
    //   {chartsRendered == 12 && (
    //     <>
    //     <Row style={{ display: 'flex' }}>
    //       <Col style={{ flex: '0 0 27.777%' }} className='py-3 chart-container'>
    //         <StockChart isOffCanvasVisible={isOffCanvasVisible}></StockChart>
    //       </Col>
    //       <Col style={{ flex: '0 0 27.777%' }} className='py-3 chart-container'>
    //         <StockChart isOffCanvasVisible={isOffCanvasVisible}></StockChart>
    //       </Col>
    //       <Col style={{ flex: '0 0 27.777%' }} className='py-3 chart-container'>
    //         <StockChart isOffCanvasVisible={isOffCanvasVisible}></StockChart>
    //       </Col>
    //       <Col style={{ flex: '0 0 16.666%' }}></Col>
    //     </Row>
    //     <Row style={{ display: 'flex' }}>
    //       <Col style={{ flex: '0 0 27.777%' }} className='py-3 chart-container'>
    //         <StockChart isOffCanvasVisible={isOffCanvasVisible}></StockChart>
    //       </Col>
    //       <Col style={{ flex: '0 0 27.777%' }} className='py-3 chart-container'>
    //         <StockChart isOffCanvasVisible={isOffCanvasVisible}></StockChart>
    //       </Col>
    //       <Col style={{ flex: '0 0 27.777%' }} className='py-3 chart-container'>
    //         <StockChart isOffCanvasVisible={isOffCanvasVisible}></StockChart>
    //       </Col>
    //       <Col style={{ flex: '0 0 16.666%' }}></Col>
    //     </Row>
    //     <Row style={{ display: 'flex' }}>
    //       <Col style={{ flex: '0 0 27.777%' }} className='py-3 chart-container'>
    //         <StockChart isOffCanvasVisible={isOffCanvasVisible}></StockChart>
    //       </Col>
    //       <Col style={{ flex: '0 0 27.777%' }} className='py-3 chart-container'>
    //         <StockChart isOffCanvasVisible={isOffCanvasVisible}></StockChart>
    //       </Col>
    //       <Col style={{ flex: '0 0 27.777%' }} className='py-3 chart-container'>
    //         <StockChart isOffCanvasVisible={isOffCanvasVisible}></StockChart>
    //       </Col>
    //       <Col style={{ flex: '0 0 16.666%' }}></Col>
    //     </Row>
    //     <Row style={{ display: 'flex' }}>
    //       <Col style={{ flex: '0 0 27.777%' }} className='py-3 chart-container'>
    //         <StockChart isOffCanvasVisible={isOffCanvasVisible}></StockChart>
    //       </Col>
    //       <Col style={{ flex: '0 0 27.777%' }} className='py-3 chart-container'>
    //         <StockChart isOffCanvasVisible={isOffCanvasVisible}></StockChart>
    //       </Col>
    //       <Col style={{ flex: '0 0 27.777%' }} className='py-3 chart-container'>
    //         <StockChart isOffCanvasVisible={isOffCanvasVisible}></StockChart>
    //       </Col>
    //       <Col style={{ flex: '0 0 16.666%' }}></Col>
    //     </Row>
    //     </>
    //   )} 
    // </Container>
  );
}