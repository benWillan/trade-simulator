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

export function NavBar() {

  return (
    <Navbar style={{zIndex: 2}} bg="dark" data-bs-theme="dark" className="bg-body-tertiary px-2">
      <Navbar.Brand href="#home"><span style={{fontFamily: "Verdana", fontSize: 18}}>Trade Simulator</span></Navbar.Brand>
      <Nav className="mx-auto">
        <Button
          variant="outline-success"
          style={{ borderRadius: "20px" }}
          className="position-absolute top-50 start-50 translate-middle"
        >
          &gt;
        </Button>
      </Nav>
    </Navbar>
  );
}