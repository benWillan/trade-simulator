import './App.css';
import { NavBar } from './components/appLevel/NavBar';
import { ContentArea } from './components/appLevel/ContentArea';
import Sidebar from './components/general/Sidebar';
import OffCanvas from './components/general/OffCanvas';
import { useEffect, useState } from 'react';
import CompareModal from './components/appLevel/CompareModal';
import Toast from './components/general/Notification';

function App() {

  const [offCanvasVisibility, setOffCanvasVisibility] = useState<boolean>(false);
  
  const [datePickerValue, setDatePickerValue] = useState<string>('');
  
  const showOffCanvas = () => setOffCanvasVisibility(true);
  const hideOffCanvas = () => setOffCanvasVisibility(false);

  const setStartDateState = (startDate: string) => {

    setDatePickerValue(startDate);

  }

  // const isValidDate = (value: string): boolean => {

  //   if (value.length !== 10) return false;
  //   if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;

  //   const date = new Date(value);
  //   return !isNaN(date.getTime()) && value === date.toISOString().slice(0, 10);

  // }


  return (
    <>
      <NavBar startDateValue={datePickerValue} onStartDateSet={setStartDateState}></NavBar>
      <ContentArea onWatchListShow={showOffCanvas} chartsRendered={1} isOffCanvasVisible={offCanvasVisibility}></ContentArea>
      <OffCanvas visibility={offCanvasVisibility} onWatchListHide={hideOffCanvas} ></OffCanvas>
    </>
  );
}

export default App;
