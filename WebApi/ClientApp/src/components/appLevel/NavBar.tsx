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
import Card from 'react-bootstrap/Card';
import { useState } from 'react';

type Props = {
  startDateValue: string;
  isPlaying: boolean;
  onPlayToggle: () => void;
  onStartDateSet: (startDate: string) => void;
  currentDateTime: string;
  onLookupButtonClick: () => void;
}

export function NavBar({startDateValue, onStartDateSet, isPlaying, onPlayToggle, currentDateTime, onLookupButtonClick}: Props) {

  //const [isPlaying, setIsPlaying] = useState<boolean>(false);

  return (
    <Navbar style={{zIndex: 2}} bg="dark" data-bs-theme="dark" className="bg-body-tertiary px-2">
      <Navbar.Brand href="#home"><span style={{fontFamily: "Verdana", fontSize: 18}}>Trade Simulator</span></Navbar.Brand>
      <Nav className="mx-auto">
        <Button 
          variant={isPlaying === true ? "secondary" : "success"}
          onClick={onPlayToggle}
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
        {currentDateTime && (
          <>
            <Card className='ms-5 text-center' style={{height: "38px", width: "52px"}}>
              <Card.Body className='p-2'>
                <Card.Text className='text-center'>{currentDateTime.split(",")[0]}</Card.Text>
              </Card.Body>
            </Card>
            <Card className='ms-1 text-center' style={{height: "38px", width: "128px"}}>
              <Card.Body className='p-2'>
                <Card.Text className='text-center'>{currentDateTime.split(",")[1]}</Card.Text>
              </Card.Body>
            </Card>
          </>
        )
        }
        <Button
          className='ms-4'
          style={{height: "38px", width: "auto"}}
          size='sm'
          variant='outline-secondary'
          onClick={onLookupButtonClick}
        >
          Lookup
        </Button>
      </Nav>
    </Navbar>
  );
}