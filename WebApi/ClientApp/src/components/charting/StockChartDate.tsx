//  internal.
//  external.
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {useState, useEffect} from 'react'

type Props = {
  onDateChange: (date: string, field: "start" | "end") => void;
  startDate: string | undefined;
  endDate: string | undefined;
}

function StockChartDate({onDateChange, startDate, endDate}: Props) {

  const [localStartDate, setLocalStartDate] = useState(startDate || "");
  const [localEndDate, setLocalEndDate] = useState(endDate || "");

  // Sync local state with parent props
  useEffect(() => setLocalStartDate(startDate || ""), [startDate]);
  useEffect(() => setLocalEndDate(endDate || ""), [endDate]);

  return (
    <Container fluid className='px-0 py-0'>
      <Form>
        <Row>
          {/* <Col lg='4'></Col> */}
          <Col>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              {/* <Form.Label>Start Date</Form.Label> */}
              <Form.Control type="date" onChange={(e) => {
                setLocalStartDate(e.target.value);
                onDateChange(e.target.value, "start");
              }} value={localStartDate} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              {/* <Form.Label>End Date</Form.Label> */}
              <Form.Control type='date' onChange={(e) => {
                setLocalEndDate(e.target.value);
                onDateChange(e.target.value, "end");
              }} value={localEndDate}/>
            </Form.Group>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}

export default StockChartDate;