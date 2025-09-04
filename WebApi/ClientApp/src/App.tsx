import './App.css';
import { NavBar } from './components/topLevel/NavBar';
import { ContainerFluid } from './components/topLevel/ContainerFluid';
import Sidebar from './components/general/Sidebar';
import OffCanvas from './components/general/OffCanvas';

function App() {
  return (
    <>
      <NavBar></NavBar>
      <Sidebar></Sidebar>
      <OffCanvas></OffCanvas>
      <ContainerFluid chartsRendered={2}></ContainerFluid>
    </>
  );
}

export default App;
