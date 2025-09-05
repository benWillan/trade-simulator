import './App.css';
import { NavBar } from './components/topLevel/NavBar';
import { ContainerFluid } from './components/topLevel/ContainerFluid';
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
      <ContainerFluid chartsRendered={4} isOffCanvasVisible={offCanvasVisibility}></ContainerFluid>
      <Sidebar onWatchListShow={showOffCanvas}></Sidebar>
      <OffCanvas visibility={offCanvasVisibility} onWatchListHide={hideOffCanvas} ></OffCanvas>
    </>
  );
}

export default App;
