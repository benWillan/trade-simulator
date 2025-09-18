import './App.css';
import { NavBar } from './components/appLevel/NavBar';
import { ContentArea } from './components/appLevel/ContentArea';
import Sidebar from './components/general/Sidebar';
import OffCanvas from './components/general/OffCanvas';
import { useState } from 'react';
import CompareModal from './components/appLevel/CompareModal';

function App() {

  const [offCanvasVisibility, setOffCanvasVisibility] = useState<boolean>(false);
  
  const showOffCanvas = () => setOffCanvasVisibility(true);
  const hideOffCanvas = () => setOffCanvasVisibility(false);

  const [isCompareModalVisible, setCompareModalVisibility] = useState<boolean>(false);

  const showCompareModal = () => setCompareModalVisibility(true);
  const hideCompareModal = () => setCompareModalVisibility(false);

  return (
    <>
      <NavBar></NavBar>
      <ContentArea onWatchListShow={showOffCanvas} chartsRendered={1} isOffCanvasVisible={offCanvasVisibility}></ContentArea>
      <OffCanvas visibility={offCanvasVisibility} onWatchListHide={hideOffCanvas} ></OffCanvas>
    </>
  );
}

export default App;
