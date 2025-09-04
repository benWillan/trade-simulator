import './App.css';
import { NavBar } from './components/topLevel/NavBar';
import { ContainerFluid } from './components/topLevel/ContainerFluid';
import Sidebar from './components/general/Sidebar';
import OffCanvas from './components/general/OffCanvas';
import { useState } from 'react';

function App() {

  const [isOffcanvasVisible, setIsOffcanvasVisible] = useState<boolean>(false);
  
  const handleClose = () => {
    setIsOffcanvasVisible(false);
  }

  return (
    <>
      <NavBar></NavBar>
      <ContainerFluid chartsRendered={2}></ContainerFluid>
      <Sidebar onSetIsOffCanvasVisible={setIsOffcanvasVisible}></Sidebar>
      <OffCanvas onClose={handleClose} isOffCanvasVisible={isOffcanvasVisible}></OffCanvas>
    </>
  );
}

export default App;
