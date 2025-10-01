//  internal.
import '../../css/global.css';
//  external.
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import NavItem from 'react-bootstrap/NavItem';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';

type Props = {
  startDateValue: string;
  onStartDateSet: (startDate: string) => void;
}

export function NavBar({startDateValue, onStartDateSet}: Props) {

  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  return (
    <Navbar style={{zIndex: 2}} bg="dark" data-bs-theme="dark" className="bg-body-tertiary px-2">
      <Navbar.Brand href="#home"><span style={{fontFamily: "Verdana", fontSize: 18}}>Trade Simulator</span></Navbar.Brand>
      <Nav className="mx-auto">
      <Button 
        variant={isPlaying === true ? "secondary" : "success"}
        onClick={() => setIsPlaying(!isPlaying)}
        className="me-2 rounded-pill"
      >
        {isPlaying === true ? "=" : ">"}
      </Button>
      <Form className="d-flex">
        <Form.Control
          className='ms-4'
          type="date"
          value={startDateValue || ""}
          onChange={(e) => onStartDateSet(e.target.value)}
        />
      </Form>
      </Nav>
    </Navbar>
  );
}