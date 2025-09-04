import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';

const options = [
  // {
  //   name: 'Enable backdrop (default)',
  //   scroll: false,
  //   backdrop: true,
  // },
  // {
  //   name: 'Disable backdrop',
  //   scroll: false,
  //   backdrop: false,
  // },
  {
    name: 'Enable body scrolling',
    scroll: true,
    backdrop: false,
  },
  // {
  //   name: 'Enable both scrolling & backdrop',
  //   scroll: true,
  //   backdrop: true,
  // },
];

function OffCanvas() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Launch
      </Button>

      {options.map((props, idx) => (
        
        <Offcanvas show={show} {...props} onHide={handleClose} style={{ top: "56px", width: "360px" }} placement='end'>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Offcanvas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          Some text as placeholder. In real life you can have the elements you
          have chosen. Like, text, images, lists, etc.
        </Offcanvas.Body>
      </Offcanvas>
      ))}
    </>
  );
}

export default OffCanvas;