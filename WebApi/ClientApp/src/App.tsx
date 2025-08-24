import React from 'react';
import logo from './logo.svg';
import './App.css';
import { NavBar } from './components/topLevel/NavBar'
import { ContainerFluid } from './components/topLevel/ContainerFluid';
import Button from 'react-bootstrap/Button'

function App() {
  return (
    <>
      <NavBar></NavBar>
      <ContainerFluid></ContainerFluid>
    </>
  );
}

export default App;
