import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import AutocompleteInput from '../general/AutocompleteInput'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

type Props = {
  onSearch: (ticker: string) => void;
}

function StockChartHeader({onSearch}: Props) {
  
  const [securityName, setSecurityName] = useState("");

  const handleClick = () => {

    // if (securityName.trim() !== "") {

    //   onSearch(securityName.trim());

    // }

  };

  return (
    <>
      <Container fluid className="p-0 m-0">
        <Row>
          <Col>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                {/* <Form.Label>Email address</Form.Label> */}
                {/* <Form.Control
                  type="text"
                  placeholder="Security name"
                  value={securityName}
                  onChange={(e) => setSecurityName(e.target.value)}
                  /> */}
                <AutocompleteInput />
                {/* <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                  </Form.Text> */}
              </Form.Group>
              {/* <Button variant="primary" size='sm' type="button" onClick={handleClick}>Load</Button> */}
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default StockChartHeader;