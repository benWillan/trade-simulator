import './App.css';
import { NavBar } from './components/topLevel/NavBar';
import { ContentArea } from './components/topLevel/ContentArea';
import Sidebar from './components/general/Sidebar';
import OffCanvas from './components/general/OffCanvas';
import { useState } from 'react';

function App() {

  const [offCanvasVisibility, setOffCanvasVisibility] = useState<boolean>(false);
  
  const showOffCanvas = () => {

    setOffCanvasVisibility(true);

  }

  const hideOffCanvas = () => {

    setOffCanvasVisibility(false);

  }

  return (
    <>
      <NavBar></NavBar>
      <ContentArea chartsRendered={1} isOffCanvasVisible={offCanvasVisibility}></ContentArea>
      <Sidebar onWatchListShow={showOffCanvas}></Sidebar>
      <OffCanvas visibility={offCanvasVisibility} onWatchListHide={hideOffCanvas} ></OffCanvas>
    </>
  );
}

export default App;
