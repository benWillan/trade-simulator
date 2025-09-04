import { useState, useEffect } from 'react';
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

type Props = {
  visibility: boolean;
  onClose: () => void;
}

function OffCanvas({visibility, onClose}: Props) {

  return (
    <>
      {options.map((props, idx) => (
        
        <Offcanvas show={visibility} onHide={onClose} {...props} style={{ top: "56px", width: "560px" }} placement='end'>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Watch List</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <table>
              <thead>
                <th>Ticker</th>
                <th>Price</th>
              </thead>
              <tbody>
                <tr>
                  <td>AAPL</td>
                  <td>$15.67</td>
                </tr>
                <tr>
                  <td>DSN</td>
                  <td>$8.03</td>
                </tr>
                <tr>
                  <td>AAPL</td>
                  <td>$23.58</td>
                </tr>
                <tr>
                  <td>TSLA</td>
                  <td>$7.47</td>
                </tr>
                <tr>
                  <td>GAINN</td>
                  <td>$106.23</td>
                </tr>
              </tbody>
            </table>
          </Offcanvas.Body>
      </Offcanvas>
      ))}
    </>
  );
}

export default OffCanvas;