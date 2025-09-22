//  internal.
import Container from 'react-bootstrap/Container';
import StockChartHeader from '../charting/StockChartHeader';
import StockChart from '../charting/StockChart';
import '../../css/global.css'
import CompareModal from './CompareModal';
import Notification from '../general/Notification';
//  external.
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import OffCanvas from '../general/OffCanvas';
import Sidebar from '../general/Sidebar';
import { useState, useEffect } from 'react';
//  types.
import { StockOption, Stock } from '../../types/charting/types';

type Props = {
  chartsRendered: 1 | 2 | 3 | 4 | 6 | 8 | 12;
  isOffCanvasVisible: boolean;
  onWatchListShow: () => void;
}

export function ContentArea({onWatchListShow, chartsRendered, isOffCanvasVisible}: Props) {

  const [selectedMainStock, setSelectedMainStock] = useState<StockOption | null>(null);
  const [graphData, setGraphData] = useState<Stock | null>(null);
  
  const [selectedComparison, setComparison] = useState<StockOption | null>(null);
  const [comparisonGraphData, setComparisonGraphData] = useState<Stock[] | null>([]);
  const [seriesData, setSeriesData] = useState<Stock[] | null>([]);
  
  const [isCompareModalVisible, setCompareModalVisibility] = useState<boolean>(false);

  const [showNotification, setNotificationShow] = useState<boolean>(false);

  const showCompareModal = () => setCompareModalVisibility(true);
  const hideCompareModal = () => setCompareModalVisibility(false);

  useEffect(() => {
  
    if(!selectedMainStock) {
      setGraphData(null);
      return;
    }

    fetchStockGraphData(selectedMainStock);

  }, [selectedMainStock]);

  useEffect(() => {

    if(!selectedComparison) {
      setComparison(null);
      return;
    }

    fetchStockGraphComparisonData(selectedComparison);

  }, [selectedComparison]);
  
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

  const handleComparisonSelect = (stockOption: StockOption | null) => {

    if (stockOption === null) {
      setComparison(null);
      return;
    }

    setComparison(stockOption);

  }

  const addComparisonDataToGraph = () => {

    setSeriesData(comparisonGraphData);
    setNotificationShow(true);

  }

  const handleStockSelect = (stockOption: StockOption | null) => {
  
    if (stockOption === null) {
      setSelectedMainStock(null);
      return;
    } 

    setSelectedMainStock(stockOption);
  
  }

  switch(chartsRendered) {

    case 1:
      return (
        <Container fluid className='px-2 py-3'>
          <Notification isVisible={showNotification} isOffCanvasVisible={isOffCanvasVisible}/>
          <div style={{ display: "flex" }}>
            <div style={{ flex: 1, paddingRight: isOffCanvasVisible ? "318px" : "0" }}>
              <Row>
                <Col>
                  <StockChart
                    key={1}
                    graphData={graphData}
                    seriesData={seriesData}
                    onMainStockPass={handleStockSelect}
                    stockChartId={1}
                    isOffCanvasVisible={isOffCanvasVisible}
                    onCompareModalClick={showCompareModal}
                    />
                </Col>
              </Row>
            </div>

            <div style={{ width: "56px" }}>
              <Sidebar onWatchListShow={onWatchListShow}></Sidebar>
            </div>
          </div>

          <CompareModal
            isVisible={isCompareModalVisible}
            comparisonGraphData={comparisonGraphData}
            onComparisonStockSelect={handleComparisonSelect}
            onComparisonModalCloseClick={hideCompareModal}
            onComparisonDataSave={addComparisonDataToGraph}
            />
        </Container>
      );

      case 2:
        return (
          <Container fluid className='px-2 py-3'>
            <div style={{ display: "flex" }}>
              
              {/* <div style={{ flex: 1, paddingRight: isOffCanvasVisible ? "318px" : "0" }}>
                <Row>
                  <Col>
                    <StockChart key={1} stockChartId={1} isOffCanvasVisible={isOffCanvasVisible} />
                  </Col>
                  <Col>
                    <StockChart key={2} stockChartId={2} isOffCanvasVisible={isOffCanvasVisible} />
                  </Col>
                </Row>
              </div> */}

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