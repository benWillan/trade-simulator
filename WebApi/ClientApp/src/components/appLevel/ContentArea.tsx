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
import { StockOption, Stock, StockQuote } from '../../types/charting/types';
import { NotificationState, NotificationType } from '../../types/charting/types';

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

  const [notificationState, setNotificationState] = useState<NotificationState>({body: "", header: "", isOffCanvasVisible: false, isVisible: false});

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

  const showNotification = (header: NotificationType, body: string | Stock[] | null) => {

    if (Array.isArray(body)) {

      const state: NotificationState = {
        isVisible: true,
        isOffCanvasVisible: isOffCanvasVisible,
        body: `${comparisonGraphData?.map(compGraphData => compGraphData.securityName)}.`,
        header: `${header}`
      };
      
      setNotificationState(state);

      return;

    }

    showNotification('Comparison Stock', body);

  }
  
  const fetchStockGraphData = async (stockOption: StockOption | null) => {

    const ticker = stockOption?.value;
    const response = await fetch(`https://localhost:7133/api/stock/stockdata?stockTicker=${ticker}`);
    const data = await response.json() as Stock;

    setGraphData(data);
    
  }

  const fetchStockGraphComparisonData = async (stockOption: StockOption | null) => {

    if(selectedMainStock === null) {

      showNotification('Comparison Stock', "Select primary stock first.")

      return;

    }

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

    // if (stockOption === null) {
    //   setComparison(null);
    //   return;
    // }

    setComparison(stockOption);

  }

  function areStockArraysEqual(a: Stock[] | null, b: Stock[] | null): boolean {
    
    // both null -> equal
    if (a === null && b === null) return true;
    // one null, the other not -> not equal
    if (a === null || b === null) return false;

    // lengths differ -> not equal
    if (a.length !== b.length) return false;

    // compare each Stock
    return a.every((stock, idx) => areStocksEqual(stock, b[idx]));

  }

  function areStocksEqual(s1: Stock, s2: Stock): boolean {
    return (
      s1.id === s2.id &&
      s1.ticker === s2.ticker &&
      s1.securityName === s2.securityName &&
      s1.marketCategory === s2.marketCategory &&
      s1.testIssue === s2.testIssue &&
      s1.financialStatus === s2.financialStatus &&
      s1.roundLotSize === s2.roundLotSize &&
      s1.etf === s2.etf &&
      s1.nextShares === s2.nextShares &&
      s1.exchange === s2.exchange &&
      s1.cqsSymbol === s2.cqsSymbol &&
      s1.nasdaqSymbol === s2.nasdaqSymbol &&
      areStockQuotesEqual(s1.stockQuotes, s2.stockQuotes)
    );
  }

  function areStockQuotesEqual(a: StockQuote[], b: StockQuote[]): boolean {
    
    if (a.length !== b.length) return false;
    
    return a.every((q, idx) => {
      
      const other = b[idx];

      return (
        q.stockSymbol === other.stockSymbol &&
        q.date === other.date &&
        q.openPrice === other.openPrice &&
        q.highPrice === other.highPrice &&
        q.lowPrice === other.lowPrice &&
        q.closePrice === other.closePrice &&
        q.volume === other.volume
      );
    });

  }

  const addComparisonDataToGraph = () => {

    //setComparisonGraphData([]);
    setSeriesData(comparisonGraphData);

    if (selectedMainStock === null) {

    }

    const haveSameStocksAlreadyBeenAddedToGraph = areStockArraysEqual(comparisonGraphData, seriesData);
    
    if (haveSameStocksAlreadyBeenAddedToGraph) {

      showNotification('Comparison Stock', "Stocks already added.");
      
      return;

    }

    showNotification('Comparison Stock', comparisonGraphData);
      
    const state: NotificationState = {
      isVisible: true,
      isOffCanvasVisible: isOffCanvasVisible,
      body: `${comparisonGraphData?.map(compGraphData => compGraphData.securityName)}.`,
      header: "Comparison Stocks"
    };

    setNotificationState(state);

    hideCompareModal();

  }

  const handleStockSelect = (stockOption: StockOption | null) => {

    // setComparisonGraphData([]);
    // setSeriesData([]);
    // setComparison(null);

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

          <Notification notificationState={notificationState}/>

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