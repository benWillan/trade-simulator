import './App.css';
import { NavBar } from './components/appLevel/NavBar';
import { ContentArea } from './components/appLevel/ContentArea';
import Sidebar from './components/general/Sidebar';
import OffCanvas from './components/general/OffCanvas';
import { useEffect, useState } from 'react';
import CompareModal from './components/appLevel/CompareModal';
import Toast from './components/general/Notification';
import { cwd } from 'process';

function App() {

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [offCanvasVisibility, setOffCanvasVisibility] = useState<boolean>(false);
  const [lookupModalIsVisible, toggleLookupModalVisibility] = useState<boolean>(false);
  
  const [datePickerValue, setDatePickerValue] = useState<string>('');

  const [currentHistoricalDateTime, setCurrentHistoricalDateTime] = useState<string | null>(null);
  const [formattedCurrentDate, setFormattedCurrentDate] = useState<string>("");

  //  default to dev (1).
  const [userId, setUserId] = useState<number>(1);
  
  const showOffCanvas = () => setOffCanvasVisibility(true);
  const hideOffCanvas = () => setOffCanvasVisibility(false);

  const toggleLookupModal = () => toggleLookupModalVisibility(!lookupModalIsVisible);

  const setStartDateState = (startDate: string) => {

    setDatePickerValue(startDate);

  }

  useEffect(() => {

    if (currentHistoricalDateTime === null) {

      return;

    } else {

      //const [day, month, year] = currentHistoricalDateTime?.split("/").map(Number);
      const [year, month, day] = currentHistoricalDateTime?.split("-").map(Number);
      const date = new Date(year, month - 1, day);

      const options: Intl.DateTimeFormatOptions = {
        weekday: "short",
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      };

      const formatted = date.toLocaleDateString("en-GB", options).replace(/\//g, "-");

      setFormattedCurrentDate(formatted);
    }

  },[currentHistoricalDateTime]);

  return (
    <>
      <NavBar
        startDateValue={datePickerValue}
        onStartDateSet={setStartDateState}
        isPlaying={isPlaying}
        onPlayToggle={() => setIsPlaying(prev => !prev)}
        currentDateTime={formattedCurrentDate}
        onLookupButtonClick={toggleLookupModal}
      ></NavBar>
      <ContentArea
        onWatchListShow={showOffCanvas}
        chartsRendered={1}
        isOffCanvasVisible={offCanvasVisibility}
        startDate={datePickerValue}
        isPlaying={isPlaying}
        onGraphDataSet={setCurrentHistoricalDateTime}
        isStockLookupModalVisible={lookupModalIsVisible}
        onCloseLookupButtonClick={toggleLookupModal}
        userId={userId}
      ></ContentArea>
      <OffCanvas visibility={offCanvasVisibility} onWatchListHide={hideOffCanvas} ></OffCanvas>
    </>
  );
}

export default App;
