import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';

type Props = {
  visibility: boolean;
  onWatchListHide: () => void;
}

function OffCanvas({visibility, onWatchListHide}: Props) {

  return (
    <>
      <Offcanvas 
        show={visibility}
        onHide={onWatchListHide}
        name='Enable body scrolling'
        scroll={true}
        backdrop={false}
        style={{ top: "56px", width: "360px" }}
        placement='end'>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title style={{fontFamily: "Verdana"}}>Watch List</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {/* <table>
            <tr key={idx}>
              <th>Ticker</th>
              <th>Price</th>
            </tr>
            <tr key={idx}>
              <td style={{color: "green"}}>AAPL</td>
              <td style={{color: "green"}}>$15.67</td>
            </tr>
            <tr key={idx}>
              <td>DSN</td>
              <td>$8.03</td>
            </tr>
            <tr key={idx}>
              <td style={{color: "crimson"}}>ZRF</td>
              <td style={{color: "crimson"}}>$23.58</td>
            </tr>
            <tr key={idx}>
              <td style={{color: "green"}}>AAPL</td>
              <td style={{color: "green"}}>$15.67</td>
            </tr>
            <tr key={idx}>
              <td>DSN</td>
              <td>$8.03</td>
            </tr>
            <tr key={idx}>
              <td style={{color: "green"}}>TSLA</td>
              <td style={{color: "green"}}>$7.47</td>
            </tr>
            <tr key={idx}>
              <td style={{color: "crimson"}}>ZRF</td>
              <td style={{color: "crimson"}}>$23.58</td>
            </tr>
            <tr key={idx}>
              <td style={{color: "green"}}>AAPL</td>
              <td style={{color: "green"}}>$15.67</td>
            </tr>
            <tr key={idx}>
              <td>GAINN</td>
              <td>$106.23</td>
            </tr><tr key={idx}>
              <td style={{color: "green"}}>AAPL</td>
              <td style={{color: "green"}}>$15.67</td>
            </tr>
            <tr key={idx}>
              <td>DSN</td>
              <td>$8.03</td>
            </tr>
            <tr key={idx}>
              <td style={{color: "green"}}>AAPL</td>
              <td style={{color: "green"}}>$15.67</td>
            </tr>
            <tr key={idx}>
              <td>DSN</td>
              <td>$8.03</td>
            </tr>
            <tr key={idx}>
              <td style={{color: "crimson"}}>ZRF</td>
              <td style={{color: "crimson"}}>$23.58</td>
            </tr>
            <tr key={idx}>
              <td style={{color: "green"}}>AAPL</td>
              <td style={{color: "green"}}>$15.67</td>
            </tr>
            <tr key={idx}>
              <td>DSN</td>
              <td>$8.03</td>
            </tr>
            <tr key={idx}>
              <td style={{color: "green"}}>TSLA</td>
              <td style={{color: "green"}}>$7.47</td>
            </tr>
            <tr key={idx}>
              <td style={{color: "crimson"}}>ZRF</td>
              <td style={{color: "crimson"}}>$23.58</td>
            </tr>
            <tr key={idx}>
              <td style={{color: "green"}}>AAPL</td>
              <td style={{color: "green"}}>$15.67</td>
            </tr>
            <tr key={idx}>
              <td>GAINN</td>
              <td>$106.23</td>
            </tr><tr key={idx}>
              <td style={{color: "green"}}>AAPL</td>
              <td style={{color: "green"}}>$15.67</td>
            </tr>
            <tr key={idx}>
              <td style={{color: "green"}}>AAPL</td>
              <td style={{color: "green"}}>$15.67</td>
            </tr>
            <tr key={idx}>
              <td>DSN</td>
              <td>$8.03</td>
            </tr>
            <tr key={idx}>
              <td style={{color: "green"}}>TSLA</td>
              <td style={{color: "green"}}>$7.47</td>
            </tr>
            <tr key={idx}>
              <td style={{color: "crimson"}}>ZRF</td>
              <td style={{color: "crimson"}}>$23.58</td>
            </tr>
            <tr key={idx}>
              <td style={{color: "green"}}>AAPL</td>
              <td style={{color: "green"}}>$15.67</td>
            </tr>
            <tr key={idx}>
              <td>GAINN</td>
              <td>$106.23</td>
            </tr><tr key={idx}>
              <td style={{color: "green"}}>AAPL</td>
              <td style={{color: "green"}}>$15.67</td>
            </tr>
            <tr key={idx}>
              <td>DSN</td>
              <td>$8.03</td>
            </tr>
            <tr key={idx}>
              <td>DSN</td>
              <td>$8.03</td>
            </tr>
            <tr key={idx}>
              <td style={{color: "green"}}>AAPL</td>
              <td style={{color: "green"}}>$15.67</td>
            </tr>
            <tr key={idx}>
              <td>DSN</td>
              <td>$8.03</td>
            </tr>
            <tr key={idx}>
              <td style={{color: "green"}}>TSLA</td>
              <td style={{color: "green"}}>$7.47</td>
            </tr>
            <tr key={idx}>
              <td style={{color: "crimson"}}>ZRF</td>
              <td style={{color: "crimson"}}>$23.58</td>
            </tr>
            <tr key={idx}>
              <td style={{color: "green"}}>AAPL</td>
              <td style={{color: "green"}}>$15.67</td>
            </tr>
            <tr key={idx}>
              <td>GAINN</td>
              <td>$106.23</td>
            </tr><tr key={idx}>
              <td style={{color: "green"}}>AAPL</td>
              <td style={{color: "green"}}>$15.67</td>
            </tr>
            <tr key={idx}>
              <td>DSN</td>
              <td>$8.03</td>
            </tr>
          </table> */}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default OffCanvas;