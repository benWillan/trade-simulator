import './App.css';
import { NavBar } from './components/topLevel/NavBar';
import { ContainerFluid } from './components/topLevel/ContainerFluid';
import Sidebar from './components/general/Sidebar';
import OffCanvas from './components/general/OffCanvas';
import { useState } from 'react';

function App() {

  const [offCanvasVisibility, setOffcanvasVisibility] = useState<boolean>(false);
  
  const showOffcanvas = () => {

    setOffcanvasVisibility(true);

  }

  const closeOffcanvas = () => {

    setOffcanvasVisibility(false);

  }

  return (
    <>
      <NavBar></NavBar>
      <ContainerFluid chartsRendered={2}></ContainerFluid>
      <Sidebar onShowOffcanvas={showOffcanvas}></Sidebar>
      <OffCanvas visibility={offCanvasVisibility} onClose={closeOffcanvas} ></OffCanvas>
    </>
  );
}

export default App;
