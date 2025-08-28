import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

type Props = {
  startDate: string | undefined;
}

function StockChartDate(props : Props) {

  const sd = props.startDate;

  return (
    <Container fluid className='px-0 py-0'>
      <Form>
        <Row>
          <Col lg='5'>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              {/* <Form.Label>Start Date</Form.Label> */}
              <Form.Control type="date" value={props.startDate} placeholder='start'/>
            </Form.Group>
          </Col>
          <Col lg='2' className='text-center'>
            <p>-&gt;</p>
          </Col>
          <Col lg='5'>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              {/* <Form.Label>End Date</Form.Label> */}
              <Form.Control type='date' />
            </Form.Group>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}

export default StockChartDate;