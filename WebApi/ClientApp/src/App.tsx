import './App.css';
import { NavBar } from './components/topLevel/NavBar'
import { ContainerFluid } from './components/topLevel/ContainerFluid';

function App() {
  return (
    <>
      <NavBar></NavBar>
      <ContainerFluid chartsRendered={3}></ContainerFluid>
    </>
  );
}

export default App;
