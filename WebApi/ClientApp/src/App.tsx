import './App.css';
import { NavBar } from './components/topLevel/NavBar'
import { ContainerFluid } from './components/topLevel/ContainerFluid';
import Sidebar from './components/general/Sidebar'

function App() {
  return (
    <>
      <NavBar></NavBar>
      <Sidebar></Sidebar>
      <ContainerFluid chartsRendered={2}></ContainerFluid>
    </>
  );
}

export default App;
