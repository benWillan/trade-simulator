//  internal.
import {Stock} from '../../types/charting/types';
import { actionType, orderType } from '../../types/appLevel/TradeModalTypes';
//  external.
import { useEffect, useState, useRef } from 'react'
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

type Props = {
  isVisible: boolean;
  onTradeModalHide: () => void;
  graphData: Stock | null;
  userId: number;
}

function TradeModal({isVisible, onTradeModalHide, graphData, userId}: Props) {

  const [checked, setChecked] = useState(false);

  const [orderTypeValue, setOrderTypeValue] = useState('1');
  const [actionTypeValue, setActionTypeValue] = useState('1');

  const formRef = useRef<HTMLFormElement>(null);

  //const [graphData, setGraphData] = useState<Stock | null>(null);

  const handleTradeSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();

    //const formData = new FormData(e.target);
    //const payload = Object.fromEntries(formData.entries());
    const payload = "test";

    // payload.userId = userId;
    // payload.actionType = actionTypeValue;
    // payload.orderType = orderTypeValue;
    // payload.ticker = graphData?.ticker;

    await fetch("http://localhost:5027/api/broker/execute", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

  }

  const handleExecuteClick = () => {
    // trigger form submit programmatically
    formRef.current?.requestSubmit();
  };

  return (
    <Modal
      show={isVisible}
      onHide={onTradeModalHide}
      //size='lg'
      //dialogClassName="modal-wider-width"
      backdrop={false}
      // backdrop='static'                                              // keeps the dim overlay
      className="modal-click-through custom-modal-position"             // class added to the .modal element
      backdropClassName="backdrop-click-through"
    >
      <Modal.Header closeButton>
        <Modal.Title>Trade</Modal.Title>
      </Modal.Header>

      <Form ref={formRef} onSubmit={handleTradeSubmit}>
        <Modal.Body>
          <h6 style={{textAlign:"center"}}>{graphData?.securityName}</h6>
          <h5 style={{textAlign:"center"}}>{graphData?.ticker}</h5>
            <Row>
              <div>
                <ButtonGroup>
                {actionType.map((radio, idx) => (
                  <ToggleButton
                  key={`actionType-key-${idx}`}
                  id={`actionType-${idx}`}
                  type="radio"
                  variant={radio.value === '1' ? 'outline-success' : 'outline-danger'}
                  name="actionType"
                  value={radio.value}
                  checked={actionTypeValue === radio.value}
                  onChange={(e) => setActionTypeValue(e.currentTarget.value)}
                  >
                    {radio.name}
                  </ToggleButton>
                ))}
                </ButtonGroup>
              </div>
            </Row>
            <Row>
              <h6>{graphData?.stockQuotes.at(-1)?.bidPrice.toFixed(3)} - {graphData?.stockQuotes.at(-1)?.askPrice.toFixed(3)}</h6>
            </Row>
            <Row>
              <ButtonGroup>
              {orderType.map((radio, idx) => (
                <ToggleButton
                  key={`orderType-key-${idx}`}
                  id={`orderType-${idx}`}
                  type="radio"
                  variant={'outline-secondary'}
                  name="orderType"
                  value={radio.value}
                  checked={orderTypeValue === radio.value}
                  onChange={(e) => setOrderTypeValue(e.currentTarget.value)}
                >
                  {radio.name}
                </ToggleButton>
              ))}
              </ButtonGroup>
            </Row>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Price</Form.Label>
                  <Form.Control type='number' placeholder='$'></Form.Control>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Quantity</Form.Label>
                  <Form.Control type='number' placeholder='Units'></Form.Control>
                </Form.Group>
              </Col>
            </Row>
        </Modal.Body>

        <Modal.Footer className="d-flex justify-content-between">
          <Button className='ms-5' onClick={handleExecuteClick} variant="primary" size='sm'>Execute</Button>
          <Button className='me-5' onClick={onTradeModalHide} variant="danger" size='sm'>Cancel</Button>
        </Modal.Footer>

      </Form>
    </Modal>
  )

}

export default TradeModal;