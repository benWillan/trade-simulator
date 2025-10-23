//  internal.
import Container from 'react-bootstrap/Container';
import StockChartHeader from '../charting/StockChartHeader';
import StockChart from '../charting/StockChart';
import '../../css/global.css'
import CompareModal from './CompareModal';
import Notification from '../general/Notification';

import * as signalR from "@microsoft/signalr";
//import { stockSignalRService } from '../../service/signalRService';

//  external.
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import OffCanvas from '../general/OffCanvas';
import Sidebar from '../general/Sidebar';
import { useState, useEffect, useRef } from 'react';
//  types.
import { StockOption, Stock, StockQuote } from '../../types/charting/types';
import { NotificationState, NotificationType, NotificationStyle } from '../../types/charting/types';
import StockLookupModal from './StockLookupModal';
import TradeModal from './TradeModal';

type Props = {
  chartsRendered: 1 | 2 | 3 | 4 | 6 | 8 | 12;
  isOffCanvasVisible: boolean;
  onWatchListShow: () => void;
  startDate: string | "";
  isPlaying: boolean;
  onGraphDataSet: (date: string | null) => void;
  isStockLookupModalVisible: boolean;
  onCloseLookupButtonClick: () => void;
}

export function ContentArea({
  onWatchListShow,
  chartsRendered,
  isOffCanvasVisible,
  startDate,
  isPlaying,
  onGraphDataSet,
  isStockLookupModalVisible,
  onCloseLookupButtonClick}: Props) {

  const [selectedMainStock, setSelectedMainStock] = useState<StockOption | null>(null);
  const [graphData, setGraphData] = useState<Stock | null>(null);

  const [clearStockSelect, setClearStockSelect] = useState<boolean>(false);
  const [clearComparisonSelect, setComparisonSelectClear] = useState<boolean>(false);
  const [clearLookupSelect, setClearLookupSelect] = useState<boolean>(false);
  
  const [selectedComparison, setComparison] = useState<StockOption | null>(null);
  const [comparisonGraphData, setComparisonGraphData] = useState<Stock[] | null>([]);
  const [stockLookupData, setStockLookupData] = useState<Stock[] | null>([]);
  
  const [isCompareModalVisible, setCompareModalVisibility] = useState<boolean>(false);
  const [isTradeModalVisible, setTradeModalVisibility] = useState<boolean>(false);

  const [notificationState, setNotificationState] = useState<NotificationState>({body: "", header: "", isOffCanvasVisible: false, isVisible: false, style: ""});

  const [currentHistoricalDate, setCurrentHistoricalDate] = useState<string>("");

  //  SignalR.
  const [isStreaming, setIsStreaming] = useState(false);
  const connectionRef = useRef<signalR.HubConnection | null>(null);
  const streamSubscriptionRef = useRef<signalR.ISubscription<string[]> | null>(null);

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

  useEffect(() => {

    //const date = graphData?.maxDate ?? null;
    const date = graphData?.stockQuotes.at(-1)?.date.split("T")[0];

    if (!date) return;

    onGraphDataSet(date);

  }, [graphData]);

  useEffect(() => {

    setCurrentHistoricalDate(startDate);

  }, [startDate]);

  //  SignalR.
  useEffect(() => {
    
    const connection = new signalR.HubConnectionBuilder()
      .withUrl("http://localhost:5027/stockHub",
        {
          transport: signalR.HttpTransportType.WebSockets,
          withCredentials: true
        })
      .withAutomaticReconnect()
      .configureLogging(signalR.LogLevel.Information)
      .build();

    connectionRef.current = connection;

    connection
      .start()
      .then(() => console.log("Connected to SignalR hub"))
      .catch((err) => console.error("Connection failed:", err));

    return () => {
      connection.stop();
    };

  }, []);

  const startStream = (chunkSize: number, delayMs: number) => {

    if (!connectionRef.current) return;

    setIsStreaming(true);

    const stockStream = connectionRef.current.stream<StockQuote[]>(
      "GetStockChunk",
      graphData?.ticker,
      chunkSize,
      delayMs,
      currentHistoricalDate,
    );

    const stockSubscription = stockStream.subscribe({
      next: (chunk) => {
        
        setGraphData(prev => prev ? {...prev, stockQuotes: [...prev.stockQuotes, ...chunk]} : prev);

        setCurrentHistoricalDate(chunk[0].date)
        //console.log(`Chunk recived, close price ${chunk}`);
      },
      complete: () => {

        console.log("Stream completed");
        setIsStreaming(false);

      },
      error: (err) => {

        console.error("Stream error:", err);
        setIsStreaming(false);

      }
    });

    streamSubscriptionRef.current = stockSubscription;

  };

  const stopStream = () => {

    if (streamSubscriptionRef.current) {
      streamSubscriptionRef.current.dispose();
      streamSubscriptionRef.current = null;
    } else {
      return;
    }

    setIsStreaming(false);
    console.log("Stream cancelled by client");
  };

  useEffect(() => {

    if (isPlaying === true) {
      startStream(1, 1000);
    } else {
      stopStream();
    }

  }, [isPlaying]);
  //  SignalR end.

  const showNotification = (header: NotificationType, body: string, style?: NotificationStyle) => {

    const state: NotificationState = {
      isVisible: true,
      isOffCanvasVisible: isOffCanvasVisible,
      body: `${body}`,
      header: `${header}`,
      style: style ?? "dark"
    };

    setNotificationState(state);

  }

  const showCompareModal = () => {
    
    if (selectedMainStock === null) {

      showNotification("Warning", "A security must be assigned first.");
      return;

    }
    
    setCompareModalVisibility(true);

  }
  
  const hideCompareModal = () => setCompareModalVisibility(false);
  const showTradeModal = () => setTradeModalVisibility(true);
  const hideTradeModal = () => setTradeModalVisibility(false);
  
  const fetchStockGraphData = async (stockOption: StockOption | null) => {

    if(startDate === "") {
      
      //  for testing.
      //startDate = "2000-01-01";
      
      showNotification('Warning', "Set start date.");
      setSelectedMainStock(null);
      setClearStockSelect(true);
      return;

    } 

    const ticker = stockOption?.value;
    const response = await fetch(`https://localhost:7133/api/stock/stockdata?stockTicker=${ticker}&startDate=${startDate}`);
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

  const fetchLookupData = async (stockOption: StockOption | null) => {

    const ticker = stockOption?.value;
    const response = await fetch(`https://localhost:7133/api/stock/stockdata?stockTicker=${ticker}`)
    const data = await response.json() as Stock;
    
    setStockLookupData(prev => prev ? [...prev, data] : [data]);

  }

  const handleComparisonSelect = (stockOption: StockOption | null) => {

    if(selectedMainStock === null) {

      showNotification("Warning", "Assign a primary stock.");
      return;

    }

    if (comparisonGraphData !== null) {

      const doesComparisonAlreadyExist = comparisonGraphData.some(stock => stock.ticker == stockOption?.value);

      if (doesComparisonAlreadyExist) {

        showNotification("Error", "Stock already added.", 'danger');
        setComparisonSelectClear(true);
        return;

      }

      setComparison(stockOption);

      const comparisonStockAddedSecName = stockOption?.label;
  
      if (typeof comparisonStockAddedSecName === "string") {
  
        showNotification('Added', comparisonStockAddedSecName, 'success');
        setComparisonSelectClear(true);

        //  to reset the clear of AutocompleteInput.
        setTimeout(() => {
          setComparisonSelectClear(false);
        }, 2000);

        return;
        
      }

    }

    return;

  }

  const handleStockSelect = (stockOption: StockOption | null) => {

    if (stockOption === null) {
      setSelectedMainStock(null);
      return;
    }

    setComparisonGraphData([]);

    setSelectedMainStock(stockOption);
  
  }

  const removeComparisonStock = (ticker: string) => {
    
    const stockRemovedSecName = comparisonGraphData?.find(stock => stock.ticker === ticker)?.securityName;
    
    setComparisonGraphData(prev => prev ? prev.filter(stock => stock.ticker !== ticker) : null);

    if (typeof stockRemovedSecName === "string") {

      showNotification('Removed', stockRemovedSecName, "danger");
      return;

    }

    showNotification('Error', "An unexpected error occured.");
    
  }

  const handleLookupSelect = (stockOption: StockOption | null) => {

    if (stockOption !== null) {
      
      const hasStockAlreadyBeenAdded = stockLookupData?.some(stock => stock.ticker == stockOption?.value);

      if (hasStockAlreadyBeenAdded) {
        setClearLookupSelect(true);
        showNotification('Error', "Stock already added.", "danger");
        return;
      }
      
      fetchLookupData(stockOption);
      showNotification('Added', stockOption.label, 'success');
      
    }

    return;

  }

  const removeLookupStock = (ticker: string) => {
    
    const stockRemovedSecName = stockLookupData?.find(stock => stock.ticker === ticker)?.securityName;
    
    setStockLookupData(prev => prev ? prev.filter(stock => stock.ticker !== ticker) : null);

    if (typeof stockRemovedSecName === "string") {

      showNotification('Removed', stockRemovedSecName, "danger");
      return;

    }

    showNotification('Error', "An unexpected error occured.");
    
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
                    key={chartsRendered}
                    graphData={graphData}
                    comparisonData={comparisonGraphData}
                    onMainStockPass={handleStockSelect}
                    stockChartId={chartsRendered}
                    isOffCanvasVisible={isOffCanvasVisible}
                    onCompareButtonClick={showCompareModal}
                    onTradeButtonClick={showTradeModal}
                    setClearStockSelect={clearStockSelect}
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
            onComparisonStockRemove={removeComparisonStock}
            clearComparisonSelect={clearComparisonSelect}
          />

          <StockLookupModal
            isVisible={isStockLookupModalVisible}
            stockLookupData={stockLookupData}
            onStockSelect={handleLookupSelect}
            onStockLookupModalCloseClick={onCloseLookupButtonClick}
            onStockRemove={removeLookupStock}
            clearLookupSelect={clearLookupSelect}
          />

          <TradeModal
            isVisible={isTradeModalVisible}
            onTradeModalHide={hideTradeModal}
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