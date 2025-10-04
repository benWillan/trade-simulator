import './App.css';
import { NavBar } from './components/appLevel/NavBar';
import { ContentArea } from './components/appLevel/ContentArea';
import Sidebar from './components/general/Sidebar';
import OffCanvas from './components/general/OffCanvas';
import { useEffect, useState } from 'react';
import CompareModal from './components/appLevel/CompareModal';
import Toast from './components/general/Notification';

function App() {

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [offCanvasVisibility, setOffCanvasVisibility] = useState<boolean>(false);
  
  const [datePickerValue, setDatePickerValue] = useState<string>('');
  
  const showOffCanvas = () => setOffCanvasVisibility(true);
  const hideOffCanvas = () => setOffCanvasVisibility(false);

  const setStartDateState = (startDate: string) => {

    setDatePickerValue(startDate);

  }

  useEffect(() => {

    //console.log(datePickerValue);

  },[datePickerValue]);

  return (
    <>
      <NavBar startDateValue={datePickerValue} onStartDateSet={setStartDateState} isPlaying={isPlaying} onPlayToggle={() => setIsPlaying(prev => !prev)}></NavBar>
      <ContentArea onWatchListShow={showOffCanvas} chartsRendered={1} isOffCanvasVisible={offCanvasVisibility} startDate={datePickerValue} isPlaying={isPlaying}></ContentArea>
      <OffCanvas visibility={offCanvasVisibility} onWatchListHide={hideOffCanvas} ></OffCanvas>
    </>
  );
}

export default App;
